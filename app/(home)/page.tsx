import { Hero } from '@/app/(home)/hero'
import { Experience } from '@/app/(home)/experience'
import { Contact } from '@/app/(home)/contact'
import { ProjectsPhotos } from '@/app/(home)/projects-photos'
import { Offer } from '@/app/(home)/offer'

export default function Home() {
  return (
    <>
      <Hero
        isHome
        title="Strony internetowe dla firm i klientów indywidualnych"
        description="Tworzę nowoczesne i funkcjonalne strony internetowe, łącząc wygląd i funkcjonalność, aby dostarczać skalowalne i efektywne rozwiązania."
      />
      <div className="mt-16 sm:mt-20">
        <ProjectsPhotos />
      </div>
      <div className="container mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            <Offer />
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Contact />
            <Experience />
          </div>
        </div>
      </div>
    </>
  )
}
