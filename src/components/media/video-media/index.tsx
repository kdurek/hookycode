'use client'

import { cn } from '@/utilities/ui'
import React from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/get-media-url'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, onEnded, preload, autoPlay = true, resource, videoRef, videoClassName } = props

  if (resource && typeof resource === 'object') {
    const { filename } = resource

    return (
      <video
        className={cn(videoClassName)}
        controls={false}
        loop
        muted
        onClick={onClick}
        onEnded={onEnded}
        playsInline
        preload={preload}
        autoPlay={autoPlay}
        ref={videoRef}
      >
        <source src={getMediaUrl(`/api/media/file/${filename}`)} />
      </video>
    )
  }

  return null
}
