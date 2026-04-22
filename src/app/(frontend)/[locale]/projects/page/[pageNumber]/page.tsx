import type { Metadata } from 'next/types'

import { Pagination } from '@/components/pagination'
import configPromise from '@payload-config'
import { getPayload, type TypedLocale } from 'payload'
import { notFound } from 'next/navigation'
import { ProjectList } from '@/components/project/list'
import { getCachedProjects } from '@/utilities/get-projects'
import { getTranslations } from 'next-intl/server'
import { RenderHero } from '@/heros/render-hero'

export const dynamic = 'force-static'

type Args = {
  params: Promise<{
    pageNumber: string
    locale: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber, locale } = await paramsPromise

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const projects = await getCachedProjects({ page: sanitizedPageNumber, locale })()

  const t = await getTranslations({ locale })

  return (
    <article>
      <RenderHero type="base" title={t('projects.title')} description={t('projects.description')} />

      <section className="container mt-16 sm:mt-20">
        <ProjectList docs={projects.docs} />
      </section>

      <div className="container">
        {projects?.page && projects?.totalPages > 1 && (
          <Pagination collection="projects" page={projects.page} totalPages={projects.totalPages} />
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber, locale } = await paramsPromise
  const t = await getTranslations({ locale })
  return {
    title: `${t('projects.title')} - ${t('pagination.page')} ${pageNumber || ''} - ${t('seo.title')}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'projects',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
