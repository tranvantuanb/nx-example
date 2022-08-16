import { http } from '@carro/utils/api';
import { removeAccessToken } from '@carro/utils/helpers/auth';

import { authApi } from './authApi';

const api = authApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Log out
     */
    logout: builder.mutation<undefined, undefined>({
      query: () =>
        http.post('/logout', { headers: { 'Auth-Type': 'veronica' } }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          removeAccessToken();
          // @ts-ignore
          window.__ECHO_MANAGER__.destroy();
          window.location.href = '/login';
        } catch (e) {
          console.log('Logout Error: ', e);
        }
      },
    }),
  }),
});

export const {
  useLogoutMutation,
  endpoints: { logout },
} = api;

export default api;
