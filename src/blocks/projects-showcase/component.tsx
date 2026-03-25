import type { ProjectShowcaseBlock as ProjectShowcaseBlockProps } from '@/payload-types'

import type { TypedLocale } from 'payload'
import React from 'react'

import { getCachedProjects } from '@/utilities/get-projects'
import { ProjectShowcase } from '@/components/project/showcase'

export const ProjectShowcaseBlock: React.FC<
  ProjectShowcaseBlockProps & { locale: TypedLocale }
> = async ({ locale }) => {
  const fetchedDocs = await getCachedProjects({ limit: 5, locale })()

  const projects = Array.from(
    { length: 5 },
    (_, index) => fetchedDocs.docs[index % fetchedDocs.docs.length],
  )

  return <ProjectShowcase docs={projects} />
}
