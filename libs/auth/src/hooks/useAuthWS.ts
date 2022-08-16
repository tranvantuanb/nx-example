import { AuthConstants, AuthInterfaces } from '@carro/utils';
import { useGetCurrentUserWSQuery } from '../slice';

const isAuthDisabled = AuthConstants.AUTH_DISABLED === 'true';

export const useAuthWS = () => {
  const currentUser = useGetCurrentUserWSQuery(undefined).data?.data;
  const { permissions: userPermissions, role: userRole } =
    currentUser?.active_group || {};
  const {
    user: userPerms = [],
    global: globalPerms = [],
    group: groupPerms = [],
  } = currentUser?.active_group?.permissions || {};

  const allPermissions = [...userPerms, ...groupPerms, ...globalPerms];

  const isAuthorized = (auth: AuthInterfaces.AuthPermission) => {
    if (!auth || isAuthDisabled) return true;

    const { permissions, roles, bypass } = auth;

    // check bypass
    if (bypass === true) return true;

    if (!userPermissions) return false;

    // check permissions
    if (permissions && permissions.some((p) => allPermissions.includes(p)))
      return true;

    // check roles
    if (roles && userRole && roles.includes(userRole?.name)) return true;

    return false;
  };

  const isAuthorizedOwnership = (auth: AuthInterfaces.AuthPermission) => {
    if (isAuthDisabled) return true;
    const { permissions: requiredPermissions, group, owner } = auth;

    const validPermissions = allPermissions.filter((p) =>
      requiredPermissions?.includes(p)
    );

    const types = validPermissions.map((p) => {
      const chunks = p.split('-');
      return chunks[chunks.length - 1];
    });

    const currentUserActiveGroupId =
      currentUser?.active_group?.id || currentUser?.active_group_id;
    const arrayOwners = Array.isArray(owner) ? owner : [owner];
    const arrayGroups = Array.isArray(group) ? group : [group];
    let isAuthorized = false;

    // global wins all
    if (types.includes('global')) {
      return true;
    }
    // specific group
    if (arrayGroups?.length > 0) {
      isAuthorized = arrayGroups.some((group) => {
        // check current user's group with the specific group
        if (types.includes('group'))
          return currentUserActiveGroupId === group?.id;
        return false;
      });
      if (isAuthorized) return true;
    }
    // specific user
    if (arrayOwners?.length > 0) {
      isAuthorized = arrayOwners.some((owner) => {
        const ownerActiveGroupId =
          owner?.active_group?.id || owner?.active_group_id;
        // check current user's group with owner's group
        if (!arrayGroups || arrayGroups?.length === 0) {
          if (types.includes('group'))
            return currentUserActiveGroupId === ownerActiveGroupId;
        }
        // check current user_id with owner_id
        if (types.includes('user')) return currentUser?.id === owner?.id;
        return false;
      });
    }
    return isAuthorized;
  };

  return { currentUser, isAuthorized, isAuthorizedOwnership, allPermissions };
};
