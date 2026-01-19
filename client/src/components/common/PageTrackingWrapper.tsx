import { usePageTracking } from '../../hooks/usePageTracking';
import { useAutoTracking } from '../../hooks/useAutoTracking';

/**
 * Wrapper component to enable page and event tracking
 * Must be used inside BrowserRouter
 */
export const PageTrackingWrapper = ({ children }: { children: React.ReactNode }) => {
  // Track page views on route changes
  usePageTracking();

  // Enable automatic tracking for buttons, links, forms, downloads
  useAutoTracking();

  return <>{children}</>;
};

