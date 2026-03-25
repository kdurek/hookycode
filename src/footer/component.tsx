import { FooterClient } from './component.client'
import { getCachedGlobal } from '@/utilities/get-globals'
import React from 'react'

import type { Footer } from '@/payload-types'
import type { TypedLocale } from 'payload'

export async function Footer({ locale }: { locale: TypedLocale }) {
  const footerData: Footer = await getCachedGlobal('footer', 1, locale)()

  return <FooterClient data={footerData} />
}
