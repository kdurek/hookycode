import type { ProjectShowcaseBlock as ProjectShowcaseBlockProps } from '@/payload-types'
import type { Project } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload, type TypedLocale } from 'payload'
import { unstable_cache } from 'next/cache'
import React from 'react'

import { ProjectShowcase } from '@/components/project/showcase'

async function getShowcaseProjects(ids: string[], locale: TypedLocale): Promise<Project[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    locale,
    depth: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      id: { in: ids },
    },
  })

  return result.docs as Project[]
}

const getCachedShowcaseProjects = (ids: string[], locale: TypedLocale) =>
  unstable_cache(
    () => getShowcaseProjects(ids, locale),
    ['showcase-projects', ...ids, locale],
    { tags: ['projects'] },
  )

export const ProjectShowcaseBlock: React.FC<
  ProjectShowcaseBlockProps & { locale: TypedLocale }
> = async ({ projects: projectRefs, locale }) => {
  const ids = (projectRefs ?? [])
    .map((ref) => (typeof ref === 'object' && ref !== null ? ref.id : ref))
    .filter((id): id is string => id != null)

  if (ids.length === 0) return null

  const projects = await getCachedShowcaseProjects(ids, locale)()

  return <ProjectShowcase docs={projects} />
}
