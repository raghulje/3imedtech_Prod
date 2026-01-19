import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-TM5LW5BL94';

// Initialize GA4 (call this once at app startup)
export const initGA = () => {
  if (typeof window !== 'undefined') {
    try {
      ReactGA.initialize(GA_MEASUREMENT_ID);
      console.log('✅ Google Analytics GA4 initialized');
    } catch (error) {
      console.error('❌ Failed to initialize GA4:', error);
    }
  }
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    ReactGA.send("pageview", {
      page: path,
      title: title || document.title,
    });
  } catch (error) {
    console.error('❌ Failed to track pageview:', error);
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window === 'undefined') return;
  
  try {
    ReactGA.event({
      action,
      category,
      label,
      value,
    });
  } catch (error) {
    console.error('❌ Failed to track event:', error);
  }
};

// Track button clicks
export const trackButtonClick = (buttonText: string, location?: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    ReactGA.event({
      action: 'button_click',
      category: 'engagement',
      label: buttonText,
      location: location || window.location.pathname,
    });
  } catch (error) {
    console.error('❌ Failed to track button click:', error);
  }
};

// Track link clicks (internal vs external)
export const trackLinkClick = (url: string, linkText?: string, isExternal: boolean = false) => {
  if (typeof window === 'undefined') return;
  
  try {
    ReactGA.event({
      action: 'link_click',
      category: isExternal ? 'external_navigation' : 'internal_navigation',
      label: linkText || url,
      url: url,
    });
  } catch (error) {
    console.error('❌ Failed to track link click:', error);
  }
};

// Track form submissions
export const trackFormSubmit = (formType: string, formName?: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    ReactGA.event({
      action: 'form_submit',
      category: 'form',
      label: formType,
      form_name: formName || formType,
    });
  } catch (error) {
    console.error('❌ Failed to track form submit:', error);
  }
};

// Track file downloads
export const trackDownload = (fileName: string, fileType?: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    ReactGA.event({
      action: 'file_download',
      category: 'download',
      label: fileName,
      file_type: fileType || fileName.split('.').pop() || 'unknown',
      file_name: fileName,
    });
  } catch (error) {
    console.error('❌ Failed to track download:', error);
  }
};

// Track video interactions
export const trackVideoPlay = (videoTitle: string, videoUrl?: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    ReactGA.event({
      action: 'video_play',
      category: 'video',
      label: videoTitle,
      video_url: videoUrl,
    });
  } catch (error) {
    console.error('❌ Failed to track video play:', error);
  }
};

// Track video pause
export const trackVideoPause = (videoTitle: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    ReactGA.event({
      action: 'video_pause',
      category: 'video',
      label: videoTitle,
    });
  } catch (error) {
    console.error('❌ Failed to track video pause:', error);
  }
};

// Track video complete
export const trackVideoComplete = (videoTitle: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    ReactGA.event({
      action: 'video_complete',
      category: 'video',
      label: videoTitle,
    });
  } catch (error) {
    console.error('❌ Failed to track video complete:', error);
  }
};

// Helper to check if URL is external
export const isExternalUrl = (url: string): boolean => {
  if (!url) return false;
  if (url.startsWith('#')) return false;
  if (url.startsWith('mailto:')) return true;
  if (url.startsWith('tel:')) return true;
  try {
    const urlObj = new URL(url, window.location.origin);
    return urlObj.origin !== window.location.origin;
  } catch {
    return false;
  }
};

// Helper to get button text from element
export const getButtonText = (element: HTMLElement): string => {
  // Try multiple methods to get button text
  const text = element.textContent?.trim() || 
               element.getAttribute('aria-label') ||
               element.getAttribute('title') ||
               element.getAttribute('data-ga-label') ||
               element.querySelector('span')?.textContent?.trim() ||
               'Unknown Button';
  
  return text.substring(0, 100); // Limit length
};

// Helper to get link text from element
export const getLinkText = (element: HTMLElement): string => {
  const text = element.textContent?.trim() ||
               element.getAttribute('aria-label') ||
               element.getAttribute('title') ||
               element.getAttribute('data-ga-label') ||
               'Link';
  
  return text.substring(0, 100);
};

