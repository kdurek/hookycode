import type { Metadata } from 'next'

import type { Media, Page, Config, Project } from '../payload-types'

import { mergeOpenGraph } from './merge-open-graph'
import { getServerSideURL } from './get-url'
import { getTranslations } from 'next-intl/server'
import type { TypedLocale } from 'payload'

const getTitle = (doc: Partial<Page> | Partial<Project> | null, defaultTitle: string): string => {
  let title = defaultTitle

  const isHomePage = doc?.slug === 'home'
  if (doc?.title && !isHomePage) {
    title = `${doc.title} - ${defaultTitle}`
  }

  if (doc?.meta?.title) {
    title = doc.meta.title
  }

  return title
}

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/hookycode-OG.png'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Project> | null
  locale: TypedLocale
}): Promise<Metadata> => {
  const { doc, locale } = args
  const t = await getTranslations({ locale, namespace: 'seo' })
  const ogImage = getImageURL(doc?.meta?.image)
  const title = getTitle(doc, t('title'))

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      siteName: title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
