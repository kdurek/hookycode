import type { Metadata } from 'next'
import { getServerSideURL } from './get-url'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Hooky Code',
  images: [
    {
      url: `${getServerSideURL()}/hookycode-OG.png`,
      width: 1200,
      height: 630,
    },
  ],
  siteName: 'Hooky Code',
  title: 'Hooky Code',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
