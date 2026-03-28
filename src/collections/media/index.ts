import type { CollectionConfig, GenerateImageName } from 'payload'

import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

import { generateBlurDataURL } from './hooks/generate-blur-data-url'

const generateImageName: GenerateImageName = ({ originalName, sizeName, extension }) => {
  return `${originalName}-${sizeName}.${extension}`
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'blurDataURL',
      type: 'text',
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
  ],
  hooks: {
    afterChange: [generateBlurDataURL],
  },
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../../public/media'),
    mimeTypes: ['image/*', 'video/*'],
    resizeOptions: {
      width: 2048,
      fit: 'inside',
      withoutEnlargement: true,
    },
    formatOptions: {
      format: 'webp',
    },
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        withoutEnlargement: true,
        formatOptions: {
          format: 'webp',
        },
        generateImageName,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        formatOptions: {
          format: 'webp',
        },
        generateImageName,
      },
    ],
  },
}
