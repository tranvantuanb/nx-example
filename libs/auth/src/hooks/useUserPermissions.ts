import { useCallback } from 'react';
import { useAuthWS } from './useAuthWS';

export const useUserPermissions = () => {
  const { allPermissions } = useAuthWS();

  /**
   * checkPermission('list-tickets') will check all permission in 'list-tickets-global', 'list-tickets-group', 'list-tickets-user'.
   In case you want to check specific permissions, call checkPermission('list-tickets-group')
   */
  const checkPermission = useCallback(
    (perm: string) => {
      return !!allPermissions?.some(
        (item) =>
          item === `${perm}-global` ||
          item === `${perm}-group` ||
          item === `${perm}-user` ||
          item === perm
      );
    },
    [allPermissions]
  );

  return {
    checkPermission,
  };
};
