import type { Metadata } from 'next/types'

import { Pagination } from '@/components/pagination'
import type { TypedLocale } from 'payload'
import React from 'react'
import { ProjectList } from '@/components/project/list'
import { getCachedProjects } from '@/utilities/get-projects'
import { getTranslations } from 'next-intl/server'
import { RenderHero } from '@/heros/render-hero'

export const dynamic = 'force-static'

export default async function Page({ params }: { params: Promise<{ locale: TypedLocale }> }) {
  const { locale } = await params

  const projects = await getCachedProjects({ locale })()

  const t = await getTranslations({ locale })

  return (
    <article>
      <RenderHero
        type="base"
        title={t('projects.title')}
        description={t('projects.description')}
      />

      <section className="container mt-16 sm:mt-20">
        <ProjectList docs={projects.docs} />
      </section>

      <div className="container">
        {projects.totalPages > 1 && projects.page && (
          <Pagination collection="projects" page={projects.page} totalPages={projects.totalPages} />
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: TypedLocale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return {
    title: `${t('projects.title')} - ${t('seo.title')}`,
  }
}
