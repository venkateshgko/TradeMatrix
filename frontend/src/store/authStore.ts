import { create } from "zustand";
import type { AuthUser } from "../api/authApi";

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  setSession: (user: AuthUser, token: string) => void;
  clearSession: () => void;
};

const storedToken = sessionStorage.getItem("tradematrix_token");
const storedUser = sessionStorage.getItem("tradematrix_user");

// Remove the older persistent login so an old localStorage token cannot bypass login.
localStorage.removeItem("tradematrix_token");
localStorage.removeItem("tradematrix_user");

let parsedUser: AuthUser | null = null;
try {
  parsedUser = storedUser ? JSON.parse(storedUser) : null;
} catch {
  parsedUser = null;
  sessionStorage.removeItem("tradematrix_user");
}

export const useAuthStore = create<AuthState>((set) => ({
  token: storedToken,
  user: parsedUser,

  setSession: (user, token) => {
    sessionStorage.setItem("tradematrix_token", token);
    sessionStorage.setItem("tradematrix_user", JSON.stringify(user));
    set({ user, token });
  },

  clearSession: () => {
    sessionStorage.removeItem("tradematrix_token");
    sessionStorage.removeItem("tradematrix_user");
    localStorage.removeItem("tradematrix_token");
    localStorage.removeItem("tradematrix_user");
    set({ user: null, token: null });
  },
}));
