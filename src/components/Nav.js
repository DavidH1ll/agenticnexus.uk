'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const links = [
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/credentials', label: 'Credentials' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-obsidian/80 backdrop-blur supports-[backdrop-filter]:bg-obsidian/60">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono text-sm tracking-tight"
          aria-label="David Hill — Home"
          onClick={() => setOpen(false)}
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

        <nav className="hidden items-center gap-1 sm:gap-2 md:flex">
          {links.map((l) => (
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

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/60 text-muted transition-colors hover:border-border hover:text-text md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border/60 bg-obsidian/95 backdrop-blur md:hidden"
        >
          <nav className="mx-auto flex max-w-page flex-col px-6 py-2 sm:px-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-active={isActive(l.href)}
                className="nav-link justify-between border-b border-border/40 py-3 last:border-b-0"
              >
                {l.label}
                <span aria-hidden className="text-muted">&rarr;</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
