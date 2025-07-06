import { PROJECTS } from '@/lib/data'
import { ProjectThumbnail } from '@/components/ui/project-thumbnail'
import { Hero } from '@/app/(home)/hero'

export default function Projects() {
  return (
    <>
      <Hero
        title="Moje projekty"
        description="Oto kilka przykładów moich ostatnich prac. Każda strona jest indywidualnym rozwiązaniem, dostosowanym do potrzeb klienta."
      />
      <div className="container mt-16 sm:mt-20">
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <ProjectThumbnail
              key={project.name}
              project={project}
              priority={index < 8}
            />
          ))}
        </div>
      </div>
    </>
  )
}
