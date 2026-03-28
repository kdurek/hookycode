'use client'

import React, { createContext, useContext, useEffect, useRef } from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/media'
import type { Project } from '@/payload-types'

type VideoState = 'idle' | 'playing' | 'leaving' | 'looping'

type VideoHoverContext = {
  videoRef: React.RefObject<HTMLVideoElement | null>
  videoContainerRef: React.RefObject<HTMLDivElement | null>
  onVideoEnd: () => void
  onTransitionEnd: () => void
}

const VideoHoverContext = createContext<VideoHoverContext | null>(null)

export function ProjectThumbnail({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const state = useRef<VideoState>('idle')

  // Force a browser reflow so CSS transitions fire correctly from the current rendered state
  const forceLayout = () => {
    void videoRef.current?.offsetWidth
  }

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

  const restartVideo = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime = 0
    videoRef.current.play().catch(() => {})
  }

  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return
    if (state.current === 'idle') {
      state.current = 'playing'
      videoRef.current?.play()
      showVideo()
    } else if (state.current === 'leaving') {
      state.current = 'looping'
    }
  }

  const onPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return
    state.current = 'leaving'
    hideVideo()
  }

  // Touch: only handle idle→playing; subsequent taps after video ends do nothing (intentional)
  const onTouchStart = () => {
    if (state.current === 'idle') {
      state.current = 'playing'
      videoRef.current?.play()
      showVideo()
    }
  }

  useEffect(() => {
    const handleDocumentTouch = (e: TouchEvent) => {
      if (state.current === 'idle') return
      if (containerRef.current?.contains(e.target as Node)) return
      state.current = 'leaving'
      hideVideo()
    }
    document.addEventListener('touchstart', handleDocumentTouch)
    return () => document.removeEventListener('touchstart', handleDocumentTouch)
  }, [])

  const onVideoEnd = () => {
    state.current = 'looping'
    hideVideo()
  }

  const onTransitionEnd = () => {
    if (state.current === 'leaving') {
      state.current = 'idle'
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    } else if (state.current === 'looping') {
      state.current = 'playing'
      restartVideo()
      showVideo()
    }
  }

  return (
    <VideoHoverContext.Provider
      value={{ videoRef, videoContainerRef, onVideoEnd, onTransitionEnd }}
    >
      <div
        ref={containerRef}
        className={className}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onTouchStart={onTouchStart}
      >
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
  size,
}: {
  thumbnail: Project['thumbnail']
  video: Project['video']
  priority?: boolean
  className?: string
  videoClassName?: string
  size?: string
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
        size={size}
        imgClassName="absolute inset-0 h-full w-full object-cover"
      />
      <div
        ref={videoContainerRef}
        className="absolute inset-0 opacity-0"
        onTransitionEnd={onTransitionEnd}
      >
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
