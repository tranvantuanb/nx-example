import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthHelpers } from '@carro/utils';
import { PUBLIC_ROUTES } from '@carro/utils/constants/auth';
import { useGetCurrentUserWSQuery } from '../../slice/api/getCurrentUserWS';

const AuthWrapper = ({ loadingSpin, children }) => {
  const router = useRouter();

  const {
    data: { data: user } = {},
    isLoading,
    isError,
  } = useGetCurrentUserWSQuery(undefined, {
    skip: !AuthHelpers.getWsSharedAccessToken(),
  });

  const isUnAuthenticatedRoute = PUBLIC_ROUTES.includes(router.pathname);

  useEffect(() => {
    if (isLoading || isUnAuthenticatedRoute) return;

    if (isError || !user) {
      const page = router.asPath === '/login' ? '/' : router.asPath;
      router.push({ pathname: '/login', query: { redirectUrl: page } });
    }
  }, [router, isError, isLoading, user, isUnAuthenticatedRoute]);

  if (isUnAuthenticatedRoute) return children;

  if (isError) return null;

  if (isLoading || !user) return loadingSpin || null;

  return children;
};

export default AuthWrapper;
