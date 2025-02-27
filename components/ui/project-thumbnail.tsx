'use client'

import type { Project } from '@/app/data'
import Image from 'next/image'
import { useRef } from 'react'

export const ProjectThumbnail = ({
  project,
  priority = false,
}: {
  project: Project
  priority?: boolean
}) => {
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
      <div className="relative">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border">
          <Image
            src={project.thumbnail}
            alt={project.name}
            fill
            priority={priority}
            className="object-cover"
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
            <video
              ref={videoRef}
              src={project.video}
              preload="none"
              muted
              playsInline
              className="absolute inset-0 size-full object-cover [mask-image:radial-gradient(white,black)]"
              onEnded={handleVideoEnd}
            />
          </div>
        </div>
      </div>
      <div className="px-1">
        <a
          className="group relative inline-block text-xl font-medium"
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.name}
          <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 transition-all duration-200 group-hover:max-w-full"></span>
        </a>
        <p className="text-muted-foreground text-lg">{project.description}</p>
      </div>
    </div>
  )
}
