"use client";
import React, { useState } from "react";
import { useDoctors, useSpecializations } from "../../../features/doctors/doctors.hooks";
import DoctorList from "../../../components/DoctorList/DoctorList";
import AppointmentModal from "../../../components/AppointmentModal/AppointmentModal";
import { useCreateAppointment } from "../../../features/appointments/appointments.hooks";

export default function PatientDashboard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [spec, setSpec] = useState("");
  const [modal, setModal] = useState<{ open: boolean; doctorId?: string; doctorName?: string }>({ open: false });

const { data: specData } = useSpecializations();

<select
  className="border rounded px-3 py-2"
  value={spec}
  onChange={(e) => setSpec(e.target.value)}
>
  <option value="">All specializations</option>
  {specData?.map((s) => (
    <option key={s} value={s}>
      {s}
    </option>
  ))}
</select>
  const { data } = useDoctors({ page, limit: 8, search, specialization: spec });
  const createA = useCreateAppointment();

  async function onConfirm(dateISO: string) {
    if (!modal.doctorId) return;
    await createA.mutateAsync({ doctorId: modal.doctorId, date: dateISO });
    setModal({ open: false });
    alert("Appointment booked!");
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Find Doctors</h2>
      <div className="mb-4 flex gap-3">
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={spec}
          onChange={(e) => setSpec(e.target.value)}
        >
          <option value="">All specializations</option>
          {specData?.map((s: string) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <DoctorList
        doctors={data?.docs ?? []}
        role="PATIENT"
        onBook={(id, name) => setModal({ open: true, doctorId: id, doctorName: name })}
      />

      <div className="mt-4 flex justify-between items-center">
        <div>
          Page {data?.page ?? 1} / {data?.totalPages ?? 1}
        </div>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>

      <AppointmentModal
        isOpen={modal.open}
        onClose={() => setModal({ open: false })}
        doctorName={modal.doctorName}
        onConfirm={onConfirm}
      />
    </div>
  );
}
