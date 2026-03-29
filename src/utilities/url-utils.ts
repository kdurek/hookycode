import { routing } from '@/i18n/routing'

export const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const getLocalePrefix = (locale: string): string =>
  locale === routing.defaultLocale ? '' : `/${locale}`

export const getLocalizedPath = (
  pathname: keyof typeof routing.pathnames,
  locale: string,
): string => {
  const pathConfig = routing.pathnames[pathname]
  return pathConfig[locale as keyof typeof pathConfig] || pathname
}

export const buildRouteUrl = (
  locale: string,
  pathname?: keyof typeof routing.pathnames,
  suffix?: string,
): string =>
  `${SITE_URL}${getLocalePrefix(locale)}${pathname ? getLocalizedPath(pathname, locale) : ''}${suffix ?? ''}`

export const buildAlternateRefs = (buildHref: (locale: string) => string) =>
  routing.locales.map((locale) => ({ href: buildHref(locale), hreflang: locale }))
