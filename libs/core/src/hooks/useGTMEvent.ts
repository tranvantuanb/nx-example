import { useCallback } from 'react';

import { APP_ENV, ENABLE_GTM_LOG } from '@carro/utils/constants/common';

export const useGTMEvent = () => {
  const pushGTMEvent = useCallback((payload: Record<string, any>) => {
    if (typeof window === 'undefined') return;
    if (APP_ENV === 'local') return;

    const eventPayload = {
      page_url: window.location.href,
      ...payload,
    };

    if (window.dataLayer) {
      window.dataLayer.push(eventPayload);
    }

    if (ENABLE_GTM_LOG && APP_ENV !== 'production') {
      console.log('pushGTMEvent', eventPayload);
    }
  }, []);

  return { pushGTMEvent };
};
