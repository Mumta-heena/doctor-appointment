// features/doctors/doctors.hooks.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctors, fetchSpecializations } from "./doctors.service";

export function useSpecializations() {
  return useQuery({
    queryKey: ["specializations"],
    queryFn: fetchSpecializations,
    staleTime: 1000 * 60 * 5
  });
}

export function useDoctors(params: { page?: number; limit?: number; search?: string; specialization?: string }) {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: () => fetchDoctors(params),
    // React Query v5 automatically handles some optimizations
    // that keepPreviousData used to provide
  });
}