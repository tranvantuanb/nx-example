import { useMemo } from 'react';

import { useCurrentCountry } from '@carro/auth/hooks';
import { CoreInterfaces } from '@carro/utils';
import { APP_SETTINGS } from '@carro/core/config';

export const useBackStageSettings = (): CoreInterfaces.AppSettingsBackStage => {
  const currentCountry = useCurrentCountry();

  const setting = useMemo(() => {
    if (!currentCountry || typeof window === 'undefined') {
      return {};
    }

    return APP_SETTINGS[currentCountry]?.backstage || {};
  }, [currentCountry]);

  return setting;
};
