import { icons } from '@/lib/icons'

type NavLink = {
  label: string
  href: string
}

export type Project = {
  name: string
  link: string
  thumbnail: string
  video: string
  description: string
}

type WorkExperience = {
  logo: string
  company: string
  title: string
  start: string
  end: string
  link: string
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
]

export const PROJECTS: Project[] = [
  {
    name: 'POP-MEDIA',
    link: 'https://pop-media.pl',
    thumbnail: '/assets/projects/popmedia.webp',
    video: '/assets/projects/popmedia.mp4',
    description: 'Strona internetowa dla producenta i montażysty wideo',
  },
  {
    name: 'Klinck',
    link: 'https://klinck.pl',
    thumbnail: '/assets/projects/klinck.webp',
    video: '/assets/projects/klinck.mp4',
    description:
      'Strona internetowa dla firmy zajmującej się instalacją klimatyzacji',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    logo: '/assets/experience/tvn.webp',
    company: 'TVN Warner Bros. Discovery',
    title: 'Frontend Developer',
    start: '01/2022',
    end: 'Teraz',
    link: 'https://tvn24.pl',
  },
  {
    logo: '/assets/experience/hookycode.webp',
    company: 'Hooky Code',
    title: 'Full Stack Developer',
    start: '01/2022',
    end: 'Teraz',
    link: 'https://hookycode.pl',
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
