import { LANGS } from "@/shared/i18n";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

export function LangSwitch() {
  const { i18n } = useTranslation();
  return (
    <div className="p-2">
      {LANGS.map(({ code, label, flag }) => {
        const on = i18n.language === code;
        return (
          <button
            key={code}
            onClick={() => i18n.changeLanguage(code)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition ${
              on ? "bg-accent-soft" : ""
            }`}
          >
            <span
              className={`flex-1 text-[13px] font-medium ${
                on ? "text-accent" : "text-fg"
              }`}
            >
              {label}
            </span>
            {on && (
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-accent text-white">
                <Check size={14} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
