// features/auth/auth.service.ts
import api from "../../lib/api";

export type LoginPayload = { email: string; password: string; role: "DOCTOR" | "PATIENT" };

export async function login(payload: LoginPayload) {
  const res = await api.post("/auth/login", payload);
  // assume API returns { token, user, role }
  return res.data;
}

export async function registerPatient(payload: { name: string; email: string; password: string; photo_url?: string }) {
  const res = await api.post("/auth/register/patient", payload);
  return res.data;
}

export async function registerDoctor(payload: { name: string; email: string; password: string; specialization: string; photo_url?: string }) {
  const res = await api.post("/auth/register/doctor", payload);
  return res.data;
}
