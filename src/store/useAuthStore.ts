// store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "PATIENT" | "DOCTOR" | null;

interface AuthState {
  token: string | null;
  role: Role;
  user: { name?: string; email?: string } | null;
  setToken: (token: string | null) => void;
  setRole: (role: Role) => void;
  setUser: (u: AuthState["user"]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      user: null,
      setToken: (token) => set({ token }),
      setRole: (role) => set({ role }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, role: null, user: null }),
    }),
    { name: "appointment-auth" }
  )
);
