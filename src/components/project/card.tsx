import React from 'react'
import { LinkIcon } from 'lucide-react'
import type { Project } from '@/payload-types'
import { CMSLink } from '@/components/link'
import { ProjectThumbnail } from '@/components/project/thumbnail'

export const ProjectCard: React.FC<{
  doc: Project
  priority?: boolean
  relationTo?: 'projects'
}> = (props) => {
  const { doc, priority = false, relationTo = 'projects' } = props
  const { slug, title, description, link, thumbnail, video } = doc
  const href = `/${relationTo}/${slug}`

  return (
    <div className="group relative space-y-2">
      <div className="group relative">
        <ProjectThumbnail
          thumbnail={thumbnail}
          video={video}
          priority={priority}
          className="z-10 aspect-video rounded-md"
          videoClassName="mask-[radial-gradient(white,black)]"
        />
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
