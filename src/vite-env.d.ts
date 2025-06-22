/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LIBRARY_API_HOSTNAME: string;
  readonly VITE_YJS_WEBSOCKET_HOSTNAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
