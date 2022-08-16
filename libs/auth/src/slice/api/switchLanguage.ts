import { AuthInterfaces, CommonInterfaces } from '@carro/utils';
import { http } from '@carro/utils/api';

import { authApi } from './authApi';

const api = authApi.injectEndpoints({
  endpoints: (builder) => ({
    switchLanguage: builder.mutation<
      CommonInterfaces.ApiResponse<AuthInterfaces.SwitchLanguageResponse>,
      AuthInterfaces.SwitchLanguage
    >({
      query: (language) =>
        http.put('/language', {
          data: { language },
          headers: { 'Auth-Type': 'veronica' },
        }),
    }),
  }),
});

export const {
  useSwitchLanguageMutation,
  endpoints: { switchLanguage },
} = api;

export default api;
