import configPromise from '@payload-config'
import { getPayload, type TypedLocale } from 'payload'
import { unstable_cache } from 'next/cache'

async function getProjects({
  page = 1,
  limit = 6,
  locale,
}: {
  page?: number
  limit?: number
  locale: TypedLocale
}) {
  const payload = await getPayload({ config: configPromise })

  const projects = await payload.find({
    collection: 'projects',
    locale,
    depth: 1,
    limit,
    page,
    overrideAccess: false,
  })

  return projects
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedProjects = ({
  page = 1,
  limit = 6,
  locale,
}: {
  page?: number
  limit?: number
  locale: TypedLocale
}) =>
  unstable_cache(
    async () => getProjects({ page, limit, locale }),
    ['projects', String(page), String(limit), locale],
    {
      tags: ['projects'],
    },
  )
