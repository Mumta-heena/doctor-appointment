// app/page.tsx
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <section className="grid gap-6 md:grid-cols-2 items-center">
      <div>
        <h1 className="text-4xl font-bold">Welcome to Appointment Manager</h1>
        <p className="text-slate-600 mt-2">Find doctors, book appointments and manage schedules easily.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/login" className="px-4 py-2 bg-teal-500 text-white rounded-md">Login</Link>
          <Link href="/register" className="px-4 py-2 border rounded-md">Register</Link>
        </div>
      </div>
      <div>
        <img src="/doctor-illustration.svg" alt="illustration" />
      </div>
    </section>
  );
}
