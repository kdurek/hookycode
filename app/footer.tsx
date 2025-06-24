import Link from 'next/link'
import { NAV_LINKS } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="mt-32">
      <div className="border-t pt-10 pb-16">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex gap-6 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-primary transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Krzysztof Durek Hooky Code
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
