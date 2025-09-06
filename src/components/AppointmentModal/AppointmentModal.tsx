// components/AppointmentModal/AppointmentModal.tsx
"use client"
import React, { useState } from "react";
import Button from "../ui/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (dateISO: string) => Promise<void>;
  doctorName?: string;
};

export default function AppointmentModal({ isOpen, onClose, onConfirm, doctorName }: Props) {
  const [date, setDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div className="bg-white p-5 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-semibold">Book appointment with {doctorName}</h3>
        <p className="text-sm text-slate-500 mb-3">Select a preferred date</p>
        <div>
          <DatePicker selected={date} onChange={(d) => setDate(d)} inline />
        </div>
        <div className="flex gap-2 justify-end mt-4">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button
            onClick={async () => {
              if (!date) return;
              setLoading(true);
              await onConfirm(date.toISOString());
              setLoading(false);
            }}
          >
            {loading ? "Booking..." : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
}
