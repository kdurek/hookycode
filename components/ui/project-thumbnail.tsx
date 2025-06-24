'use client'

import type { Project } from '@/lib/constants'
import { Link } from 'lucide-react'
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
      <div className="group relative">
        <div className="relative z-10 aspect-[16/9] overflow-hidden rounded-md">
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
              className="absolute inset-0 size-full [mask-image:radial-gradient(white,black)] object-cover"
              onEnded={handleVideoEnd}
            />
          </div>
        </div>
      </div>
      <h2 className="mt-6">
        <div className="bg-muted/50 absolute -inset-x-4 -inset-y-6 z-0 scale-95 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl" />
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-coarse:pointer-events-none"
        >
          <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
          <span className="relative z-10">{project.name}</span>
        </a>
      </h2>
      <p className="text-muted-foreground relative z-10 mt-2 text-sm">
        {project.description}
      </p>
      <p className="group-hover:text-primary relative z-10 mt-6 flex items-center text-sm font-medium transition">
        <Link className="size-4 flex-none" />
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 pointer-fine:pointer-events-none"
        >
          {project.link.replace('https://', '')}
        </a>
      </p>
    </div>
  )
}
