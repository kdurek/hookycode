export {
  SITE_URL,
  getLocalePrefix,
  getLocalizedPath,
  buildRouteUrl,
  buildAlternateRefs,
} from '@/utilities/url-utils'

export const getLocalizedSlugs = (slugField: unknown): Record<string, string> =>
  slugField as Record<string, string>
