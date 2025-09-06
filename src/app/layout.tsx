// app/layout.tsx
import "./styles/globals.css";
import React from "react";
import Header from "../components/Header";
import { Providers } from "../lib/queryClient";

export const metadata = {
  title: "Appointment Manager",
  description: "Doctor Appointment Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
