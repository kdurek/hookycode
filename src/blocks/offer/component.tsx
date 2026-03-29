import React from 'react'

import type { OfferBlock as OfferBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRightIcon, CheckIcon } from 'lucide-react'
import { CMSLink } from '@/components/link'
import { BlockHeader } from '@/components/block-header'

export const OfferBlock: React.FC<OfferBlockProps & { enableGutter?: boolean }> = (props) => {
  const { title, items, link, enableGutter } = props

  return (
    <div className={cn(enableGutter && 'container mt-16 sm:mt-20')}>
      <BlockHeader title={title} />
      <ol
        className={cn(
          'mt-10',
          enableGutter ? 'grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2' : 'space-y-8',
        )}
      >
        {items?.map(({ item }, itemIndex) => (
          <li key={itemIndex} className="flex gap-4">
            <div className="relative mt-1 flex size-10 flex-none items-center justify-center rounded-full border border-muted/50 bg-muted shadow-md shadow-muted/5 ring-muted-foreground/5">
              <CheckIcon className="size-6 flex-none text-primary" />
            </div>
            <div className="flex flex-auto flex-wrap gap-x-2">
              <h3 className="w-full flex-none text-lg font-medium">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <CMSLink
        className={cn(buttonVariants({ variant: 'secondary' }), 'group mt-10 w-full')}
        {...link}
      >
        <ArrowRightIcon className="size-4 stroke-muted-foreground transition group-hover:stroke-foreground group-active:stroke-foreground" />
      </CMSLink>
    </div>
  )
}
