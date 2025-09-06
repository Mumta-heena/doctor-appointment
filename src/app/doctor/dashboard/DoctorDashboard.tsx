"use client";
import React, { useState } from "react";
import { useDoctorAppointments, useUpdateAppointmentStatus } from "../../../features/appointments/appointments.hooks";
import AppointmentCard from "../../../components/AppointmentCard/AppointmentCard";

export default function DoctorDashboard() {
  const [date, setDate] = useState<string>("");
  const { data, isLoading } = useDoctorAppointments({ date, page: 1 });
  const update = useUpdateAppointmentStatus();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Doctor Appointments</h2>
      <div className="mb-3">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>

      <div className="space-y-3">
        {data?.docs?.length ? (
          data.docs.map((a: any) => (
            <AppointmentCard
              key={a.id}
              data={a}
              role="DOCTOR"
              onStatusChange={(status, id) =>
                update.mutate({ status, appointment_id: id })
              }
            />
          ))
        ) : (
          <div>No appointments</div>
        )}
      </div>
    </div>
  );
}
