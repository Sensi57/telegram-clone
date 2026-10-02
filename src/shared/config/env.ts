export const env = {
  apiUrl: import.meta.env.VITE_GREEN_API_URL.replace(/\/$/, ""),
  pollTimeoutSec: Number(import.meta.env.VITE_POLL_TIMEOUT_SEC) || 5,
  defaultTheme: import.meta.env.VITE_DEFAULT_THEME || "dark",
  devIdInstance: import.meta.env.VITE_DEV_ID_INSTANCE || "",
  devApiToken: import.meta.env.VITE_DEV_API_TOKEN || "",
} as const;
