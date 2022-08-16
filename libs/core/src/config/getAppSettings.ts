import { CoreInterfaces } from '@carro/utils';

export const APP_SETTINGS = (() => {
  if (process.env['APP_SETTINGS']) {
    try {
      return JSON.parse(
        process.env['APP_SETTINGS']
      ) as CoreInterfaces.AppSettings;
    } catch (e) {
      console.log('App Settings not found', e);
    }
  }
  return {};
})();
