import type { CollectionConfig } from 'payload'

import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Files: CollectionConfig = {
  slug: 'files',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [],
  upload: {
    // Upload to the public/files directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/files'),
    mimeTypes: ['application/pdf'],
  },
}
