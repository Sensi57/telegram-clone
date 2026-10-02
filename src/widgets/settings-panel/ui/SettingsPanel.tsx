import type { ReactNode } from "react";
import { ChevronLeft, Globe, LogOut, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSession } from "@/entities/session/model/store";
import { useChats } from "@/entities/chat/model/store";
import { ThemeSwitch } from "@/features/switch-theme/ui/ThemeSwitch";
import { LangSwitch } from "@/features/switch-lang/ui/LangSwitch";
import { IconButton } from "@/shared/ui/IconButton";

function Section({
  title,
  icon,
  label,
  children,
}: {
  title: string;
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-2.5 px-1 text-fg-muted">
        {title}
      </p>
      <div className="rounded-2xl overflow-hidden bg-card border border-card-line">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-card-line">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-accent-soft text-accent">
            {icon}
          </div>
          <span className="text-[13px] font-medium">{label}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function SettingsPanel({ onBack }: { onBack: () => void }) {
  const { t } = useTranslation();
  const logout = useSession((s) => s.logout);
  const reset = useChats((s) => s.reset);

  return (
    <div className="flex flex-col h-full bg-app">
      <div className="flex items-center gap-3 px-4 py-3 shrink-0 bg-header border-b border-line backdrop-blur">
        <IconButton
          className="md:hidden !bg-transparent"
          onClick={onBack}
          aria-label={t("common.back")}
        >
          <ChevronLeft size={18} />
        </IconButton>
        <span className="text-[16px] font-bold">{t("settings.title")}</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 pt-4 pb-8 space-y-5">
          <Section
            title={t("settings.appearance")}
            label={t("settings.theme")}
            icon={<Sun size={17} />}
          >
            <ThemeSwitch />
          </Section>
          <Section
            title={t("settings.general")}
            label={t("settings.language")}
            icon={<Globe size={17} />}
          >
            <LangSwitch />
          </Section>
          <button
            onClick={() => {
              reset();
              logout();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold bg-card border border-card-line text-danger"
          >
            <LogOut size={16} /> {t("settings.logout")}
          </button>
        </div>
      </div>
    </div>
  );
}
