import React from 'react'

import { Project } from '@/payload-types'
import { ProjectThumbnail } from '@/components/project/thumbnail'

export type Props = {
  docs: Project[]
}

export const ProjectList: React.FC<Props> = ({ docs }) => {
  if (!docs || docs.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      {docs?.map((doc, index) => {
        if (typeof doc === 'object' && doc !== null) {
          return (
            <ProjectThumbnail key={doc.slug} doc={doc} relationTo="projects" priority={index < 8} />
          )
        }

        return null
      })}
    </div>
  )
}
