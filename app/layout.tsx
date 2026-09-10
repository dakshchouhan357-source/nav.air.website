import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NAV AIR — Everyday essentials, with a little lift',
  description: 'Shop NAV AIR everyday essentials: Bloom Tumblers, Cloud Headphones, desk accessories, and more.',
  generator: 'NAV AIR',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f4f0',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
