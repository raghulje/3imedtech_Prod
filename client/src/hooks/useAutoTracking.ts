import { useEffect } from 'react';
import {
  trackButtonClick,
  trackLinkClick,
  trackFormSubmit,
  trackDownload,
  trackVideoPlay,
  trackVideoPause,
  trackVideoComplete,
  isExternalUrl,
  getButtonText,
  getLinkText,
} from '../utils/analytics';

/**
 * Hook to automatically track user interactions using event delegation
 * This tracks buttons, links, forms, and downloads without modifying individual components
 */
export const useAutoTracking = () => {
  useEffect(() => {
    // Track button clicks
    const handleButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find the button element (could be button, or a clickable element)
      const button = target.closest('button, [role="button"], .btn, [data-ga-track="button"]');
      
      if (button && button instanceof HTMLElement) {
        // Skip if explicitly excluded
        if (button.hasAttribute('data-ga-exclude')) return;
        
        const buttonText = getButtonText(button);
        const location = window.location.pathname;
        
        trackButtonClick(buttonText, location);
      }
    };

    // Track link clicks
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]');
      
      if (link && link instanceof HTMLAnchorElement) {
        // Skip if explicitly excluded
        if (link.hasAttribute('data-ga-exclude')) return;
        
        const href = link.getAttribute('href') || '';
        const linkText = getLinkText(link);
        const external = isExternalUrl(href);
        
        // Don't track hash links (smooth scroll)
        if (href.startsWith('#')) return;
        
        trackLinkClick(href, linkText, external);
      }
    };

    // Track form submissions
    const handleFormSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      
      if (form) {
        // Skip if explicitly excluded
        if (form.hasAttribute('data-ga-exclude')) return;
        
        const formType = form.getAttribute('data-ga-form-type') ||
                        form.getAttribute('name') ||
                        form.getAttribute('id') ||
                        form.className.split(' ').find(c => c.includes('form')) ||
                        'contact_form';
        
        const formName = form.getAttribute('data-ga-form-name') || formType;
        
        trackFormSubmit(formType, formName);
      }
    };

    // Track file downloads
    const handleDownloadClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]');
      
      if (link && link instanceof HTMLAnchorElement) {
        const href = link.getAttribute('href') || '';
        
        // Check if it's a download link
        const isDownload = link.hasAttribute('download') ||
                          href.match(/\.(pdf|doc|docx|xls|xlsx|zip|rar|tar|gz|csv)$/i) ||
                          link.getAttribute('data-ga-track') === 'download';
        
        if (isDownload) {
          const fileName = link.getAttribute('download') ||
                          href.split('/').pop() ||
                          'unknown';
          
          const fileType = fileName.split('.').pop() || 'unknown';
          
          trackDownload(fileName, fileType);
        }
      }
    };

    // Track video interactions
    const handleVideoPlay = (e: Event) => {
      const video = e.target as HTMLVideoElement;
      if (video && video.tagName === 'VIDEO') {
        const videoTitle = video.getAttribute('data-ga-title') ||
                          video.getAttribute('title') ||
                          video.getAttribute('src')?.split('/').pop() ||
                          'Video';
        const videoUrl = video.getAttribute('src') || undefined;
        
        trackVideoPlay(videoTitle, videoUrl);
      }
    };

    const handleVideoPause = (e: Event) => {
      const video = e.target as HTMLVideoElement;
      if (video && video.tagName === 'VIDEO') {
        const videoTitle = video.getAttribute('data-ga-title') ||
                          video.getAttribute('title') ||
                          video.getAttribute('src')?.split('/').pop() ||
                          'Video';
        trackVideoPause(videoTitle);
      }
    };

    const handleVideoEnd = (e: Event) => {
      const video = e.target as HTMLVideoElement;
      if (video && video.tagName === 'VIDEO') {
        const videoTitle = video.getAttribute('data-ga-title') ||
                          video.getAttribute('title') ||
                          video.getAttribute('src')?.split('/').pop() ||
                          'Video';
        trackVideoComplete(videoTitle);
      }
    };

    // Add event listeners
    document.addEventListener('click', handleButtonClick, true);
    document.addEventListener('click', handleLinkClick, true);
    document.addEventListener('click', handleDownloadClick, true);
    document.addEventListener('submit', handleFormSubmit, true);
    document.addEventListener('play', handleVideoPlay, true);
    document.addEventListener('pause', handleVideoPause, true);
    document.addEventListener('ended', handleVideoEnd, true);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleButtonClick, true);
      document.removeEventListener('click', handleLinkClick, true);
      document.removeEventListener('click', handleDownloadClick, true);
      document.removeEventListener('submit', handleFormSubmit, true);
      document.removeEventListener('play', handleVideoPlay, true);
      document.removeEventListener('pause', handleVideoPause, true);
      document.removeEventListener('ended', handleVideoEnd, true);
    };
  }, []);
};

