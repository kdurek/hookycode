import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="container flex items-center justify-center p-4 lg:justify-between lg:px-8">
        <div className="flex">
          <Link
            href="/"
            className="sm:text-foreground relative flex items-center text-center text-2xl font-medium sm:text-xl"
          >
            Krzysztof Durek Hooky Code
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          <a
            href="#projects"
            className={cn(
              buttonVariants({
                variant: 'link',
                className: 'text-foreground text-lg',
              }),
            )}
          >
            Projekty
          </a>
          <a
            href="#experience"
            className={cn(
              buttonVariants({
                variant: 'link',
                className: 'text-foreground text-lg',
              }),
            )}
          >
            Doświadczenie
          </a>
          <a
            href="#contact"
            className={cn(
              buttonVariants({
                variant: 'link',
                className: 'text-foreground text-lg',
              }),
            )}
          >
            Kontakt
          </a>
        </div>
        <div className="hidden lg:flex lg:justify-end">
          <a href="#contact" className={buttonVariants()}>
            Zatrudnij mnie <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  )
}
