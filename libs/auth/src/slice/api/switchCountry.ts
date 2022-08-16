import { AuthInterfaces, CommonInterfaces } from '@carro/utils';
import { http } from '@carro/utils/api';

import { authApi } from './authApi';

const api = authApi.injectEndpoints({
  endpoints: (builder) => ({
    switchCountry: builder.mutation<
      CommonInterfaces.ApiResponse<AuthInterfaces.SwitchCountryResponse>,
      AuthInterfaces.SwitchCountry
    >({
      query: (countryId) =>
        http.put('/country', {
          data: { country_id: countryId },
          headers: { 'Auth-Type': 'veronica' },
        }),
    }),
  }),
});

export const {
  useSwitchCountryMutation,
  endpoints: { switchCountry },
} = api;

export default api;
