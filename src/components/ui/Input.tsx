// components/ui/Input.tsx
import React from "react";
import clsx from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | null;
};

export default function Input({ label, error, className, ...props }: Props) {
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      {label && <label className="text-sm text-slate-700">{label}</label>}
      <input
        {...props}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
