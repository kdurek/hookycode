import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import { Page, type Project } from '@/payload-types'
import { getServerSideURL } from '@/utilities/get-url'
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

const generateURL: GenerateURL<Page | Project> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
]
