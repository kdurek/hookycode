import { getCookie, setCookie } from 'cookies-next/client'

export type ConsentStatus = 'accepted' | 'rejected' | null

const COOKIE_CONSENT_NAME = 'cookie_consent'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year in seconds

export const getConsentFromCookies = (): ConsentStatus => {
  const value = getCookie(COOKIE_CONSENT_NAME)

  if (value === 'accepted' || value === 'rejected') {
    return value
  }

  return null
}

export const setConsentCookie = (status: 'accepted' | 'rejected'): void => {
  setCookie(COOKIE_CONSENT_NAME, status, {
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
  })
}
