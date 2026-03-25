'use client'

import { setDefaultOptions } from 'date-fns'
import { pl, enGB } from 'date-fns/locale'
import type { TypedLocale } from 'payload'

const LOCALES = {
  pl,
  en: enGB,
}

export const LayoutClient: React.FC<{ locale: TypedLocale }> = ({ locale }) => {
  setDefaultOptions({ locale: LOCALES[locale] })

  return null
}
