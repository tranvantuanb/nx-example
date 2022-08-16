import { generateTags, http } from '@carro/utils/api';
import * as BackstageInterfaces from '../interfaces';
import { backstageApi, BackstageTags } from './backstageApi';

const api = backstageApi.injectEndpoints({
  endpoints: (builder) => ({
    updateAppointmentStatus: builder.mutation<
      any,
      BackstageInterfaces.UpdateAppointmentStatusRequest
    >({
      query: ({ id, data }) =>
        http.put(`/veronica/appointments/${id}`, {
          data,
          headers: { 'Auth-Type': 'veronica' },
        }),
      invalidatesTags: (result) =>
        generateTags.single(result, BackstageTags.Appointment),
    }),
  }),
});

export const {
  useUpdateAppointmentStatusMutation,
  endpoints: { updateAppointmentStatus },
} = api;

export default api;
