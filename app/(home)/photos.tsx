import { cn } from '@/lib/utils'
import Link from 'next/link'

export function Photos() {
  const rotations = [
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    'rotate-2',
    '-rotate-2',
  ]

  return (
    <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
      {[
        '/assets/projects/popmedia.webp',
        '/assets/projects/klinck.webp',
        '/assets/projects/igajek.webp',
        '/assets/projects/ampapark.webp',
        '/assets/projects/popmedia.webp',
      ].map((image, imageIndex) => (
        <Link
          key={imageIndex}
          href="/projects"
          className={cn(
            'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl sm:w-72 sm:rounded-2xl',
            rotations[imageIndex % rotations.length],
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={image}
            sizes="(min-width: 640px) 18rem, 11rem"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </Link>
      ))}
    </div>
  )
}
