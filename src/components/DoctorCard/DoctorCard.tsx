// components/DoctorCard/DoctorCard.tsx
"use client";
import React from "react";
import Button from "../ui/Button";

export type Doctor = {
  id: string;
  name: string;
  specialization: string;
  photo_url?: string;
};

type Props = {
  data: Doctor;
  role?: "PATIENT" | "ADMIN" | "DOCTOR";
  onBook?: (doctorId: string, doctorName?: string) => void;
  onDelete?: (doctorId: string) => void; // for admin use case
};

export default function DoctorCard({ data, role = "PATIENT", onBook, onDelete }: Props) {
  const { id, name, specialization, photo_url } = data;

  return (
    <div className="bg-white rounded-xl shadow p-4 flex gap-4 items-center">
      <img
        src={photo_url || "/default-avatar.png"}
        alt={name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-slate-500">{specialization}</div>
      </div>

      {/* Role-based actions */}
      {role === "PATIENT" && onBook && (
        <Button onClick={() => onBook(id, name)}>Book</Button>
      )}

      {role === "ADMIN" && onDelete && (
        <Button variant="danger" size="sm" onClick={() => onDelete(id)}>
          Delete
        </Button>
      )}

      {role === "DOCTOR" && (
        <span className="text-xs text-slate-500">Profile</span>
      )}
    </div>
  );
}
