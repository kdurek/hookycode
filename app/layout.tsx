import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import Script from 'next/script'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  title: 'Krzysztof Durek | Hooky Code',
  description: 'Tworzenie stron internetowych i aplikacji',
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin-ext'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin-ext'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <Script
          src={process.env.NEXT_PUBLIC_COOKIE_YES_URL}
          strategy="beforeInteractive"
        />
        <Script
          defer
          src={process.env.NEXT_PUBLIC_UMAMI_URL}
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} tracking-tight antialiased`}
      >
        <div className="font-[family-name:var(--font-inter-tight)]">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
