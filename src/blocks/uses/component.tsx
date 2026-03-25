import type { UsesBlock as UsesBlockProps } from '@/payload-types'

function Item({ title, description }: { title: string; description: string }) {
  const isExternalHref = description.startsWith('http://') || description.startsWith('https://')

  return (
    <li className="group relative flex flex-col items-start">
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      {!isExternalHref && (
        <p className="relative z-10 mt-2 text-sm whitespace-pre-wrap text-muted-foreground">
          {description}
        </p>
      )}
      {isExternalHref && (
        <a
          href={description}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 mt-2 text-sm whitespace-pre-wrap text-muted-foreground underline"
        >
          {description}
        </a>
      )}
    </li>
  )
}

export const UsesBlock: React.FC<UsesBlockProps> = (props) => {
  const { title, items } = props

  return (
    <div className="container mt-16 sm:mt-20">
      <div className="space-y-26">
        <section aria-labelledby={title} className="md:border-l md:border-muted md:pl-6">
          <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
            <h2 id={title} className="text-sm font-semibold">
              {title}
            </h2>
            <div className="md:col-span-3">
              <ul role="list" className="space-y-10">
                {items?.map(({ item }) => (
                  <Item key={item.title} title={item.title} description={item.description} />
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
