// components/ui/Card.tsx
import React from "react";
export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-lg shadow-sm p-4">{children}</div>;
}
