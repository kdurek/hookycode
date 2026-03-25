import { link } from '@/fields/link'
import type { Block } from 'payload'

export const Experience: Block = {
  slug: 'experience',
  interfaceName: 'ExperienceBlock',
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
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'item',
          type: 'group',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'company',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
            {
              name: 'isCurrent',
              type: 'checkbox',
              required: true,
              defaultValue: false,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'start',
                  type: 'date',
                  required: true,
                  admin: {
                    date: {
                      pickerAppearance: 'monthOnly',
                      displayFormat: 'MM/yyyy',
                    },
                  },
                },
                {
                  name: 'end',
                  type: 'date',
                  required: true,
                  admin: {
                    condition: (_, siblingData) => !siblingData?.isCurrent,
                    date: {
                      pickerAppearance: 'monthOnly',
                      displayFormat: 'MM/yyyy',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    link({
      appearances: false,
      overrides: {
        name: 'cvLink',
        label: 'CV link',
      },
    }),
  ],
  labels: {
    plural: 'Experience blocks',
    singular: 'Experience block',
  },
}
