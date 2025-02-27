declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SMTP_HOST: string
      SMTP_USER: string
      SMTP_PASS: string
      TURNSTILE_SECRET_KEY: string
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: string
      NEXT_PUBLIC_UMAMI_URL: string
      NEXT_PUBLIC_UMAMI_ID: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
