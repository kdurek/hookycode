import React from 'react'

import { type Project } from '@/payload-types'
import { Media } from '@/components/media'

export type Props = {
  project: Project
}

export const ProjectTemplate: React.FC<Props> = ({ project }) => {
  const { thumbnail } = project

  return (
    <>
      {thumbnail && typeof thumbnail === 'object' && (
        <Media htmlElement={null} imgClassName="mx-auto mb-8 size-full" resource={thumbnail} />
      )}
    </>
  )
}
