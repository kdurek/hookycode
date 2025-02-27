import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import { Magnetic } from './magnetic'

export function MagneticContactLink({
  children,
  link,
  className,
}: {
  type?: 'text' | 'icon'
  children: React.ReactNode
  link: string
  className?: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'group bg-primary hover:bg-primary/90 text-primary-foreground relative inline-flex shrink-0 items-center gap-1 rounded-2xl px-4 py-2 text-base transition-colors duration-200',
          className,
        )}
      >
        {children}
        <ArrowUpRight className="text-primary-foreground ml-1 size-4 transition-opacity duration-200" />
      </a>
    </Magnetic>
  )
}

export function MagneticContactIcon({
  link,
  icon,
}: {
  link: string
  icon: React.ReactNode
  className?: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'group bg-primary hover:bg-primary/90 text-primary-foreground relative inline-flex shrink-0 items-center rounded-2xl p-2 transition-colors duration-200',
        )}
      >
        {icon}
      </a>
    </Magnetic>
  )
}
