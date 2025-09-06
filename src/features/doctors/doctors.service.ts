// features/doctors/doctors.service.ts
import api from "../../lib/api";

export interface SpecializationsResponse {
  specializations: string[];
}

export interface DoctorsResponse {
  docs: Array<{
    id: string;
    name: string;
    specialization: string;
    photo_url?: string;
    rating?: number;
  }>;
  totalPages: number;
  page: number;
  total: number;
}

export async function fetchSpecializations(): Promise<string[]> {
  const res = await api.get("/specializations");
  return res.data; // string[]
}


export async function fetchDoctors(params: { page?: number; limit?: number; search?: string; specialization?: string }): Promise<DoctorsResponse> {
  const { page = 1, limit = 10, search, specialization } = params;
  const q = new URLSearchParams();
  q.set("page", String(page));
  q.set("limit", String(limit));
  if (search) q.set("search", search);
  if (specialization) q.set("specialization", specialization);
  const res = await api.get(`/doctors?${q.toString()}`);
  return res.data;
}