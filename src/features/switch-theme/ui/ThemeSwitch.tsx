import { Moon, Sun } from "lucide-react";
import { useTheme, type Theme } from "../model/store";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="p-3 flex gap-3">
      {(["dark", "light"] as Theme[]).map((th) => {
        const on = theme === th;
        const Icon = th === "dark" ? Moon : Sun;
        return (
          <button
            key={th}
            onClick={() => setTheme(th)}
            className={`flex-1 flex flex-col items-center gap-2.5 py-4 rounded-xl border-[1.5px] transition ${
              on
                ? "bg-accent-soft border-accent shadow-glow"
                : "bg-surface border-transparent"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                on ? "bg-accent text-white" : "bg-surface-hover text-fg-sub"
              }`}
            >
              <Icon size={17} />
            </div>
            <span
              className={`text-xs font-semibold ${
                on ? "text-accent" : "text-fg-sub"
              }`}
            >
              {th}
            </span>
          </button>
        );
      })}
    </div>
  );
}
