// app/login/page.tsx
"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useLogin } from "../../features/auth/auth.hooks";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["DOCTOR", "PATIENT"]),
});

type Form = z.infer<typeof schema>;

export default function LoginPage() {
  const { register, handleSubmit, formState } = useForm<Form>({ resolver: zodResolver(schema) });
  const mutation = useLogin();
  const router = useRouter();

  async function onSubmit(values: Form) {
    try {
      await mutation.mutateAsync(values);
      router.push(values.role === "DOCTOR" ? "/doctor/dashboard" : "/patient/dashboard");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Login error");
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input label="Email" {...register("email")} />
        <Input label="Password" type="password" {...register("password")} />
        <div>
          <label className="text-sm mr-3">Role</label>
          <select {...register("role")} className="border rounded-md px-2 py-1">
            <option value="PATIENT">Patient</option>
            <option value="DOCTOR">Doctor</option>
          </select>
        </div>
        <Button type="submit">{mutation.isPending ? "Logging..." : "Login"}</Button>
      </form>
    </div>
  );
}