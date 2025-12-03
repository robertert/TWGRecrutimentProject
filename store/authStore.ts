import { create } from "zustand";

interface AuthState {
  session: string | null;
  signIn: () => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  session: null,

  signIn: () => set({ session: "guest" }),

  signOut: () => set({ session: null }),
}));
