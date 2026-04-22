import type { Metadata } from 'next'

import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Geist } from 'next/font/google'
import React from 'react'

import { Footer } from '@/footer/component'
import { Header } from '@/header/component'
import { mergeOpenGraph } from '@/utilities/merge-open-graph'
import { getServerSideURL } from '@/utilities/get-url'
import { LayoutClient } from '@/app/(frontend)/[locale]/layout.client'
import { CookieConsentProvider } from '@/components/cookie-consent'
import { setDefaultOptions, type Locale } from 'date-fns'
import { pl, enGB } from 'date-fns/locale'
import { setRequestLocale } from 'next-intl/server'
import Script from 'next/script'

import './globals.css'

const DATE_LOCALES: Record<string, Locale> = {
  pl,
  en: enGB,
}

const geist = Geist({
  subsets: ['latin-ext'],
})

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  setDefaultOptions({ locale: DATE_LOCALES[locale] })

  return (
    <html className={geist.className} lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <CookieConsentProvider>
            <LayoutClient locale={locale} />
            <Header locale={locale} />
            {children}
            <Footer locale={locale} />
            {process.env.NEXT_PUBLIC_UMAMI_URL && process.env.NEXT_PUBLIC_UMAMI_ID && (
              <Script
                strategy="afterInteractive"
                src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
                data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
                data-performance="true"
              />
            )}
            {process.env.NEXT_PUBLIC_UMAMI_URL && process.env.NEXT_PUBLIC_UMAMI_ID && (
              <Script
                strategy="afterInteractive"
                src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/recorder.js`}
                data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
                data-sample-rate="1"
                data-mask-level="moderate"
                data-max-duration="300000"
              />
            )}
          </CookieConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
