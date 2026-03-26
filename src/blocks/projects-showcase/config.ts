import type { Block } from 'payload'

export const ProjectShowcase: Block = {
  slug: 'projectShowcase',
  interfaceName: 'ProjectShowcaseBlock',
  fields: [
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 5,
    },
  ],
  labels: {
    plural: 'Project Showcases',
    singular: 'Project Showcase',
  },
}
