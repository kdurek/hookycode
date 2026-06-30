import { slugField, type CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { revalidateDelete, revalidateProject } from './hooks/revalidate-project'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { anyone } from '@/access/anyone'
import slugify from '@sindresorhus/slugify'
import { link } from '@/fields/link'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // NOTE: the slug generic (CollectionConfig<'projects'>) is dropped to work around a TypeScript 6
  // regression where a slug-typed config's defaultPopulate is not assignable to buildConfig's
  // collections array. defaultPopulate falls back to SelectType (keys no longer field-checked);
  // restore the generic once the core types are fixed.
  defaultPopulate: {
    title: true,
    slug: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug'],
    useAsTitle: 'title',
  },
  orderable: true,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },

    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'description',
              type: 'text',
              required: true,
              localized: true,
            },
            link({
              appearances: false,
            }),
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'video',
              type: 'upload',
              relationTo: 'media',
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    slugField({ slugify: ({ valueToSlugify }) => slugify(valueToSlugify), localized: true }),
  ],
  hooks: {
    afterChange: [revalidateProject],
    afterDelete: [revalidateDelete],
  },
  versions: {
    maxPerDoc: 50,
  },
}
