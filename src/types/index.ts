// types/index.ts
export type Role = "PATIENT" | "DOCTOR";

export interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: Role;
  photo_url?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  photo_url?: string;
  // add other fields as needed
}

export type AppointmentStatus = "PENDING" | "COMPLETE" | "CANCELLED";

export interface Appointment {
  id: string;
  doctorId: string;
  doctor?: Doctor;
  patient?: User;
  date: string; // ISO
  status: AppointmentStatus;
}
