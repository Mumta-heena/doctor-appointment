// components/DoctorList/DoctorList.tsx
"use client";
import React from "react";
import DoctorCard, { Doctor } from "../DoctorCard/DoctorCard";

type Props = {
  doctors: Doctor[];
  role?: "PATIENT" | "ADMIN" | "DOCTOR";
  onBook?: (doctorId: string, doctorName?: string) => void;
  onDelete?: (doctorId: string) => void;
};

export default function DoctorList({ doctors, role = "PATIENT", onBook, onDelete }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {doctors.map((d) => (
        <DoctorCard
          key={d.id}
          data={d}
          role={role}
          onBook={onBook}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
