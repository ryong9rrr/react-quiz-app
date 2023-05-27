/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_QUIZ_API_END_POINT: string
  readonly VITE_MODE: 'dev' | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
