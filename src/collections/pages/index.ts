import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { TwoColumns } from '@/blocks/two-columns/config'
import { CallToAction } from '../../blocks/call-to-action/config'
import { Content } from '../../blocks/content/config'
import { MediaBlock } from '../../blocks/media-block/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { revalidateDelete, revalidatePage } from './hooks/revalidate-page'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { anyone } from '@/access/anyone'
import { Contact } from '@/blocks/contact/config'
import slugify from '@sindresorhus/slugify'
import { ProjectShowcase } from '@/blocks/projects-showcase/config'
import { Offer } from '@/blocks/offer/config'
import { Uses } from '@/blocks/uses/config'
import { Experience } from '@/blocks/experience/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // NOTE: the slug generic (CollectionConfig<'pages'>) is dropped to work around a TypeScript 6
  // regression where a slug-typed config's defaultPopulate is not assignable to buildConfig's
  // collections array. defaultPopulate falls back to SelectType (keys no longer field-checked);
  // restore the generic once the core types are fixed.
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
  },
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
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                TwoColumns,
                CallToAction,
                Content,
                MediaBlock,
                Contact,
                ProjectShowcase,
                Offer,
                Uses,
                Experience,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
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
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete],
  },
  versions: {
    maxPerDoc: 50,
  },
}
