import { DoctorInterface } from 'interfaces/doctor';
import { GetQueryInterface } from 'interfaces';

export interface AppointmentSlotInterface {
  id?: string;
  start_time: any;
  end_time: any;
  day_of_week: number;
  doctor_id: string;
  created_at?: any;
  updated_at?: any;

  doctor?: DoctorInterface;
  _count?: {};
}

export interface AppointmentSlotGetQueryInterface extends GetQueryInterface {
  id?: string;
  doctor_id?: string;
}
