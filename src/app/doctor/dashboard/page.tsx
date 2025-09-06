"use client";
import ProtectedRoute from "../../../components/ProtectedRoute";
import DoctorDashboard from "./DoctorDashboard"; // move actual UI to DoctorDashboard.tsx

export default function Page() {
  return (
    <ProtectedRoute role="DOCTOR">
      <DoctorDashboard />
    </ProtectedRoute>
  );
}
