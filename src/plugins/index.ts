import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import { Page, type Project } from '@/payload-types'
import { SITE_URL, getLocalePrefix, getLocalizedPath } from '@/utilities/url-utils'
import { getTranslations } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'

const generateTitle: GenerateTitle<Page | Project> = async ({ doc, locale }) => {
  if (!hasLocale(routing.locales, locale)) {
    return doc?.title
  }
  const t = await getTranslations({ locale, namespace: 'seo' })
  return doc?.title ? `${doc.title} - ${t('title')}` : t('title')
}

const generateURL: GenerateURL<Page | Project> = ({ doc, collectionSlug, locale }) => {
  const validLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale
  const prefix = getLocalePrefix(validLocale)

  if (collectionSlug === 'projects') {
    const projectsPath = getLocalizedPath('/projects', validLocale)
    return doc?.slug
      ? `${SITE_URL}${prefix}${projectsPath}/${doc.slug}`
      : `${SITE_URL}${prefix}${projectsPath}`
  }

  const path = doc?.slug === 'home' ? '' : `/${doc?.slug ?? ''}`
  return `${SITE_URL}${prefix}${path}`
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
]
