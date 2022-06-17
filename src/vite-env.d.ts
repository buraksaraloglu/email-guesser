/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly EMAIL_GUESSER_SERVICE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
