import type { ContactBlock as ContactBlockProps } from '@/payload-types'

import { MailIcon, ArrowRightIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/link'
import { buttonVariants } from '@/components/ui/button'

export const ContactBlock: React.FC<ContactBlockProps & { enableGutter?: boolean }> = (props) => {
  const { title, email, link, enableGutter } = props

  return (
    <div className={cn(enableGutter && 'container mt-16 sm:mt-20')}>
      <div className="rounded-2xl border p-6">
        <h2 className="flex items-center text-sm font-semibold">
          <MailIcon className="size-6 flex-none text-muted-foreground" />
          <span className="ml-3">{title}</span>
        </h2>
        <a
          href={`mailto:${email}`}
          className="mt-6 block text-2xl font-bold tracking-tight transition-colors hover:text-primary sm:text-3xl"
        >
          {email}
        </a>
        {link && (
          <CMSLink className={cn(buttonVariants(), 'group mt-6 w-full')} {...link}>
            <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
          </CMSLink>
        )}
      </div>
    </div>
  )
}
