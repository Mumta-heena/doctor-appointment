// store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

type Role = "PATIENT" | "DOCTOR" | null;

interface DecodedToken {
  role: Role;
  exp: number;
  iat: number;
  [key: string]: any; // other claims
}

interface AuthState {
  token: string | null;
  role: Role;
  user: { name?: string; email?: string } | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      user: null,
      setToken: (token) => {
        let role: Role = null;
        if (token) {
          try {
            const decoded: DecodedToken = jwtDecode(token);
            role = decoded.role;
          } catch (e) {
            console.error("Invalid token");
          }
        }
        set({ token, role });
      },
      logout: () => set({ token: null, role: null, user: null }),
    }),
    { name: "appointment-auth" }
  )
);
