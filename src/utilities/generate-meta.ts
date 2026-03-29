import type { Metadata } from 'next'
import type { Media, Page, Config, Project } from '../payload-types'
import { mergeOpenGraph } from './merge-open-graph'
import { SITE_URL, buildRouteUrl, buildAlternateRefs } from '@/utilities/url-utils'
import { getTranslations } from 'next-intl/server'
import type { TypedLocale } from 'payload'
import { routing } from '@/i18n/routing'

const OG_LOCALE_MAP: Record<string, string> = { pl: 'pl_PL', en: 'en_GB' }

const getTitle = (doc: Partial<Page> | Partial<Project> | null, defaultTitle: string): string => {
  if (doc?.meta?.title) return doc.meta.title
  if (doc?.title && doc.slug !== 'home') return `${doc.title} - ${defaultTitle}`
  return defaultTitle
}

const getDescription = (
  doc: Partial<Page> | Partial<Project> | null,
  defaultDescription: string,
): string => doc?.meta?.description || defaultDescription

const getImage = (image?: Media | Config['db']['defaultIDType'] | null) => {
  if (image && typeof image === 'object' && 'url' in image) {
    const og = image.sizes?.og
    if (og?.url)
      return {
        url: SITE_URL + og.url,
        width: og.width ?? undefined,
        height: og.height ?? undefined,
      }
    if (image.url)
      return {
        url: SITE_URL + image.url,
        width: image.width ?? undefined,
        height: image.height ?? undefined,
      }
  }
  return { url: `${SITE_URL}/hookycode-OG.png`, width: 1200, height: 630 }
}

export const generateMeta = async (args: {
  doc?: Partial<Page> | Partial<Project> | null
  locale: TypedLocale
  route?: { pathname?: keyof typeof routing.pathnames; suffix?: string }
  pageTitle?: string
  title?: string
  description?: string
}): Promise<Metadata> => {
  const {
    doc = null,
    locale,
    route,
    pageTitle,
    title: titleOverride,
    description: descriptionOverride,
  } = args
  const t = await getTranslations({ locale, namespace: 'seo' })
  const image = getImage(doc?.meta?.image)
  const title =
    titleOverride ?? (pageTitle ? `${pageTitle} - ${t('title')}` : getTitle(doc, t('title')))
  const description = descriptionOverride ?? getDescription(doc, t('description'))
  const currentUrl = route ? buildRouteUrl(locale, route.pathname, route.suffix) : undefined

  return {
    title,
    description,
    alternates: route
      ? {
          canonical: currentUrl,
          languages: Object.fromEntries(
            buildAlternateRefs((l) => buildRouteUrl(l, route.pathname, route.suffix)).map((r) => [
              r.hreflang,
              r.href,
            ]),
          ) as Record<string, string>,
        }
      : undefined,
    openGraph: mergeOpenGraph({
      title,
      description: description || '',
      images: [image],
      url: currentUrl,
      locale: OG_LOCALE_MAP[locale] ?? locale,
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE_MAP[l] ?? l),
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
