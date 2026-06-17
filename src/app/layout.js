import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

export const metadata = {
  metadataBase: new URL('https://agenticnexus.uk'),
  title: {
    default: 'David Hill — IT Technician, Systems Builder',
    template: '%s · David Hill',
  },
  description:
    'Twenty years in IT infrastructure and security. Now building agentic systems, open-source tools, and the stack that comes after.',
  openGraph: {
    title: 'David Hill — IT Technician, Systems Builder',
    description:
      'Twenty years in IT infrastructure and security. Now building agentic systems, open-source tools, and the stack that comes after.',
    url: 'https://agenticnexus.uk',
    siteName: 'agenticnexus.uk',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Hill — IT Technician, Systems Builder',
    description:
      'Twenty years in IT infrastructure and security. Now building agentic systems, open-source tools, and the stack that comes after.',
  },
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-obsidian text-text antialiased">
        <div className="flex min-h-screen flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
