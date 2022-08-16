import { CommonInterfaces, AuthInterfaces } from '@carro/utils';
import { http } from '@carro/utils/api';

import { authApi } from './authApi';

const api = authApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get current user information
     */
    getCurrentUserWS: builder.query<
      CommonInterfaces.ApiResponse<AuthInterfaces.CurrentUser>,
      undefined
    >({
      query: () =>
        http.get('/users/current', { headers: { 'Auth-Type': 'veronica' } }),
    }),
  }),
});

export const {
  useGetCurrentUserWSQuery,
  endpoints: { getCurrentUserWS },
} = api;

export default api;
