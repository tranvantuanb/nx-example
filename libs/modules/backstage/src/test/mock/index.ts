import { getAppointmentsList } from './getAppointmentsList';

export const backstageApi = {
  queries: {
    ...getAppointmentsList,
  },
};
