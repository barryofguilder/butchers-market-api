/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AWS_ACCESS_KEY_ID: string;
  readonly VITE_AWS_REGION: string;
  readonly VITE_AWS_SECRET_ACCESS_KEY: string;
  readonly VITE_DB_HOST: string;
  readonly VITE_DB_NAME: string;
  readonly VITE_DB_PASSWORD: string;
  readonly VITE_DB_USERNAME: string;
  readonly VITE_EMAIL_PASSWORD: string;
  readonly VITE_EMAIL_USER: string;
  readonly VITE_FEEDBACK_EMAIL_FROM: string;
  readonly VITE_FEEDBACK_EMAIL_SUBJECT: string;
  readonly VITE_FEEDBACK_EMAIL_TO: string;
  readonly VITE_OPTIMIZE_API_KEY: string;
  readonly VITE_OPTIMIZE_IMAGE_MAX_DIMENSION: string;
  readonly VITE_OPTIMIZE_IMAGES: string;
  readonly VITE_PORT: string;
  readonly VITE_RECAPTCHA_KEY: string;
  readonly VITE_S3_BUCKET: string;
  readonly VITE_TOKEN_PASSWORD: string;
  readonly VITE_TOKEN_SECRET: string;
  readonly VITE_TOKEN_USERNAME: string;
  readonly VITE_UPLOAD_DIR: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
