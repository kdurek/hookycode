'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { useEffect, useRef, useState } from 'react'

import type { Header } from '@/payload-types'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/link'
import { LocaleSwitcher } from '@/header/locale-switcher'
import { Logo } from '@/components/logo/logo'

function clamp(number: number, a: number, b: number) {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

function MobileNavigation({ navItems }: { navItems: Header['navItems'] }) {
  const [open, setOpen] = useState(false)

  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="pointer-events-auto flex items-center rounded-full bg-muted/90 px-4 py-2 text-sm font-medium shadow-lg ring-1 shadow-muted/5 ring-muted/10 backdrop-blur hover:ring-muted/20 md:hidden">
        Menu
        <ChevronDownIcon className="ml-2 size-4 stroke-muted-foreground" />
      </DialogTrigger>
      <DialogContent className="top-4 translate-y-0 border-none bg-background ring-1 ring-muted">
        <DialogHeader>
          <DialogTitle className="text-start text-sm font-medium text-muted-foreground">
            Menu
          </DialogTitle>
          <DialogDescription hidden>Menu</DialogDescription>
        </DialogHeader>
        <nav className="mt-6">
          <ul className="-my-2 divide-y divide-muted-foreground/5">
            {navItems?.map(({ link }, i) => {
              const href =
                link.type === 'reference' &&
                typeof link.reference?.value === 'object' &&
                link.reference?.value.slug
                  ? `${link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''}/${
                      link.reference?.value.slug
                    }`
                  : link.url
              const isActive =
                // @ts-expect-error dynamic routing
                href === '/' ? pathname === href : href && pathname?.startsWith(href)

              return (
                <li key={i}>
                  <CMSLink className={cn('block py-2', isActive && 'text-primary')} {...link} />
                </li>
              )
            })}
          </ul>
        </nav>
        <LocaleSwitcher />
      </DialogContent>
    </Dialog>
  )
}

