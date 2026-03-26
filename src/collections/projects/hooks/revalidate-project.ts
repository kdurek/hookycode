import { getPayload, type CollectionAfterChangeHook, type CollectionAfterDeleteHook } from 'payload'
import configPromise from '@payload-config'
import { revalidateTag } from 'next/cache'
import type { Project } from '@/payload-types'

export const revalidateProject: CollectionAfterChangeHook<Project> = async ({ doc }) => {
  const payload = await getPayload({ config: configPromise })
  const project = await payload.findByID({
    id: doc.id,
    collection: 'projects',
    overrideAccess: false,
    locale: 'all',
    select: {
      slug: true,
    },
    disableErrors: true,
  })
  if (project) {
    await Promise.all(
      Object.values(project.slug).map((slug) => revalidateTag(`project-${slug}`, 'max')),
    )
  }
  revalidateTag('projects', 'max')

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Project> = async ({ doc }) => {
  const payload = await getPayload({ config: configPromise })
  const project = await payload.findByID({
    id: doc.id,
    collection: 'projects',
    overrideAccess: false,
    locale: 'all',
    select: {
      slug: true,
    },
    disableErrors: true,
  })
  if (project) {
    await Promise.all(
      Object.values(project.slug).map((slug) => revalidateTag(`project-${slug}`, 'max')),
    )
  }
  revalidateTag('projects', 'max')

  return doc
}
