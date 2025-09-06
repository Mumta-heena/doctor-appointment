"use client";
import ProtectedRoute from "../../../components/ProtectedRoute";
import PatientAppointments from "./PatientAppointments";

export default function Page() {
  return (
    <ProtectedRoute role="PATIENT">
      <PatientAppointments />
    </ProtectedRoute>
  );
}
