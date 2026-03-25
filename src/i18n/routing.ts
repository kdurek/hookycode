import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  localePrefix: 'as-needed',
  localeDetection: false,
  localeCookie: false,
  pathnames: {
    '/projects': {
      pl: '/projekty',
      en: '/projects',
    },
    '/projects/[slug]': {
      pl: '/projekty/[slug]',
      en: '/projects/[slug]',
    },
    '/projects/page/[pageNumber]': {
      pl: '/projekty/strona/[pageNumber]',
      en: '/projects/page/[pageNumber]',
    },
  },
})
