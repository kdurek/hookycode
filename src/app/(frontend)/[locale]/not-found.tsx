import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/utilities/ui'
import { buttonVariants } from '@/components/ui/button'

export default async function NotFound() {
  const t = await getTranslations('notFound')
  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>{t('title')}</h1>
        <p className="mb-4">{t('description')}</p>
      </div>
      {/* @ts-expect-error dynamic routing */}
      <Link className={cn(buttonVariants())} href="/">
        {t('goHome')}
      </Link>
    </div>
  )
}
