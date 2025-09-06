// components/ProtectedRoute.tsx
"use client";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  role?: "PATIENT" | "DOCTOR"; // restrict by role
}

export default function ProtectedRoute({ children, role }: Props) {
  const { token, role: userRole } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else if (role && userRole !== role) {
      // redirect to correct dashboard
      if (userRole === "DOCTOR") {
        router.replace("/doctor/dashboard");
      } else if (userRole === "PATIENT") {
        router.replace("/patient/dashboard");
      }
    }
  }, [token, userRole, role, router]);

  if (!token) return null;
  if (role && userRole !== role) return null;

  return <>{children}</>;
}
