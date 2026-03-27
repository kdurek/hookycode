import type { ExperienceBlock as ExperienceBlockProps, Media as MediaType } from '@/payload-types'

import { CMSLink } from '@/components/link'
import { Media } from '@/components/media'
import { cn } from '@/utilities/ui'
import { buttonVariants } from '@/components/ui/button'
import { ArrowDownIcon, BriefcaseIcon } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { format } from 'date-fns'
import { getTranslations } from 'next-intl/server'

const toExternalHref = (href: string) => {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return href
  }

  return `https://${href}`
}

export const ExperienceBlock: React.FC<ExperienceBlockProps & { enableGutter?: boolean }> = async (
  props,
) => {
  const { title, items, cvLink, enableGutter } = props
  const t = await getTranslations('experience')

  return (
    <div className={cn(enableGutter && 'container mt-16 sm:mt-20')}>
      <div className="rounded-2xl border p-6">
        <h2 className="flex items-center text-sm font-semibold">
          <BriefcaseIcon className="size-6 flex-none text-muted-foreground" />
          <span className="ml-3">{title}</span>
        </h2>
        <ol className="mt-6 space-y-4">
          {items?.map(({ id, item }) => {
            const href = toExternalHref(item.link)
            const startDate = format(new Date(item.start), 'MM/yyyy')
            const endDate =
              item.isCurrent || !item.end ? t('present') : format(new Date(item.end), 'MM/yyyy')

            return (
              <li key={id} className="flex gap-4">
                <Link
                  // @ts-expect-error dynamic routing
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-1 flex size-10 flex-none items-center justify-center rounded-full border border-muted-foreground/10 bg-muted shadow-md shadow-muted/5 ring-muted-foreground/5"
                >
                  <Media
                    htmlElement={null}
                    resource={item.logo}
                    alt={item.company}
                    imgClassName="size-7 rounded-full object-cover"
                    size="40px"
                  />
                </Link>
                <dl className="flex flex-auto flex-wrap gap-x-2">
                  <dd className="w-full flex-none text-sm font-medium">{item.company}</dd>
                  <dd className="text-xs text-muted-foreground">{item.title}</dd>
                  <dd className="ml-auto text-xs text-muted-foreground/50">
                    <time dateTime={startDate}>{startDate}</time> <span aria-hidden="true">—</span>{' '}
                    <time dateTime={endDate}>{endDate}</time>
                  </dd>
                </dl>
              </li>
            )
          })}
        </ol>

        {cvLink && (
          <CMSLink
            className={cn(buttonVariants({ variant: 'secondary' }), 'group mt-6 w-full')}
            {...cvLink}
          >
            <ArrowDownIcon className="size-4 stroke-muted-foreground transition group-hover:stroke-foreground group-active:stroke-foreground" />
          </CMSLink>
        )}
      </div>
    </div>
  )
}
