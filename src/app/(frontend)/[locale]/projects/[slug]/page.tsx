import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload, type TypedLocale } from 'payload'
import React from 'react'

import type { Project } from '@/payload-types'
import { generateMeta } from '@/utilities/generate-meta'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import { ProjectTemplate } from '@/components/project/template'
import { RenderHero } from '@/heros/render-hero'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'

export async function generateStaticParams({ params: { locale } }: { params: { locale: string } }) {
  if (!hasLocale(routing.locales, locale)) {
    return []
  }

  const payload = await getPayload({ config: configPromise })
  const projects = await payload.find({
    collection: 'projects',
    locale,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = projects.docs.map(({ slug }) => {
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

export default async function Project({ params: paramsPromise }: Args) {
  const { slug = '', locale = 'pl' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const project = await queryCachedProjectBySlug({ slug: decodedSlug, locale })()

  if (!project) return notFound()

  return (
    <article>
      <RenderHero type="base" title={project.title} description={project.description} />

      <section className="container mt-16 sm:mt-20">
        <ProjectTemplate project={project} />
      </section>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale = 'pl' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const project = await queryCachedProjectBySlug({ slug: decodedSlug, locale })()

  return generateMeta({
    doc: project,
    locale,
    route: { pathname: '/projects', suffix: `/${decodedSlug}` },
  })
}

const queryProjectBySlug = async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    locale,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
}

const queryCachedProjectBySlug = ({ slug, locale }: { slug: string; locale: TypedLocale }) =>
  unstable_cache(async () => queryProjectBySlug({ slug, locale }), ['project', slug, locale], {
    tags: [`project-${slug}`],
  })
