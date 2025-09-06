// components/Header.tsx
"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";

export default function Header() {
  const pathname = usePathname();
  const logout = useAuthStore((s) => s.logout);
  const role = useAuthStore((s) => s.role);

  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-teal-600">Appointments</Link>
        <nav className="flex items-center gap-3">
          <Link href="/patient/dashboard" className={`text-sm ${pathname?.startsWith("/patient") ? "font-semibold" : "text-slate-600"}`}>Patient</Link>
          <Link href="/doctor/dashboard" className={`text-sm ${pathname?.startsWith("/doctor") ? "font-semibold" : "text-slate-600"}`}>Doctor</Link>
          <Link href="/login" className="text-sm text-slate-600">Login</Link>
          <button onClick={() => { logout(); localStorage.removeItem("token"); }} className="text-sm text-red-500">Logout</button>
        </nav>
      </div>
    </header>
  );
}
