import { atomWithStorage } from "jotai/utils";
import { User } from "../../server/src/routes/auth/schema";
import { atom } from "jotai";

// Define the structure of our auth state
export interface AuthState {
  email?: string;
  id?: number;
  name?: string;
  token: string | null;
}

// Create a persisted atom for auth state
export const storedAuthorizationAtom = atomWithStorage<AuthState>(
  "auth",
  {
    token: null,
  },
  {
    getItem(key: string, initialValue: AuthState) {
      const storedValue = localStorage.getItem(key);
      try {
        return JSON.parse(storedValue ?? "");
      } catch {
        return initialValue;
      }
    },
    setItem(key: string, value: AuthState) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem(key: string) {
      localStorage.removeItem(key);
    },
  }
);

storedAuthorizationAtom.onMount = (setValue) => {
  (async () => {
    const item = await localStorage.getItem("auth");
    if (item) setValue(JSON.parse(item));
  })();
};

// Create a derived atom for isAuthenticated state
export const isAuthenticatedAtom = atom(
  (get) => get(storedAuthorizationAtom).token !== null
);

export const AuthorizationAtom = atomWithStorage<string | null>(
  "Authorization",
  null
);
export interface UserState extends User {}
export const UserAtom = atomWithStorage<UserState | null>("User", null);
