/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GREEN_API_URL: string;
  readonly VITE_POLL_TIMEOUT_SEC: string;
  readonly VITE_DEV_ID_INSTANCE?: string;
  readonly VITE_DEV_API_TOKEN?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
