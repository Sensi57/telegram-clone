import { useState, type SubmitEvent } from "react";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getStateInstance } from "@/shared/api/greenApi";
import { env } from "@/shared/config/env";
import { useSession } from "@/entities/session/model/store";

export function LoginForm() {
  const { t } = useTranslation();
  const login = useSession((s) => s.login);
  const [idInstance, setId] = useState(env.devIdInstance);
  const [apiTokenInstance, setToken] = useState(env.devApiToken);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const creds = {
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
    };
    try {
      await getStateInstance(creds);
      login(creds);
    } catch {
      setError(t("login.error"));
    } finally {
      setLoading(false);
    }
  }

  const field =
    "w-full px-3 py-2.5 rounded-xl text-[13px] outline-none bg-field border border-field-line text-fg focus:border-accent";
  return (
    <form
      onSubmit={submit}
      className="w-full max-w-sm rounded-2xl p-6 space-y-4 bg-card border border-card-line shadow-lg"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-accent text-white shadow-glow">
          <MessageCircle size={26} />
        </div>
        <h1 className="text-lg font-bold">{t("login.title")}</h1>
        <p className="text-xs text-fg-muted">{t("login.subtitle")}</p>
      </div>
      <input
        className={field}
        placeholder={t("login.idInstance")}
        value={idInstance}
        onChange={(e) => setId(e.target.value)}
        inputMode="numeric"
        required
      />
      <input
        className={field}
        placeholder={t("login.token")}
        value={apiTokenInstance}
        onChange={(e) => setToken(e.target.value)}
        type="password"
        required
      />
      {error && <p className="text-xs text-danger">{error}</p>}
      <button
        disabled={loading}
        className="w-full py-2.5 rounded-xl text-sm font-semibold bg-accent text-white disabled:opacity-60 transition active:scale-[.98]"
      >
        {loading ? t("login.checking") : t("login.submit")}
      </button>
    </form>
  );
}
