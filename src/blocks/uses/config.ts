import type { Block } from 'payload'

export const Uses: Block = {
  slug: 'uses',
  interfaceName: 'UsesBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
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
            },
          ],
        },
      ],
    },
  ],
}
