'use client'

import React, { createContext, useContext, useRef } from 'react'
import { cn } from '@/utilities/ui'
import type { Project } from '@/payload-types'
import { Media } from '@/components/media'

type VideoHoverContext = {
  videoRef: React.RefObject<HTMLVideoElement | null>
  videoContainerRef: React.RefObject<HTMLDivElement | null>
  onVideoEnd: () => void
  onTransitionEnd: () => void
}

const VideoHoverContext = createContext<VideoHoverContext | null>(null)

export function ProjectThumbnail({ children, className }: { children: React.ReactNode; className?: string }) {
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const state = useRef('idle')

  const forceLayout = () => { void videoRef.current?.offsetWidth }

  const showVideo = () => {
    forceLayout()
    const container = videoContainerRef.current
    if (!container) return
    container.style.opacity = '1'
    container.style.transition = ''
  }

  const hideVideo = (durationSeconds = 0.5) => {
    forceLayout()
    const container = videoContainerRef.current
    if (!container) return
    container.style.opacity = '0'
    container.style.transition = `opacity ${durationSeconds}s linear`
  }

  const onMouseEnter = () => {
    if (state.current === 'idle') {
      state.current = 'playing'
      videoRef.current?.play()
      showVideo()
    } else if (state.current === 'leaving') {
      state.current = 'looping'
    }
  }

  const onMouseLeave = () => {
    state.current = 'leaving'
    hideVideo()
  }

  const onVideoEnd = () => {
    state.current = 'looping'
    hideVideo()
  }

  const onTransitionEnd = () => {
    if (state.current === 'leaving') {
      state.current = 'idle'
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.pause()
      }
    } else if (state.current === 'looping') {
      state.current = 'playing'
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play()
      }
      showVideo()
    }
  }

  return (
    <VideoHoverContext.Provider value={{ videoRef, videoContainerRef, onVideoEnd, onTransitionEnd }}>
      <div className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
      </div>
    </VideoHoverContext.Provider>
  )
}

export function ProjectThumbnailMedia({
  thumbnail,
  video,
  priority,
  className,
  videoClassName,
}: {
  thumbnail: Project['thumbnail']
  video: Project['video']
  priority?: boolean
  className?: string
  videoClassName?: string
}) {
  const ctx = useContext(VideoHoverContext)
  if (!ctx) throw new Error('ProjectThumbnailMedia must be used inside ProjectThumbnail')
  const { videoRef, videoContainerRef, onVideoEnd, onTransitionEnd } = ctx

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Media
        htmlElement={null}
        resource={thumbnail}
        priority={priority}
        imgClassName="absolute inset-0 h-full w-full object-cover"
      />
      <div ref={videoContainerRef} className="absolute inset-0 opacity-0" onTransitionEnd={onTransitionEnd}>
        <Media
          htmlElement={null}
          autoPlay={false}
          videoRef={videoRef}
          resource={video}
          preload="none"
          videoClassName={cn('absolute inset-0 size-full object-cover', videoClassName)}
          onEnded={onVideoEnd}
        />
      </div>
    </div>
  )
}

