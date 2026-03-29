import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { routing } from '@/i18n/routing'
import { SITE_URL, getLocalePrefix, getLocalizedSlugs, buildAlternateRefs } from '../sitemap-utils'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      locale: 'all',
      select: { slug: true, updatedAt: true },
    })

    const dateFallback = new Date().toISOString()

    return docs.flatMap((page) => {
      const slugs = getLocalizedSlugs(page.slug)
      const defaultSlug = slugs[routing.defaultLocale]
      if (!defaultSlug) return []

      const buildPageUrl = (locale: string) => {
        const slug = slugs[locale] || defaultSlug
        const path = slug === 'home' ? '' : `/${slug}`
        return `${SITE_URL}${getLocalePrefix(locale)}${path}`
      }

      return [
        {
          loc: buildPageUrl(routing.defaultLocale),
          lastmod: page.updatedAt || dateFallback,
          alternateRefs: buildAlternateRefs(buildPageUrl),
        },
      ]
    })
  },
  ['pages-sitemap'],
  { tags: ['pages'] },
)

export async function GET() {
  return getServerSideSitemap(await getPagesSitemap())
}
