'use client'

import { cn } from '@/utilities/ui'
import type { Project } from '@/payload-types'
import { Media } from '@/components/media'
import { useVideoHover } from '@/components/project/use-video-hover'

export const ProjectThumbnail: React.FC<{
  thumbnail: Project['thumbnail']
  video: Project['video']
  priority?: boolean
  className?: string
  videoClassName?: string
}> = ({ thumbnail, video, priority, className, videoClassName }) => {
  const { videoRef, videoContainerRef, handleMouseEnter, handleMouseLeave, handleVideoEnd, handleTransitionEnd } =
    useVideoHover()

  return (
    <div className={cn('relative overflow-hidden', className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Media
        htmlElement={null}
        resource={thumbnail}
        priority={priority}
        imgClassName="absolute inset-0 h-full w-full object-cover"
      />
      <div ref={videoContainerRef} className="absolute inset-0 opacity-0" onTransitionEnd={handleTransitionEnd}>
        <Media
          htmlElement={null}
          autoPlay={false}
          videoRef={videoRef}
          resource={video}
          preload="none"
          videoClassName={cn('absolute inset-0 size-full object-cover', videoClassName)}
          onEnded={handleVideoEnd}
        />
      </div>
    </div>
  )
}
