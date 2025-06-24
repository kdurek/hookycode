import { WORK_EXPERIENCE } from '@/lib/constants'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowDownIcon, BriefcaseIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Experience() {
  return (
    <div className="rounded-2xl border p-6">
      <h2 className="flex items-center text-sm font-semibold">
        <BriefcaseIcon className="text-muted-foreground size-6 flex-none" />
        <span className="ml-3">Doświadczenie</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {WORK_EXPERIENCE.map((job, jobIndex) => (
          <li key={jobIndex} className="flex gap-4">
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="border-muted-foreground/10 bg-muted shadow-muted/5 ring-muted-foreground/5 relative mt-1 flex size-10 flex-none items-center justify-center rounded-full border shadow-md"
            >
              <Image
                src={job.logo}
                alt={job.company}
                width={28}
                height={28}
                className="rounded-full"
              />
            </a>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dd className="w-full flex-none text-sm font-medium">
                {job.company}
              </dd>
              <dd className="text-muted-foreground text-xs">{job.title}</dd>
              <dd className="text-muted-foreground/50 ml-auto text-xs">
                <time dateTime={job.start}>{job.start}</time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={job.end}>{job.end}</time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Link
        href="/files/krzysztof-durek-cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ variant: 'secondary' }),
          'group mt-6 w-full',
        )}
      >
        Pobierz CV
        <ArrowDownIcon className="stroke-muted-foreground group-hover:stroke-foreground group-active:stroke-foreground size-4 transition" />
      </Link>
    </div>
  )
}
