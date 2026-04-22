import { FooterClient } from './component.client'
import { getCachedGlobal } from '@/utilities/get-globals'

import type { Footer } from '@/payload-types'
import type { TypedLocale } from 'payload'

export async function Footer({ locale }: { locale: TypedLocale }) {
  const footerData = await getCachedGlobal('footer', 1, locale)()

  return <FooterClient data={footerData} />
}
