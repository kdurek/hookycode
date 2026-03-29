import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { routing } from '@/i18n/routing'
import { getLocalizedSlugs, buildRouteUrl, buildAlternateRefs } from '../sitemap-utils'

const getProjectsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
      collection: 'projects',
      overrideAccess: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      locale: 'all',
      sort: '-updatedAt',
      select: { slug: true, updatedAt: true },
    })

    const dateFallback = new Date().toISOString()
    const latestDate = docs[0]?.updatedAt || dateFallback

    const archiveEntry = {
      loc: buildRouteUrl(routing.defaultLocale, '/projects'),
      lastmod: latestDate,
      alternateRefs: buildAlternateRefs((l) => buildRouteUrl(l, '/projects')),
    }

    const projectEntries = docs.flatMap((project) => {
      const slugs = getLocalizedSlugs(project.slug)
      const defaultSlug = slugs[routing.defaultLocale]
      if (!defaultSlug) return []

      return [
        {
          loc: buildRouteUrl(routing.defaultLocale, '/projects', `/${defaultSlug}`),
          lastmod: project.updatedAt || dateFallback,
          alternateRefs: buildAlternateRefs((l) =>
            buildRouteUrl(l, '/projects', `/${slugs[l] || defaultSlug}`),
          ),
        },
      ]
    })

    return [archiveEntry, ...projectEntries]
  },
  ['projects-sitemap'],
  { tags: ['projects'] },
)

export async function GET() {
  return getServerSideSitemap(await getProjectsSitemap())
}
