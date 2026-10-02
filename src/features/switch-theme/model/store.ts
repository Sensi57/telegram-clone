import { create } from "zustand";
import { env } from "@/shared/config/env";

export type Theme = "dark" | "light";
const initial =
  (localStorage.getItem("theme") as Theme | null) ?? env.defaultTheme;

export const applyTheme = (t: Theme) => {
  document.documentElement.dataset.theme = t;
  localStorage.setItem("theme", t);
};

export const useTheme = create<{ theme: Theme; setTheme: (t: Theme) => void }>(
  (set) => ({
    theme: initial,
    setTheme: (theme) => {
      applyTheme(theme);
      set({ theme });
    },
  })
);
