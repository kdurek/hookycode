'use client'

import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/link'

interface FooterClientProps {
  data: Footer
}

export const FooterClient: React.FC<FooterClientProps> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <footer className="mt-32">
      <div className="border-t pt-10 pb-16">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex gap-6 text-sm font-medium">
              {navItems.map(({ link }, i) => {
                return <CMSLink key={i} className="transition hover:text-primary" {...link} />
              })}
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Krzysztof Durek Hooky Code
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
