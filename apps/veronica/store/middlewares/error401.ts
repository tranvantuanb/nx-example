import Router from 'next/router';
import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

import { removeAccessToken } from '@carro/utils/helpers/auth';
import { resetStateAction } from '../actions/resetState';

const isServer = typeof window === 'undefined';

export const error401: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      if (!isServer) {
        removeAccessToken();
        // @ts-ignore
        window.__ECHO_MANAGER__.destroy();

        dispatch(resetStateAction());
        const { asPath } = Router.router || {};
        if (!asPath?.includes('/login')) {
          window.location.href = `/login?redirectUrl=${asPath}`;
        }
      }
    }

    return next(action);
  };
