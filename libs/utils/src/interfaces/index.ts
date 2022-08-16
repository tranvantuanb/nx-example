import * as AuthInterfaces from './auth';
import * as CommonInterfaces from './common';
import * as CoreInterfaces from './core';

export { AuthInterfaces, CommonInterfaces, CoreInterfaces };

declare global {
  interface Window {
    dataLayer: object[];
  }
}
