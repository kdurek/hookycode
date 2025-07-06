import { Hero } from '@/app/(home)/hero'
import { USES } from '@/lib/data'

import { useId } from 'react'

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const id = useId()

  return (
    <section
      aria-labelledby={id}
      className="md:border-muted md:border-l md:pl-6"
    >
      <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
        <h2 id={id} className="text-sm font-semibold">
          {title}
        </h2>
        <div className="md:col-span-3">
          <ul role="list" className="space-y-10">
            {children}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Item({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <li className="group relative flex flex-col items-start">
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      {children && (
        <p className="text-muted-foreground relative z-10 mt-2 text-sm whitespace-pre-wrap">
          {children}
        </p>
      )}
    </li>
  )
}

export default function Uses() {
  return (
    <>
      <Hero
        title="Wszystko czego używam"
        description="Rzeczy, których używam do tworzenia oprogramowania, produktywności lub po prostu zabawy."
      />
      <div className="container mt-16 sm:mt-20">
        <div className="space-y-26">
          {USES.map((use) => (
            <Section key={use.name} title={use.name}>
              {use.items.map((item) => (
                <Item key={item.title} title={item.title}>
                  {item.description}
                </Item>
              ))}
            </Section>
          ))}
        </div>
      </div>
    </>
  )
}
