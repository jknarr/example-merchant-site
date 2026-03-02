/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEMO_BACKEND_URL: string;
  readonly VITE_DEMO_MERCHANT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
