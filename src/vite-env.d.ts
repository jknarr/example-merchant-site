/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAZE_BACKEND_URL: string;
  readonly VITE_PAZE_MERCHANT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
