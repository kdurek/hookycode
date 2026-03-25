import type { StaticImageData } from 'next/image'
import type { ElementType, RefObject } from 'react'

import type { Media as MediaType } from '@/payload-types'

export interface Props {
  alt?: string
  className?: string
  fill?: boolean // for NextImage only
  htmlElement?: ElementType | null
  pictureClassName?: string
  imgClassName?: string
  onClick?: () => void
  onEnded?: () => void
  onLoad?: () => void
  preload?: 'auto' | 'none' | 'metadata'
  autoPlay?: boolean
  loading?: 'lazy' | 'eager' // for NextImage only
  priority?: boolean // for NextImage only
  imageRef?: RefObject<HTMLImageElement | null>
  videoRef?: RefObject<HTMLVideoElement | null>
  resource?: MediaType | string | number | null // for Payload media
  size?: string // for NextImage only
  src?: StaticImageData // for static media
  videoClassName?: string
}