function DesktopNavigation({ navItems }: { navItems: Header['navItems'] }) {
  const pathname = usePathname()

  return (
    <nav>
      <ul className="pointer-events-auto hidden rounded-full bg-muted/90 px-3 text-sm font-medium shadow-lg ring-1 shadow-muted/5 ring-muted/10 backdrop-blur md:flex">
        {navItems?.map(({ link }, i) => {
          const href =
            link.type === 'reference' &&
            typeof link.reference?.value === 'object' &&
            link.reference?.value.slug
              ? `${link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''}/${
                  link.reference?.value.slug
                }`
              : link.url
          const isActive =
            // @ts-expect-error dynamic routing
            href === '/' ? pathname === href : href && pathname?.startsWith(href)

          return (
            <li key={i}>
              <CMSLink
                className={cn(
                  'relative block px-3 py-2 transition hover:text-primary',
                  isActive && 'text-primary',
                )}
                {...link}
              >
                {isActive && (
                  <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-primary/0 via-primary/40 to-primary/0" />
                )}
              </CMSLink>
            </li>
          )
        })}
        <LocaleSwitcher />
      </ul>
    </nav>
  )
}

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const pathname = usePathname()
  // @ts-expect-error dynamic routing
  const isHomePage = pathname === '/'

  const headerRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const isInitial = useRef(true)

  useEffect(() => {
    const downDelay = avatarRef.current?.offsetTop ?? 0
    const upDelay = 64

    function setProperty(property: string, value: string) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property)
    }

    function updateHeaderStyles() {
      const { top, height } = headerRef.current?.getBoundingClientRect() ?? {
        top: 0,
        height: 0,
      }
      const scrollY = clamp(window.scrollY, 0, document.body.scrollHeight - window.innerHeight)

      if (isInitial.current) {
        setProperty('--header-position', 'sticky')
      }

      setProperty('--content-offset', `${downDelay}px`)

      if (isInitial.current || scrollY < downDelay) {
        setProperty('--header-height', `${downDelay + height}px`)
        setProperty('--header-mb', `${-downDelay}px`)
      } else if (top + height < -upDelay) {
        const offset = Math.max(height, scrollY - upDelay)
        setProperty('--header-height', `${offset}px`)
        setProperty('--header-mb', `${height - offset}px`)
      } else if (top === 0) {
        setProperty('--header-height', `${scrollY + height}px`)
        setProperty('--header-mb', `${-scrollY}px`)
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty('--header-inner-position', 'sticky')
        removeProperty('--header-top')
        removeProperty('--avatar-top')
      } else {
        removeProperty('--header-inner-position')
        setProperty('--header-top', '0px')
        setProperty('--avatar-top', '0px')
      }
    }

    function updateAvatarStyles() {
      if (!isHomePage) {
        return
      }

      const fromScale = 1
      const toScale = 36 / 64
      const fromX = 0
      const toX = 2 / 16

      const scrollY = downDelay - window.scrollY

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
      scale = clamp(scale, fromScale, toScale)

      let x = (scrollY * (fromX - toX)) / downDelay + toX
      x = clamp(x, fromX, toX)

      setProperty('--avatar-image-transform', `translate3d(${x}rem, 0, 0) scale(${scale})`)

      const borderScale = 1 / (toScale / scale)
      const borderX = (-toX + x) * borderScale
      const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

      setProperty('--avatar-border-transform', borderTransform)
      setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0')
    }

    function updateStyles() {
      updateHeaderStyles()
      updateAvatarStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener('scroll', updateStyles, { passive: true })
    window.addEventListener('resize', updateStyles)

    return () => {
      window.removeEventListener('scroll', updateStyles)
      window.removeEventListener('resize', updateStyles)
    }
  }, [isHomePage])

  function AvatarContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <div
        className={cn(
          className,
          'h-10 w-10 rounded-full bg-muted/90 p-0.5 shadow-lg ring-1 shadow-muted/5 ring-muted/10 backdrop-blur',
        )}
        {...props}
      />
    )
  }

  function Avatar({
    large = false,
    className,
    ...props
  }: React.HTMLAttributes<HTMLAnchorElement> & { large?: boolean }) {
    return (
      <Link
        // @ts-expect-error dynamic routing
        href="/"
        aria-label="Home"
        className={cn(className, 'pointer-events-auto')}
        {...props}
      >
        {}
        <Logo
          sizes={large ? '4rem' : '2.25rem'}
          className={cn('rounded-full bg-muted object-cover', large ? 'size-16' : 'size-9')}
        />
      </Link>
    )
  }

  return (
    <>
      <header
        className="pointer-events-none relative z-50 flex flex-col"
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)',
        }}
      >
        {isHomePage && (
          <>
            <div ref={avatarRef} className="order-last mt-[calc(--spacing(16)-(--spacing(3)))]" />
            <div
              className="top-0 order-last container -mb-3 pt-3"
              style={{
                position: 'var(--header-position)' as React.CSSProperties['position'],
              }}
            >
              <div
                className="top-(--avatar-top,--spacing(3)) w-full"
                style={{
                  position: 'var(--header-inner-position)' as React.CSSProperties['position'],
                }}
              >
                <div className="relative">
                  <AvatarContainer
                    className="absolute top-3 left-0 origin-left transition-opacity"
                    style={{
                      opacity: 'var(--avatar-border-opacity, 0)',
                      transform: 'var(--avatar-border-transform)',
                    }}
                  />
                  <Avatar
                    large
                    className="block h-16 w-16 origin-left"
                    style={{ transform: 'var(--avatar-image-transform)' }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={{
            position: 'var(--header-position)' as React.CSSProperties['position'],
          }}
        >
          <div
            className="top-(--header-top,--spacing(6)) container w-full"
            style={{
              position: 'var(--header-inner-position)' as React.CSSProperties['position'],
            }}
          >
            <div className="relative flex gap-4">
              {!isHomePage && (
                <div className="flex flex-1">
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                </div>
              )}
              <div className="flex flex-1 justify-end">
                <MobileNavigation navItems={data.navItems} />
                <DesktopNavigation navItems={data.navItems} />
              </div>
            </div>
          </div>
        </div>
      </header>
      {isHomePage && <div style={{ height: 'var(--content-offset)' }} />}
    </>
  )
}
