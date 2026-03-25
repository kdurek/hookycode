import { routing } from '@/i18n/routing'

export const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const getLocalePrefix = (locale: string): string => {
  return locale === routing.defaultLocale ? '' : `/${locale}`
}

export const getLocalizedPath = (
  pathname: keyof typeof routing.pathnames,
  locale: string,
): string => {
  const pathConfig = routing.pathnames[pathname]
  return pathConfig[locale as keyof typeof pathConfig] || pathname
}

export const getLocalizedSlugs = (slugField: unknown): Record<string, string> => {
  return slugField as Record<string, string>
}

export const buildUrl = (prefix: string, ...segments: string[]): string => {
  const path = segments.filter(Boolean).join('/')
  return path ? `${SITE_URL}${prefix}/${path}` : `${SITE_URL}${prefix}/`
}

export const buildAlternateRefs = (buildHref: (locale: string) => string) => {
  return routing.locales.map((locale) => ({
    href: buildHref(locale),
    hreflang: locale,
  }))
}
