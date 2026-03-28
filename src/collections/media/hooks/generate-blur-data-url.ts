import type { CollectionAfterChangeHook } from 'payload'
import type { Media } from '@/payload-types'

import sharp from 'sharp'

export const generateBlurDataURL: CollectionAfterChangeHook<Media> = async ({ doc, req }) => {
  if (!doc.filename || !doc.mimeType?.startsWith('image/') || doc.mimeType === 'image/svg+xml') {
    return doc
  }

  if (doc.blurDataURL) return doc

  if (!doc.url) {
    req.payload.logger.warn(`generateBlurDataURL: skipping ${doc.filename} - no URL`)
    return doc
  }

  try {
    const fullUrl = doc.url.startsWith('http')
      ? doc.url
      : `${process.env.NEXT_PUBLIC_SERVER_URL}${doc.url}`

    const response = await fetch(fullUrl)
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
    const imageBuffer = Buffer.from(await response.arrayBuffer())

    const blurBuffer = await sharp(imageBuffer)
      .resize(10, 10, { fit: 'inside' })
      .blur(1)
      .png({ quality: 20 })
      .toBuffer()

    const blurDataURL = `data:image/png;base64,${blurBuffer.toString('base64')}`

    setTimeout(async () => {
      try {
        await req.payload.update({
          collection: 'media',
          id: doc.id,
          data: { blurDataURL },
        })
      } catch (err) {
        req.payload.logger.error({ err }, 'generateBlurDataURL: failed to save')
      }
    }, 100)
  } catch (err) {
    req.payload.logger.error({ err }, `generateBlurDataURL: failed for ${doc.filename}`)
  }

  return doc
}
