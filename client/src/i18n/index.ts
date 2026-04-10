import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import messages from './local/index';
import { trackEvent } from '../utils/analytics';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    resources: messages,
    interpolation: {
      escapeValue: false,
    },
  });

// Track language changes (no PII, only language code)
i18n.on('languageChanged', (lng) => {
  try {
    trackEvent('language_change', 'i18n', lng);
  } catch {
    // Ignore analytics errors
  }
});

export default i18n;