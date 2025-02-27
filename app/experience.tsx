import { motion } from 'motion/react'
import { TRANSITION_SECTION } from '@/lib/constants'
import { VARIANTS_SECTION } from '@/lib/constants'
import { WORK_EXPERIENCE } from '@/app/data'
import { Heading } from '@/components/ui/heading'

export function Experience() {
  return (
    <motion.section
      id="experience"
      className="py-16"
      variants={VARIANTS_SECTION}
      transition={TRANSITION_SECTION}
    >
      <div className="container">
        <Heading>Doświadczenie</Heading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {WORK_EXPERIENCE.map((job) => (
            <a
              className="bg-muted relative overflow-hidden rounded-2xl"
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              key={job.company}
            >
              <div className="relative size-full p-4">
                <div className="relative flex w-full flex-row justify-between">
                  <div className="flex-1">
                    <h4 className="font-normal">{job.title}</h4>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                  <p className="text-muted-foreground">
                    {job.start} - {job.end}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
