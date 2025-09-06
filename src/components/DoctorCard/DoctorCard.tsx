// components/DoctorCard/DoctorCard.tsx
import React from "react";
import Button from "../ui/Button";

type Props = {
  id: string;
  name: string;
  specialization: string;
  photo_url?: string;
  onBook: (doctorId: string) => void;
};

export default function DoctorCard({ id, name, specialization, photo_url, onBook }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex gap-4 items-center">
      <img src={photo_url || "/default-avatar.png"} alt={name} className="w-16 h-16 rounded-full object-cover" />
      <div className="flex-1">
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-slate-500">{specialization}</div>
      </div>
      <div>
        <Button onClick={() => onBook(id)}>Book</Button>
      </div>
    </div>
  );
}
