import { TextEffect } from '@/components/ui/text-effect'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { CONTACT_LINKS } from '@/app/data'
import { MagneticContactIcon } from '@/components/ui/magnetic-contact-link'

const ENTRY_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
}

export function Hero() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center">
      <div className="relative container text-center">
        <motion.span
          className="bg-primary/5 absolute -top-16 -left-16 -z-10 size-96 rounded-full"
          initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <TextEffect
          className="text-5xl tracking-tight text-balance sm:text-6xl"
          preset="fade-in-blur"
          as="h1"
          per="char"
          speedReveal={4}
          segmentTransition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Strony internetowe dla firm i klientów indywidualnych
        </TextEffect>

        <TextEffect
          className="text-muted-foreground mt-8 text-lg text-pretty sm:text-lg/8"
          preset="blur"
          as="p"
          per="line"
          delay={0.5}
          speedReveal={0.8}
          segmentTransition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Tworzę nowoczesne i funkcjonalne strony internetowe, łącząc wygląd i
          funkcjonalność, aby dostarczać skalowalne i efektywne rozwiązania.
        </TextEffect>
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
          variants={ENTRY_VARIANTS}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.8,
            duration: 0.6,
            ease: 'easeOut',
          }}
        >
          {CONTACT_LINKS.map((link) => (
            <MagneticContactIcon
              key={link.label}
              link={link.link}
              icon={link.icon}
            />
          ))}
        </motion.div>
        <div className="mt-8 flex items-center justify-center gap-x-8">
          <motion.a
            href="#contact"
            className={buttonVariants({ variant: 'default', size: 'lg' })}
            variants={ENTRY_VARIANTS}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.5,
              delay: 0.5,
              ease: 'easeOut',
            }}
          >
            Zatrudnij mnie
          </motion.a>
          <motion.a
            href="#projects"
            className={buttonVariants({ variant: 'link', size: 'lg' })}
            variants={ENTRY_VARIANTS}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.5,
              delay: 0.6,
              ease: 'easeOut',
            }}
          >
            Zobacz projekty <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </div>
  )
}
