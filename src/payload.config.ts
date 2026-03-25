import { mongooseAdapter } from '@payloadcms/db-mongodb'
import sharp from 'sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { Media } from './collections/media'
import { Pages } from './collections/pages'
import { Projects } from '@/collections/projects'
import { Users } from './collections/users'
import { Footer } from './footer/config'
import { Header } from './header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/default-lexical'
import { getServerSideURL } from './utilities/get-url'
import { authenticated } from '@/access/authenticated'
import { routing } from '@/i18n/routing'
import { Files } from '@/collections/files'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URL,
  }),
  collections: [Pages, Projects, Media, Files, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins,
  localization: {
    defaultLocale: routing.defaultLocale,
    locales: routing.locales.map((locale) => locale),
  },
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: authenticated,
    },
    tasks: [],
  },
})
