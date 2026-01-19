import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

/**
 * Hook to automatically track page views on route changes
 * Use this in your main App component or router
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    const path = location.pathname + location.search;
    const title = document.title || path;
    
    // Small delay to ensure page is fully loaded
    const timer = setTimeout(() => {
      trackPageView(path, title);
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);
};

