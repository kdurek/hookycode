import { CONTACT_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Hero({
  title,
  description,
  isHome = false,
}: {
  title: string
  description: string
  isHome?: boolean
}) {
  return (
    <div className={cn('container', isHome ? 'mt-9' : 'mt-16 sm:mt-32')}>
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="text-muted-foreground mt-6">{description}</p>
        {isHome && (
          <ul className="mt-6 flex gap-6">
            {CONTACT_LINKS.map((link) => (
              <li key={link.label} className="group -m-1 p-1">
                <a href={link.link} target="_blank" rel="noopener noreferrer">
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
