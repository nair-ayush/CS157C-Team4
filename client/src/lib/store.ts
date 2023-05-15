import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import theme from "./theme";

export interface User {
  id?: string;
  email?: string;
  isLoggedIn?: boolean;
  name?: string;
  type: "NORMAL" | "ADMIN";
  imageUrl?: string;
}

export const loadingAtom = atom(false);

export const themeModeAtom = atomWithStorage<"light" | "dark">(
  "app-theme",
  "light"
);
export const themeAtom = atom((get) => theme(get(themeModeAtom)));

export const userAtom = atomWithStorage<User>("explore-mate:user", {});
