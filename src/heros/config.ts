import type { Field } from 'payload'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'none',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Base',
          value: 'base',
        },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => ['base'].includes(type),
      },
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        condition: (_, { type } = {}) => ['base'].includes(type),
      },
      required: true,
      localized: true,
    },
    {
      name: 'contactLinks',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => ['base'].includes(type),
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'GitHub', value: 'github' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Email', value: 'email' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  label: false,
}
