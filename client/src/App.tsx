import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'sonner';
import { AdminProvider } from "./contexts/AdminContext";
import { initGA } from "./utils/analytics";
import { PageTrackingWrapper } from "./components/common/PageTrackingWrapper";


function App() {
  // Initialize Google Analytics GA4 once at app startup
  useEffect(() => {
    initGA();
  }, []);

  // Initialize AOS (Animate On Scroll) library with optimized settings
  useEffect(() => {
    AOS.init({
      duration: 600, // Reduced for snappier feel
      easing: 'ease-out-cubic', // Smoother easing
      once: false,
      mirror: true,
      offset: 80, // Reduced offset for earlier trigger
      delay: 0,
      disable: false,
      startEvent: 'DOMContentLoaded',
      throttleDelay: 99,
      debounceDelay: 50,
      useClassNames: false,
      disableMutationObserver: false,
    });

    // Enhanced smooth scrolling with performance optimization
    const handleScroll = () => {
      // Use requestAnimationFrame for smooth scrolling
      if (window.scrollY > 0) {
        document.documentElement.style.scrollBehavior = 'smooth';
      }
    };

    // Optimize scroll performance
    let ticking = false;
    const optimizedScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizedScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', optimizedScroll);
    };
  }, []);
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <PageTrackingWrapper>
          <AdminProvider>
            <Toaster position="top-right" richColors />
            <AppRoutes />
          </AdminProvider>
        </PageTrackingWrapper>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
