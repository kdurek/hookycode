import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/media'

type Props = MediaBlockProps & {
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
}

export const MediaBlock: React.FC<Props> = (props) => {
  const { className, enableGutter = true, imgClassName, media, staticImage } = props

  return (
    <div className={cn({ container: enableGutter }, className)}>
      {(media || staticImage) && (
        <Media imgClassName={cn(imgClassName)} resource={media} src={staticImage} />
      )}
    </div>
  )
}
