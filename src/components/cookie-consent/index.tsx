'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import {
  setConsentCookie,
  getConsentFromCookies,
  type ConsentStatus,
} from '@/utilities/cookie-consent'
import { Button, buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { cn } from '@/utilities/ui'

type CookieConsentContextValue = {
  consent: ConsentStatus
  isLoading: boolean
  accept: () => void
  reject: () => void
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null)

export const useCookieConsent = (): CookieConsentContextValue => {
  const context = useContext(CookieConsentContext)

  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider')
  }

  return context
}

type CookieConsentProviderProps = {
  children: React.ReactNode
}

export const CookieConsentProvider: React.FC<CookieConsentProviderProps> = ({ children }) => {
  const [consent, setConsent] = useState<ConsentStatus>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedConsent = getConsentFromCookies()
    setConsent(storedConsent)
    setIsLoading(false)
  }, [])

  const accept = useCallback(() => {
    setConsent('accepted')
    setConsentCookie('accepted')
  }, [])

  const reject = useCallback(() => {
    setConsent('rejected')
    setConsentCookie('rejected')
  }, [])

  const showBanner = !isLoading && consent === null

  return (
    <CookieConsentContext.Provider value={{ consent, isLoading, accept, reject }}>
      {children}
      {showBanner && <CookieConsentBanner onAccept={accept} onReject={reject} />}
    </CookieConsentContext.Provider>
  )
}

type BannerProps = {
  onAccept: () => void
  onReject: () => void
}

const CookieConsentBanner: React.FC<BannerProps> = ({ onAccept, onReject }) => {
  const t = useTranslations('cookieConsent')

  return (
    <div
      className="fixed right-0 bottom-0 left-0 z-50 border-t bg-background py-4 shadow"
      role="dialog"
      aria-label={t('bannerAriaLabel')}
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center text-sm text-balance sm:text-start">{t('message')}</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onReject}
              aria-label={t('rejectAriaLabel')}
              tabIndex={0}
            >
              {t('reject')}
            </Button>
            <Button type="button" onClick={onAccept} aria-label={t('acceptAriaLabel')} tabIndex={0}>
              {t('accept')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
