import { CountryCode } from '../../common';
import { AppSettingsBackStage } from './backstageSettings';

export type AppSettings = {
  [key in CountryCode]?: {
    backstage?: AppSettingsBackStage;
  };
};

export * from './backstageSettings';
