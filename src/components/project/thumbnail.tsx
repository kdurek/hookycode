'use client'

import React, { useRef } from 'react'

import { LinkIcon } from 'lucide-react'
import type { Project } from '@/payload-types'
import { Media } from '@/components/media'
import { CMSLink } from '@/components/link'

export const ProjectThumbnail: React.FC<{
  doc: Project
  priority?: boolean
  relationTo?: 'projects'
}> = (props) => {
  const { doc, priority = false, relationTo = 'projects' } = props

  const { slug, title, description, link, thumbnail, video } = doc

  const href = `/${relationTo}/${slug}`

  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const state = useRef('idle')

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

  const handleVideoEnd = () => {
    state.current = 'looping'
    hideVideo()
  }

  return (
    <div
      className="group relative space-y-2"
      onMouseEnter={() => {
        if (state.current === 'idle') {
          state.current = 'playing'
          videoRef.current?.play()
          showVideo()
        } else if (state.current === 'leaving') {
          state.current = 'looping'
        }
      }}
      onMouseLeave={() => {
        state.current = 'leaving'
        hideVideo()
      }}
    >
      <div className="group relative">
        <div className="relative z-10 aspect-video overflow-hidden rounded-md">
          <Media
            htmlElement={null}
            resource={thumbnail}
            imgClassName="object-cover"
            priority={priority}
          />
          <div
            ref={videoContainerRef}
            className="absolute inset-0"
            onTransitionEnd={() => {
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
            }}
          >
            <Media
              htmlElement={null}
              autoPlay={false}
              videoRef={videoRef}
              resource={video}
              preload="none"
              videoClassName="absolute inset-0 size-full mask-[radial-gradient(white,black)] object-cover"
              onEnded={handleVideoEnd}
            />
          </div>
        </div>
      </div>
      <h2 className="mt-6">
        <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-muted/50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl" />
        <CMSLink className="pointer-coarse:pointer-events-none" {...link} label={null}>
          <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
          <span className="relative z-10">{title}</span>
        </CMSLink>
      </h2>
      <p className="relative z-10 mt-2 text-sm text-muted-foreground">{description}</p>
      <p className="relative z-10 mt-6 flex items-center text-sm font-medium transition group-hover:text-primary">
        <LinkIcon className="size-4 flex-none" />
        <CMSLink className="ml-2 pointer-fine:pointer-events-none" {...link} />
      </p>
    </div>
  )
}
