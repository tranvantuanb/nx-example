import { DependencyList, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { CoreInterfaces } from '@carro/utils';
import { selectors } from '../slice';
import { EchoManager } from '../EchoManager';

export const useEchoManager = (
  callback,
  deps: DependencyList = [],
  options?: { echoInstance?: EchoManager }
) => {
  const connectionStatus = useSelector(
    selectors.echoSelectors.selectEchoCurrentStatus
  );

  useEffect(() => {
    let destructorFunc;
    if (connectionStatus === CoreInterfaces.ConnectionEvent.Connected) {
      try {
        destructorFunc = callback(
          options?.echoInstance || window.__ECHO_MANAGER__
        );
      } catch (e) {
        console.log('useEchoManager error callback', e);
      }
    }

    return destructorFunc;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionStatus, ...deps]);
};
