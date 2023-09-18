import axios from 'axios';
import queryString from 'query-string';
import { AppointmentSlotInterface, AppointmentSlotGetQueryInterface } from 'interfaces/appointment-slot';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAppointmentSlots = async (
  query?: AppointmentSlotGetQueryInterface,
): Promise<PaginatedInterface<AppointmentSlotInterface>> => {
  const response = await axios.get('/api/appointment-slots', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAppointmentSlot = async (appointmentSlot: AppointmentSlotInterface) => {
  const response = await axios.post('/api/appointment-slots', appointmentSlot);
  return response.data;
};

export const updateAppointmentSlotById = async (id: string, appointmentSlot: AppointmentSlotInterface) => {
  const response = await axios.put(`/api/appointment-slots/${id}`, appointmentSlot);
  return response.data;
};

export const getAppointmentSlotById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/appointment-slots/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAppointmentSlotById = async (id: string) => {
  const response = await axios.delete(`/api/appointment-slots/${id}`);
  return response.data;
};
