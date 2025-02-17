export type Project = {
  name: string
  link: string
  thumbnail: string
  video: string
  description: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'POP-MEDIA',
    link: 'https://pop-media.pl',
    thumbnail: '/assets/popmedia.webp',
    video: '/assets/popmedia.mp4',
    description: 'Strona internetowa dla producenta i montażysty wideo',
  },
  {
    name: 'Klinck',
    link: 'https://klinck.pl',
    thumbnail: '/assets/klinck.webp',
    video: '/assets/klinck.mp4',
    description:
      'Strona internetowa dla firmy zajmującej się instalacją klimatyzacji',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'TVN Warner Bros. Discovery',
    title: 'Frontend Developer',
    start: '01/2022',
    end: 'Teraz',
    link: 'https://tvn24.pl',
  },
  {
    company: 'Hooky Code',
    title: 'Full Stack Developer',
    start: '01/2022',
    end: 'Teraz',
    link: 'https://hookycode.pl',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/kdurek',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/krzysztof-durek-73a166215',
  },
]

export const EMAIL = 'kontakt@hookycode.pl'
