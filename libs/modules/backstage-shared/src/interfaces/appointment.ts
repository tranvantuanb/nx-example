export interface Appointment {
  appointment: {
    appointment_id: number;
    appointment_status: {
      name: string;
      display_name: string;
    };
    location: string;
  };
  customer: {
    name: string;
    mobile_no: string;
    email: string;
  };
  assignee: {
    name: string;
  };
  date: {
    start_date: string;
    end_date: string;
  };
  contact_id: number;
  ticket_id: number;
  ticket_type: {
    ticket_type_display_name: string;
    ticket_type_name: string;
  };
  transaction_id: number[];
}

export interface UpdateAppointmentStatusRequest {
  id: number;
  data: {
    status_name: string;
  };
}
