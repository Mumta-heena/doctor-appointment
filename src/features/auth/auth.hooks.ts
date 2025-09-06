// features/auth/auth.hooks.ts
"use client";
import { useMutation } from "@tanstack/react-query";
import { login, registerPatient, registerDoctor, LoginPayload } from "./auth.service";
import { useAuthStore } from "../../store/useAuthStore";

interface BaseAuthResponse {
  token: string;
  user: {
    id?: string;
    name?: string;
    email?: string;
    photo_url?: string;
  };
}

interface PatientAuthResponse extends BaseAuthResponse {
  role: "PATIENT";
}

interface DoctorAuthResponse extends BaseAuthResponse {
  role: "DOCTOR";
  user: {
    id?: string;
    name?: string;
    email?: string;
    specialization?: string;
    photo_url?: string;
  };
}

type AuthResponse = PatientAuthResponse | DoctorAuthResponse;

export function useLogin() {
  const setToken = useAuthStore((s) => s.setToken);
  const setRole = useAuthStore((s) => s.setRole);
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: login,
    onSuccess: (data: AuthResponse) => {
      const token = data.token;
      setToken(token);
      if (token && typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }
      setRole(data.role);
      setUser(data.user);
    },
    onError: (err: Error) => {
      console.error("Login error:", err);
      throw err;
    },
  });
}

// For registration hooks, you might want to be more specific
export function useRegisterPatient() {
  return useMutation<PatientAuthResponse, Error, Parameters<typeof registerPatient>[0]>({
    mutationFn: registerPatient,
    onError: (err: Error) => {
      console.error("Patient registration error:", err);
      throw err;
    },
  });
}

export function useRegisterDoctor() {
  return useMutation<DoctorAuthResponse, Error, Parameters<typeof registerDoctor>[0]>({
    mutationFn: registerDoctor,
    onError: (err: Error) => {
      console.error("Doctor registration error:", err);
      throw err;
    },
  });
}