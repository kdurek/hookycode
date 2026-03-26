import { getPayload, type CollectionAfterChangeHook, type CollectionAfterDeleteHook } from 'payload'
import configPromise from '@payload-config'
import { revalidateTag } from 'next/cache'
import type { Page } from '@/payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({ doc }) => {
  const payload = await getPayload({ config: configPromise })
  const page = await payload.findByID({
    id: doc.id,
    collection: 'pages',
    overrideAccess: false,
    locale: 'all',
    select: {
      slug: true,
    },
    disableErrors: true,
  })
  if (page) {
    await Promise.all(Object.values(page.slug).map((slug) => revalidateTag(`page-${slug}`, 'max')))
  }
  revalidateTag('pages', 'max')

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = async ({ doc }) => {
  const payload = await getPayload({ config: configPromise })
  const page = await payload.findByID({
    id: doc.id,
    collection: 'pages',
    overrideAccess: false,
    locale: 'all',
    select: {
      slug: true,
    },
    disableErrors: true,
  })
  if (page) {
    await Promise.all(Object.values(page.slug).map((slug) => revalidateTag(`page-${slug}`, 'max')))
  }
  revalidateTag('pages', 'max')

  return doc
}
