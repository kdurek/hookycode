import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { routing } from '@/i18n/routing'
import {
  SITE_URL,
  getLocalePrefix,
  getLocalizedPath,
  getLocalizedSlugs,
  buildAlternateRefs,
} from '../sitemap-utils'

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

    const buildArchiveUrl = (locale: string) => {
      const prefix = getLocalePrefix(locale)
      const path = getLocalizedPath('/projects', locale)
      return `${SITE_URL}${prefix}${path}`
    }

    const archiveEntry = {
      loc: buildArchiveUrl(routing.defaultLocale),
      lastmod: latestDate,
      alternateRefs: buildAlternateRefs(buildArchiveUrl),
    }

    const projectEntries = docs
      .filter((project) => {
        const slugs = getLocalizedSlugs(project.slug)
        return Boolean(slugs[routing.defaultLocale])
      })
      .map((project) => {
        const slugs = getLocalizedSlugs(project.slug)
        const defaultSlug = slugs[routing.defaultLocale]

        const buildProjectUrl = (locale: string) => {
          const prefix = getLocalePrefix(locale)
          const path = getLocalizedPath('/projects', locale)
          const slug = slugs[locale] || defaultSlug
          return `${SITE_URL}${prefix}${path}/${slug}`
        }

        return {
          loc: buildProjectUrl(routing.defaultLocale),
          lastmod: project.updatedAt || dateFallback,
          alternateRefs: buildAlternateRefs(buildProjectUrl),
        }
      })

    return [archiveEntry, ...projectEntries]
  },
  ['projects-sitemap'],
  { tags: ['projects-sitemap'] },
)

export async function GET() {
  return getServerSideSitemap(await getProjectsSitemap())
}
