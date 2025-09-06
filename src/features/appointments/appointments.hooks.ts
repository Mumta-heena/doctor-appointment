// features/appointments/appointments.hooks.ts
"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as svc from "./appointments.service";

export function useCreateAppointment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: svc.createAppointment,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] });
      qc.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
}

export function usePatientAppointments(params: { status?: string; page?: number }) {
  return useQuery<svc.AppointmentsResponse, Error>({
    queryKey: ["appointments", "patient", params],
    queryFn: () => svc.getPatientAppointments(params),
  });
}

export function useDoctorAppointments(params: { status?: string; date?: string; page?: number }) {
  return useQuery<svc.AppointmentsResponse, Error>({
    queryKey: ["appointments", "doctor", params],
    queryFn: () => svc.getDoctorAppointments(params),
  });
}

export function useUpdateAppointmentStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: svc.updateAppointmentStatus,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}