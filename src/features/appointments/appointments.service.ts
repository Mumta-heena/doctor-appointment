// features/appointments/appointments.service.ts
import api from "../../lib/api";

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  doctor?: {
    name: string;
    specialization: string;
    photo_url?: string;
  };
  patient?: {
    name: string;
    email: string;
  };
}

export interface AppointmentsResponse {
  docs: Appointment[];
  totalPages: number;
  page: number;
  total: number;
}

export async function createAppointment(body: { doctorId: string; date: string }) {
  const res = await api.post("/appointments", body);
  return res.data;
}

export async function getPatientAppointments(params: { status?: string; page?: number }) {
  const q = new URLSearchParams();
  if (params.status) q.set("status", params.status);
  if (params.page) q.set("page", String(params.page));
  const res = await api.get(`/appointments/patient?${q.toString()}`);
  return res.data;
}

export async function getDoctorAppointments(params: { status?: string; date?: string; page?: number }) {
  const q = new URLSearchParams();
  if (params.status) q.set("status", params.status);
  if (params.date) q.set("date", params.date);
  if (params.page) q.set("page", String(params.page));
  const res = await api.get(`/appointments/doctor?${q.toString()}`);
  return res.data;
}

export async function updateAppointmentStatus(body: { status: "COMPLETE" | "CANCELLED"; appointment_id: string }) {
  const res = await api.patch("/appointments/update-status", body);
  return res.data;
}

