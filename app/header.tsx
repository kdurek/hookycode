'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-8 grid grid-cols-2 gap-4">
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          Krzysztof Durek
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Full Stack Developer
        </TextEffect>
      </div>
      <div className="place-self-end">
        <p className="text-end font-medium text-black dark:text-white">
          Hooky Code
        </p>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Strony Internetowe
        </TextEffect>
      </div>
    </header>
  )
}
