"use client";
import ProtectedRoute from "../../../components/ProtectedRoute";
import PatientDashboard from "./PatientDashboard"; // move actual UI to PatientDashboard.tsx

export default function Page() {
  return (
    <ProtectedRoute role="PATIENT">
      <PatientDashboard />
    </ProtectedRoute>
  );
}
