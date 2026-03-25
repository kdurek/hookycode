import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/rich-text'
import { CMSLink } from '@/components/link'
import { cn } from '@/utilities/ui'

export const CallToActionBlock: React.FC<CTABlockProps & { enableGutter?: boolean }> = ({
  links,
  richText,
  enableGutter = true,
}) => {
  return (
    <div
      className={cn({
        container: enableGutter,
        'max-w-none': !enableGutter,
      })}
    >
      <div className="flex flex-col items-center gap-4 bg-primary p-4 md:flex-row md:justify-between">
        {richText && (
          <RichText className="mb-0 prose-invert" data={richText} enableGutter={false} />
        )}
        <div className="flex flex-col gap-4">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
