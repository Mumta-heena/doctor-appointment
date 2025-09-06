// app/register/page.tsx
"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import * as authSvc from "../../features/auth/auth.service";
import { useRouter } from "next/navigation";

const patientSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  photo_url: z.string().url().optional(),
});

const doctorSchema = patientSchema.extend({
  specialization: z.string().min(2),
});

type PatientForm = z.infer<typeof patientSchema>;
type DoctorForm = z.infer<typeof doctorSchema>;

export default function RegisterPage() {
  const [tab, setTab] = useState<"patient" | "doctor">("patient");
  const pForm = useForm<PatientForm>({ resolver: zodResolver(patientSchema) });
  const dForm = useForm<DoctorForm>({ resolver: zodResolver(doctorSchema) });
  const router = useRouter();

  async function createPatient(data: PatientForm) {
    await authSvc.registerPatient(data);
    alert("Registered! Please login.");
    router.push("/login");
  }
  async function createDoctor(data: DoctorForm) {
    await authSvc.registerDoctor(data);
    alert("Registered! Please login.");
    router.push("/login");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex gap-2">
        <button onClick={() => setTab("patient")} className={`px-4 py-2 ${tab==="patient" ? "bg-teal-500 text-white" : "bg-white"}`}>Patient</button>
        <button onClick={() => setTab("doctor")} className={`px-4 py-2 ${tab==="doctor" ? "bg-teal-500 text-white" : "bg-white"}`}>Doctor</button>
      </div>

      {tab === "patient" ? (
        <form onSubmit={pForm.handleSubmit(createPatient)} className="space-y-3 mt-4">
          <Input label="Name" {...pForm.register("name")} />
          <Input label="Email" {...pForm.register("email")} />
          <Input label="Password" type="password" {...pForm.register("password")} />
          <Input label="Photo URL" {...pForm.register("photo_url")} />
          <Button type="submit">Register Patient</Button>
        </form>
      ) : (
        <form onSubmit={dForm.handleSubmit(createDoctor)} className="space-y-3 mt-4">
          <Input label="Name" {...dForm.register("name")} />
          <Input label="Email" {...dForm.register("email")} />
          <Input label="Password" type="password" {...dForm.register("password")} />
          <Input label="Specialization" {...dForm.register("specialization")} />
          <Input label="Photo URL" {...dForm.register("photo_url")} />
          <Button type="submit">Register Doctor</Button>
        </form>
      )}
    </div>
  );
}
