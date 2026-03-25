import { cn } from '@/utilities/ui'
import { Project } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { ProjectThumbnail } from '@/components/project/thumbnail'

function ShowcaseItem({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={className}>
      <ProjectThumbnail
        thumbnail={project.thumbnail}
        video={project.video}
        className="absolute inset-0 rounded-none"
      />
      <Link href="/projects" className="absolute inset-0 pointer-coarse:pointer-events-none" />
    </div>
  )
}

export function ProjectShowcase({ docs }: { docs: Project[] }) {
  const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {docs.map((project, projectIndex) => (
          <ShowcaseItem
            key={projectIndex}
            project={project}
            className={cn(
              'relative aspect-5/4 w-44 flex-none overflow-hidden rounded-xl sm:w-72 sm:rounded-2xl',
              rotations[projectIndex % rotations.length],
            )}
          />
        ))}
      </div>
    </div>
  )
}
