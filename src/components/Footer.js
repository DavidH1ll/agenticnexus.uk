import Link from 'next/link'
import { FaGithub, FaBluesky, FaLinkedin } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-obsidian">
      <div className="mx-auto flex max-w-page flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            David Hill &middot; Ayr, Scotland
          </p>
          <p className="text-sm text-muted">
            agenticnexus.uk &mdash; the stack that comes after.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <a
            href="mailto:hello@agenticnexus.uk"
            className="text-muted transition-colors hover:text-text"
          >
            hello@agenticnexus.uk
          </a>
          <span className="text-border" aria-hidden>
            /
          </span>
          <a
            href="https://github.com/DavidH1ll"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
          >
            <FaGithub aria-hidden className="h-4 w-4" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/davidh1ll"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
          >
            <FaLinkedin aria-hidden className="h-4 w-4" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://bsky.app/profile/agenticnexus.uk"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
          >
            <FaBluesky aria-hidden className="h-4 w-4" />
            <span>Bluesky</span>
          </a>
          <a
            href="https://pinemartinpost.uk/"
            target="_blank"
            rel="noreferrer"
            className="text-muted transition-colors hover:text-text"
          >
            pinemartinpost.uk
          </a>
        </div>
      </div>
    </footer>
  )
}
