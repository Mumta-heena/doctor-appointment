// components/AppointmentCard/AppointmentCard.tsx
"use client";
import React from "react";
import Button from "../ui/Button";

type Appointment = {
  id: string;
  date: string;
  status: "PENDING" | "COMPLETE" | "CANCELLED";
  doctor?: { name: string };
  patient?: { name: string };
};

type Props = {
  data: Appointment;
  role: "PATIENT" | "DOCTOR";
  onStatusChange?: (status: "COMPLETE" | "CANCELLED", id: string) => void;
};

export default function AppointmentCard({ data, role, onStatusChange }: Props) {
  const { id, date, status, doctor, patient } = data;

  return (
    <div className="bg-white p-3 rounded shadow flex justify-between items-center">
      <div>
        <div className="font-semibold">
          {role === "PATIENT" ? doctor?.name : patient?.name}
        </div>
        <div className="text-sm text-slate-500">
          {new Date(date).toLocaleString()}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="text-sm">{status}</div>

        {role === "DOCTOR" && status === "PENDING" && onStatusChange && (
          <>
            <Button
              size="sm"
              variant="primary"
              onClick={() => onStatusChange("COMPLETE", id)}
            >
              Complete
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => onStatusChange("CANCELLED", id)}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
