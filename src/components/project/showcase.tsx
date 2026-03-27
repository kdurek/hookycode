import { cn } from '@/utilities/ui'
import { Project } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { ProjectThumbnail, ProjectThumbnailMedia } from '@/components/project/thumbnail'

const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

export function ProjectShowcase({ docs }: { docs: Project[] }) {
  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {docs.map((project, projectIndex) => (
          <ProjectThumbnail
            key={projectIndex}
            className={cn(
              'relative aspect-5/4 w-44 flex-none overflow-hidden rounded-xl sm:w-72 sm:rounded-2xl',
              rotations[projectIndex % rotations.length],
            )}
          >
            <ProjectThumbnailMedia
              thumbnail={project.thumbnail}
              video={project.video}
              className="absolute inset-0 rounded-none"
              size="(max-width: 640px) 176px, 288px"
            />
            <Link href="/projects" className="absolute inset-0 pointer-coarse:pointer-events-none" />
          </ProjectThumbnail>
        ))}
      </div>
    </div>
  )
}
