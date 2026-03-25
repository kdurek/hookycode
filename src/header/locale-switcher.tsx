'use client'

import { useRouter, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { useTransition } from 'react'
import type { TypedLocale } from 'payload'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { routing } from '@/i18n/routing'

const STATIC_COLLECTIONS = ['projects'] as const

type StaticCollection = (typeof STATIC_COLLECTIONS)[number]

const LOCALE_LABELS: Record<TypedLocale, string> = {
  en: 'English',
  pl: 'Polski',
}

const isStaticCollection = (value: string): value is StaticCollection => {
  return STATIC_COLLECTIONS.includes(value as StaticCollection)
}

const fetchLocalizedSlug = async (
  collection: string,
  slug: string,
  currentLocale: string,
  targetLocale: string,
): Promise<string | null> => {
  try {
    const response = await fetch(
      `/api/${collection}?where[slug][equals]=${slug}&locale=${currentLocale}`,
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    const docId = data.docs?.[0]?.id

    if (!docId) {
      return null
    }

    const localizedResponse = await fetch(`/api/${collection}/${docId}?locale=${targetLocale}`)

    if (!localizedResponse.ok) {
      return null
    }

    const localizedData = await localizedResponse.json()

    return localizedData.slug ?? null
  } catch (error) {
    console.error(`Failed to fetch localized slug for ${collection}:`, error)
    return null
  }
}

export const LocaleSwitcher = () => {
  const currentLocale = useLocale() as TypedLocale
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  const pathnameParts = pathname.split('/')
  const firstSegment = pathnameParts[1] ?? ''
  const otherLocale: TypedLocale = currentLocale === 'pl' ? 'en' : 'pl'

  const handleLocaleChange = () => {
    if (isPending) {
      return
    }

    startTransition(async () => {
      try {
        if (isStaticCollection(firstSegment)) {
          await handleCollectionRoute(firstSegment, otherLocale)
        } else {
          await handlePageRoute(otherLocale)
        }
      } catch (error) {
        console.error('Failed to switch locale:', error)
      }
    })
  }

  const handleCollectionRoute = async (collection: StaticCollection, targetLocale: TypedLocale) => {
    const pathnameConfig = routing.pathnames[pathname as keyof typeof routing.pathnames]

    if (!pathnameConfig) {
      // @ts-expect-error -- Fallback to home when pathname config not found
      router.replace({ pathname: '/' }, { locale: targetLocale, scroll: false })
      return
    }

    let newPathname: string = pathnameConfig[targetLocale]

    if (params.pageNumber) {
      newPathname = newPathname.replace('[pageNumber]', params.pageNumber as string)
    }

    if (params.slug) {
      const localizedSlug = await fetchLocalizedSlug(
        collection,
        params.slug as string,
        currentLocale,
        targetLocale,
      )

      if (!localizedSlug) {
        // @ts-expect-error -- Fallback to home when localized slug not found
        router.replace({ pathname: '/' }, { locale: targetLocale, scroll: false })
        return
      }

      newPathname = newPathname.replace('[slug]', localizedSlug)
    }

    // @ts-expect-error -- TypeScript will validate that only known `params`
    // are used in combination with a given `pathname`. Since the two will
    // always match for the current route, we can skip runtime checks.
    router.replace({ pathname: newPathname, params }, { locale: targetLocale, scroll: false })
  }

  const handlePageRoute = async (targetLocale: TypedLocale) => {
    let newSlug = ''

    if (params.slug) {
      const localizedSlug = await fetchLocalizedSlug(
        'pages',
        params.slug as string,
        currentLocale,
        targetLocale,
      )

      newSlug = localizedSlug ?? ''
    }

    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname: `/${newSlug}`, params },
      { locale: targetLocale, scroll: false },
    )
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      disabled={isPending}
      className={cn('-ml-2 rounded-full md:ml-0', isPending && 'opacity-50')}
      onClick={handleLocaleChange}
      aria-label={`Switch to ${LOCALE_LABELS[otherLocale]}`}
    >
      <Image
        alt={`${otherLocale} flag`}
        aria-hidden="true"
        loading="lazy"
        fetchPriority="low"
        decoding="async"
        src={`/${otherLocale}.svg`}
        width={0}
        height={0}
        className="size-5"
      />
    </Button>
  )
}
