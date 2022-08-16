import { CommonInterfaces } from '@carro/utils';
import { generateTags, http } from '@carro/utils/api';
import * as BackstageInterfaces from '../interfaces';

import { backstageApi, BackstageTags } from './backstageApi';

const api = backstageApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointmentDetails: builder.query<
      CommonInterfaces.ApiResponse<BackstageInterfaces.Appointment>,
      any
    >({
      query: ({ id }) =>
        http.get(`/veronica/appointments/${id}`, {
          headers: {
            'Auth-Type': 'veronica',
          },
        }),
      providesTags: generateTags.general(BackstageTags.AppointmentDetails),
    }),
  }),
});

export const {
  useGetAppointmentDetailsQuery,
  endpoints: { getAppointmentDetails },
} = api;

export default api;
