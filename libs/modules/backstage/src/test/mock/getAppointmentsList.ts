export const getAppointmentsList = {
  'getAppointmentsList({"page":"1", "perPage": "10"})': {
    status: 'fulfilled',
    endpointName: 'getAppointmentsList',
    requestId: 'mSjHxySEJmSTGR15b0P0J',
    originalArgs: {
      page: '1',
      perPage: '10',
    },
    startedTimeStamp: 1655001627623,
    data: {
      data: [
        {
          ticket_id: 21075,
          ticket_type: {
            ticket_type_name: 'buy-online-mytukar-web-my',
            ticket_type_display_name: 'Buy Online - myTukar Web',
          },
          transaction_id: [5767],
          contact_id: 1159,
          appointment: {
            appointment_id: 10911,
            appointment_status: {
              name: 'appointment-scheduled',
              display_name: 'Scheduled',
            },
            location: null,
          },
          customer: {
            name: 'Tong Tong',
            mobile_no: '+60175724073',
            email: 'may.ho@mytukar.com',
          },
          assignee: {
            name: null,
          },
          date: {
            start_date: '2022-07-09 04:30:00',
            end_date: '2022-07-09 05:00:00',
          },
        },
      ],
    },
    fulfilledTimeStamp: 1655001628410,
  },
};
