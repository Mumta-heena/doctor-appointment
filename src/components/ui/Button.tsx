// components/ui/Button.tsx
import React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

export default function Button({ variant = "primary", size = "md", className, ...props }: Props) {
  const base = "rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-1";
  const variants: Record<string, string> = {
    primary: "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow",
    ghost: "bg-transparent text-slate-700 border border-slate-200",
    danger: "bg-red-500 text-white",
  };
  const sizes: Record<string, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return <button className={clsx(base, variants[variant], sizes[size], className)} {...props} />;
}
