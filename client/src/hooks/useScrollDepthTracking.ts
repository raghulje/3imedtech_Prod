import { useEffect, useRef } from 'react';
import { trackEvent } from '../utils/analytics';

/**
 * Tracks scroll depth for the current page using percentage thresholds.
 * Sends events at 25%, 50%, 75%, and 90% scroll depth.
 * No PII is included – only page path and depth percentage.
 */
export const useScrollDepthTracking = () => {
  const thresholdsRef = useRef({
    '25': false,
    '50': false,
    '75': false,
    '90': false,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;

      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const depth = (scrollTop / docHeight) * 100;
      const path = window.location.pathname;

      const thresholds = thresholdsRef.current;

      const checkAndTrack = (percent: number) => {
        const key = String(percent) as keyof typeof thresholds;
        if (!thresholds[key] && depth >= percent) {
          thresholds[key] = true;
          try {
            trackEvent('scroll_depth', 'engagement', `${percent}%`, percent);
          } catch {
            // Fail silently – analytics should never break UX
          }
        }
      };

      checkAndTrack(25);
      checkAndTrack(50);
      checkAndTrack(75);
      checkAndTrack(90);
    };

    // Throttle with requestAnimationFrame
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial check in case user loads mid‑page
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
};


