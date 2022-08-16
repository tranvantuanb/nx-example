import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { getAccessToken } from '@carro/utils/helpers/auth';

export const withLoginRequired = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const userAccessToken = getAccessToken();

      if (!userAccessToken) {
        const page = router.asPath === '/login' ? '/' : router.asPath;
        router.push({ pathname: '/login', query: { redirectUrl: page } });
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};
