import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';
import translationKY from './locales/ky/translation.json'; 

i18n
  .use(LanguageDetector)
  .use(initReactI18next) 
  .init({
    resources: {
      en: { translation: translationEN },
      ru: { translation: translationRU },
      ky: { translation: translationKY },
    },
    fallbackLng: 'en',

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
