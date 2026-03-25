import type { Block } from 'payload'

import { CallToAction } from '@/blocks/call-to-action/config'
import { Content } from '@/blocks/content/config'
import { MediaBlock } from '@/blocks/media-block/config'
import { Contact } from '@/blocks/contact/config'
import { ProjectShowcase } from '@/blocks/projects-showcase/config'
import { Offer } from '@/blocks/offer/config'
import { Uses } from '@/blocks/uses/config'
import { Experience } from '@/blocks/experience/config'

const columnBlocks = [CallToAction, Content, MediaBlock, Contact, ProjectShowcase, Offer, Uses, Experience]

export const TwoColumns: Block = {
  slug: 'twoColumns',
  interfaceName: 'TwoColumnsBlock',
  labels: { singular: 'Two Columns', plural: 'Two Columns blocks' },
  fields: [
    {
      name: 'leftColumn',
      type: 'blocks',
      blocks: columnBlocks,
    },
    {
      name: 'rightColumn',
      type: 'blocks',
      blocks: columnBlocks,
    },
  ],
}
