import { icons } from '@/lib/icons'

type NavLink = {
  label: string
  href: string
}

type ContactLink = {
  label: string
  link: string
  icon: React.ReactNode
}

export const WEBSITE_URL = 'https://hookycode.pl'

export const EMAIL = 'kontakt@hookycode.pl'

export const NAV_LINKS: NavLink[] = [
  {
    label: 'Strona główna',
    href: '/',
  },
  {
    label: 'Projekty',
    href: '/projects',
  },
  {
    label: 'Używam',
    href: '/uses',
  },
]

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: 'Github',
    icon: icons.github,
    link: 'https://github.com/kdurek',
  },
  {
    label: 'LinkedIn',
    icon: icons.linkedin,
    link: 'https://www.linkedin.com/in/krzysztof-durek-73a166215',
  },
  {
    label: EMAIL,
    icon: icons.mail,
    link: `mailto:${EMAIL}`,
  },
]
