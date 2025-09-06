// components/DoctorList/DoctorList.tsx
import React from "react";
import DoctorCard from "../DoctorCard/DoctorCard";
import Card from "../ui/Card";

type Doctor = {
  id: string;
  name: string;
  specialization: string;
  photo_url?: string;
};

type Props = {
  doctors: Doctor[];
  onBook: (doctorId: string) => void;
};

export default function DoctorList({ doctors, onBook }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {doctors.map((d) => (
        <DoctorCard
          key={d.id}
          id={d.id}
          name={d.name}
          specialization={d.specialization}
          photo_url={d.photo_url}
          onBook={onBook}
        />
      ))}
    </div>
  );
}
