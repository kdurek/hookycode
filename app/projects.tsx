import { motion } from 'motion/react'
import { TRANSITION_SECTION } from '@/lib/constants'
import { VARIANTS_SECTION } from '@/lib/constants'
import { PROJECTS } from '@/app/data'
import { ProjectThumbnail } from '@/components/ui/project-thumbnail'
import { Heading } from '@/components/ui/heading'

export function Projects() {
  return (
    <motion.section
      id="projects"
      className="py-16"
      variants={VARIANTS_SECTION}
      transition={TRANSITION_SECTION}
    >
      <div className="container">
        <Heading>Projekty</Heading>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <ProjectThumbnail
              key={project.name}
              project={project}
              priority={index < 8}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
