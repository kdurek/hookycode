import { link } from '@/fields/link'
import type { Block } from 'payload'

export const Offer: Block = {
  slug: 'offer',
  interfaceName: 'OfferBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    link({
      appearances: false,
    }),
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'group',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Offers',
    singular: 'Offer',
  },
}
