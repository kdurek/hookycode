import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRightIcon, CheckIcon } from 'lucide-react'
import Link from 'next/link'

const OFFER_ITEMS = [
  {
    title: 'Lepsza widoczność w internecie',
    description:
      'Twoja strona będzie widoczna 24/7. Klienci znajdą Cię łatwiej w Google dzięki optymalizacji SEO, bez względu na czas i miejsce.',
  },
  {
    title: 'Zwiększenie wiarygodności i profesjonalizmu',
    description:
      'Profesjonalna strona to wizytówka Twojej firmy, budująca zaufanie i pokazująca poważne podejście do biznesu.',
  },
  {
    title: 'Skuteczne pozyskiwanie nowych klientów',
    description:
      'Strona przyciągnie nowych klientów z wyszukiwarek i social mediów. Formularze kontaktowe pomogą przekształcić odwiedzających w klientów.',
  },
  {
    title: 'Prezentacja oferty w atrakcyjny sposób',
    description:
      'Szczegółowo przedstawisz swoje usługi, portfolio i opinie klientów, pokazując, dlaczego jesteś najlepszym wyborem.',
  },
  {
    title: 'Dostępność i łatwość kontaktu',
    description:
      'Klienci łatwo skontaktują się z Tobą przez formularze, telefony czy e-maile dostępne na stronie. Jesteś zawsze "pod ręką".',
  },
  {
    title: 'Budowanie marki i przewagi konkurencyjnej',
    description:
      'Własna strona to unikalna tożsamość online. Wyróżnisz się na tle konkurencji i zbudujesz silną markę.',
  },
  {
    title: 'Brak WordPressa - Większa wydajność i bezpieczeństwo',
    description:
      'Nie tworzę stron na WordPressie. Stawiam na indywidualne rozwiązania, które zapewniają szybsze działanie, większe bezpieczeństwo (mniej podatności na ataki) oraz pełną kontrolę nad kodem, bez zbędnych wtyczek i obciążeń.',
  },
]

export function Offer() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">
        Co zyskujesz dzięki stronie internetowej?
      </h2>
      <ol className="mt-10 space-y-8">
        {OFFER_ITEMS.map((item, itemIndex) => (
          <li key={itemIndex} className="flex gap-4">
            <div className="border-muted/50 bg-muted shadow-muted/5 ring-muted-foreground/5 relative mt-1 flex size-10 flex-none items-center justify-center rounded-full border shadow-md">
              <CheckIcon className="text-primary size-6 flex-none" />
            </div>
            <div className="flex flex-auto flex-wrap gap-x-2">
              <h3 className="w-full flex-none text-lg font-medium">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <Link
        href="/projects"
        className={cn(
          buttonVariants({ variant: 'secondary' }),
          'group mt-10 w-full',
        )}
      >
        Zobacz projekty
        <ArrowRightIcon className="stroke-muted-foreground group-hover:stroke-foreground group-active:stroke-foreground size-4 transition" />
      </Link>
    </div>
  )
}
