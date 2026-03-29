import React from 'react'
import type { TypedLocale } from 'payload'

import type { TwoColumnsBlock as TwoColumnsBlockType } from '@/payload-types'
import { RenderBlocks } from '@/blocks/render-blocks'

type Props = TwoColumnsBlockType & { locale: TypedLocale }

export const TwoColumnsBlock: React.FC<Props> = ({ leftColumn, rightColumn, locale }) => {
  return (
    <div className="container mt-16 sm:mt-20">
      <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
        <div className="flex flex-col gap-16">
          {leftColumn?.length ? (
            <RenderBlocks blocks={leftColumn} locale={locale} enableGutter={false} />
          ) : null}
        </div>
        <div className="space-y-10 lg:pl-16 xl:pl-24">
          {rightColumn?.length ? (
            <RenderBlocks blocks={rightColumn} locale={locale} enableGutter={false} />
          ) : null}
        </div>
      </div>
    </div>
  )
}
