"use client";
import React, { useState } from "react";
import { usePatientAppointments } from "../../../features/appointments/appointments.hooks";
import AppointmentCard from "../../../components/AppointmentCard/AppointmentCard";

export default function PatientAppointments() {
  const [status, setStatus] = useState("");
  const { data, isLoading } = usePatientAppointments({ status, page: 1 });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">My Appointments</h2>

      <div className="mb-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All</option>
          <option value="PENDING">Pending</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="COMPLETE">Completed</option>
        </select>
      </div>

      <div className="space-y-3">
        {data?.docs?.length ? (
          data.docs.map((a: any) => (
            <AppointmentCard key={a.id} data={a} role="PATIENT" />
          ))
        ) : (
          <div>No appointments found</div>
        )}
      </div>
    </div>
  );
}
