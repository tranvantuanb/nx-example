import 'react-i18next';
import resources from 'locales/all-locales.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: typeof resources.en;
  }
}
