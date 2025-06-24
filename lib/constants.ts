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
    name: 'Ampa Park',
    link: 'https://ampapark.pl',
    thumbnail: '/assets/projects/ampapark.webp',
    video: '/assets/projects/ampapark.mp4',
    description:
      'Stworzyłem stronę dla parku rozrywki Ampa Park, która ułatwia rodzicom znalezienie atrakcji i szybki zakup biletów online. Strona jest przystosowana do obsługi wielu lokalizacji, co pozwala na łatwe zarządzanie informacjami o każdym oddziale i efektywne przyciąganie klientów, zwiększając ich zaangażowanie.',
  },
  {
    name: 'Klinck',
    link: 'https://klinck.pl',
    thumbnail: '/assets/projects/klinck.webp',
    video: '/assets/projects/klinck.mp4',
    description:
      'Zaprojektowałem nowoczesną i przejrzystą stronę dla Klinck Klimatyzacje, która skutecznie pozyskuje nowych klientów. Dzięki prostemu układowi i wyraźnym informacjom o usługach (w tym o bezpłatnym kosztorysie), strona buduje zaufanie i zachęca do kontaktu, usprawniając proces zdobywania zleceń.',
  },
  {
    name: 'POP-MEDIA',
    link: 'https://pop-media.pl',
    thumbnail: '/assets/projects/popmedia.webp',
    video: '/assets/projects/popmedia.mp4',
    description:
      'Stworzyłem profesjonalną stronę dla POP-MEDIA, skutecznie prezentującą ich usługi produkcji i montażu filmów. Nowoczesny design z ciemnym tłem podkreśla wizualny charakter branży. Strona jasno przedstawia różnorodność oferowanych formatów i jest dostępna w wielu językach, docierając do szerszej grupy klientów.',
  },
  {
    name: 'Izabela Gajek',
    link: 'https://igajek.pl',
    thumbnail: '/assets/projects/igajek.webp',
    video: '/assets/projects/igajek.mp4',
    description:
      'Zaprojektowałem stronę dla Izabeli Gajek, trenerki personalnej i medycznej, skutecznie budując jej markę i zaufanie. Przejrzysta strona zawiera osobistą historię, która pomaga klientom poczuć więź. Jasno przedstawia plany treningowe z cenami i referencje, ułatwiając potencjalnym klientom podjęcie decyzji i umówienie konsultacji.',
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
