'use client'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/rich-text'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/link'
import { BlockHeader } from '@/components/block-header'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { title, columns } = props

  return (
    <div className="container my-16">
      {title && (
        <div className="mb-8">
          <BlockHeader title={title} />
        </div>
      )}
      <div className="grid grid-cols-4 gap-x-16 gap-y-8 lg:grid-cols-12">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(`col-span-4`, {
                  'lg:col-span-12': size === 'full',
                  'lg:col-span-6': size === 'half',
                  'lg:col-span-4': size === 'oneThird',
                  'lg:col-span-8': size === 'twoThirds',
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
