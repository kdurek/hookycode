import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload, type TypedLocale } from 'payload'
import React from 'react'

import { RenderBlocks } from '@/blocks/render-blocks'
import { RenderHero } from '@/heros/render-hero'
import { generateMeta } from '@/utilities/generate-meta'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
    locale: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home', locale = 'pl' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)

  const page = await queryCachedPageBySlug({
    slug: decodedSlug,
    locale,
  })()

  if (!page) {
    return notFound()
  }

  const { hero, layout } = page

  return (
    <article>
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} locale={locale} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home', locale = 'pl' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryCachedPageBySlug({
    slug: decodedSlug,
    locale,
  })()

  return generateMeta({ doc: page, locale })
}

const queryPageBySlug = async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    locale,
    pagination: false,
    overrideAccess: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
}

const queryCachedPageBySlug = ({ slug, locale }: { slug: string; locale: TypedLocale }) =>
  unstable_cache(async () => queryPageBySlug({ slug, locale }), ['page', slug, locale], {
    tags: [`page-${slug}`],
  })
