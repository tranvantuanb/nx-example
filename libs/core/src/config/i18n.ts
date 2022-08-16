import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from 'locales/all-locales.json';

i18next.use(initReactI18next).init({
  debug: false,
  resources,
  lng: 'en',
  defaultNS: 'common',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export const availableLanguages = Object.keys(resources);
export { i18next as i18n };
