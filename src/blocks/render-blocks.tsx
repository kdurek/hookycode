import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { TwoColumnsBlock } from '@/blocks/two-columns/component'
import { CallToActionBlock } from '@/blocks/call-to-action/component'
import { ContentBlock } from '@/blocks/content/component'
import { MediaBlock } from '@/blocks/media-block/component'
import { ContactBlock } from '@/blocks/contact/component'
import { ProjectShowcaseBlock } from '@/blocks/projects-showcase/component'
import { OfferBlock } from '@/blocks/offer/component'
import { UsesBlock } from '@/blocks/uses/component'
import { ExperienceBlock } from '@/blocks/experience/component'
import type { TypedLocale } from 'payload'

const blockComponents = {
  twoColumns: TwoColumnsBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  mediaBlock: MediaBlock,
  contact: ContactBlock,
  projectShowcase: ProjectShowcaseBlock,
  offer: OfferBlock,
  uses: UsesBlock,
  experience: ExperienceBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  locale: TypedLocale
  enableGutter?: boolean
}> = (props) => {
  const { blocks, locale, enableGutter = true } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={block.id}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} locale={locale} enableGutter={enableGutter} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
