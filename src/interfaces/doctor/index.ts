import { AppointmentInterface } from 'interfaces/appointment';
import { AppointmentSlotInterface } from 'interfaces/appointment-slot';
import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DoctorInterface {
  id?: string;
  first_name: string;
  last_name: string;
  specialization: string;
  experience_years: number;
  organization_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  appointment?: AppointmentInterface[];
  appointment_slot?: AppointmentSlotInterface[];
  organization?: OrganizationInterface;
  user?: UserInterface;
  _count?: {
    appointment?: number;
    appointment_slot?: number;
  };
}

export interface DoctorGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  specialization?: string;
  organization_id?: string;
  user_id?: string;
}
