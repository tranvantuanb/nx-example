import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@carro/utils/api';

export enum BackstageTags {
  AppointmentsList = 'Backstage/AppointmentsList',
  CustomerCheckin = 'Backstage/CustomerCheckin',
  Appointment = 'Backstage/Appointment',
  ViewingHistoryList = 'Backstage/ViewingHistoryList',
  AppointmentDetails = 'Backstage/AppointmentDetails',
}

export const backstageApi = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  reducerPath: 'backstageApi',
  tagTypes: Object.values(BackstageTags),
});
