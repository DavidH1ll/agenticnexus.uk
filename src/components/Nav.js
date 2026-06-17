'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/credentials', label: 'Credentials' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-obsidian/80 backdrop-blur supports-[backdrop-filter]:bg-obsidian/60">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono text-sm tracking-tight"
          aria-label="David Hill — Home"
        >
          <span
            aria-hidden
            className="relative flex h-2 w-2"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-text transition-colors group-hover:text-accent-soft">
            agenticnexus.uk
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.slice(1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-active={isActive(l.href)}
              className="nav-link rounded-md px-3 py-2"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
