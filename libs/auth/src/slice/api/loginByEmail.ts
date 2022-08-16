import { CommonInterfaces, AuthInterfaces } from '@carro/utils';
import { http } from '@carro/utils/api';

import { authApi } from './authApi';

const api = authApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Login and get access token
     */
    loginByEmail: builder.mutation<
      CommonInterfaces.ApiResponse<AuthInterfaces.LoginByEmailResponse>,
      AuthInterfaces.LoginByEmailRequest
    >({
      query: (credentials) =>
        http.post('/loginByEmail', {
          data: { ...credentials, token_prefer: 'token' },
          headers: { 'Auth-Type': 'veronica' },
        }),
    }),
  }),
});

export const {
  useLoginByEmailMutation,
  endpoints: { loginByEmail },
} = api;

export default api;
