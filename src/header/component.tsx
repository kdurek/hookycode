import { HeaderClient } from './component.client'
import { getCachedGlobal } from '@/utilities/get-globals'

import type { Header } from '@/payload-types'
import type { TypedLocale } from 'payload'

export async function Header({ locale }: { locale: TypedLocale }) {
  const headerData = await getCachedGlobal('header', 1, locale)()

  return <HeaderClient data={headerData} />
}
