import { icons } from '@/icons'
import type { Page } from '@/payload-types'
import { cn } from '@/utilities/ui'

const platformIcons: Record<string, React.ReactNode> = {
  github: icons.github,
  linkedin: icons.linkedin,
  email: icons.mail,
}

export const BaseHero: React.FC<Page['hero']> = ({ title, description, contactLinks }) => {
  return (
    <div className={cn('container', contactLinks?.length ? 'mt-9' : 'mt-16 sm:mt-32')}>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-6 text-muted-foreground">{description}</p>
        {!!contactLinks?.length && (
          <ul className="mt-6 flex gap-6">
            {contactLinks.map((link) => (
              <li key={link.id} className="group -m-1 p-1">
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {platformIcons[link.platform]}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
