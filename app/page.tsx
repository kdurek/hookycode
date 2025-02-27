'use client'

import { Hero } from '@/app/hero'
import { VARIANTS_CONTAINER } from '@/lib/constants'
import { Projects } from '@/app/projects'
import { Experience } from '@/app/experience'
import { Contact } from '@/app/contact'
import { motion } from 'motion/react'

export default function Personal() {
  return (
    <div>
      <Hero />
      <motion.main
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
      >
        <Projects />
        <Experience />
        <Contact />
      </motion.main>
    </div>
  )
}
