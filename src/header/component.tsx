import { HeaderClient } from './component.client'
import { getCachedGlobal } from '@/utilities/get-globals'
import React from 'react'

import type { Header } from '@/payload-types'
import type { TypedLocale } from 'payload'

export async function Header({ locale }: { locale: TypedLocale }) {
  const headerData: Header = await getCachedGlobal('header', 1, locale)()

  return <HeaderClient data={headerData} />
}
