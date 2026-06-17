import { FaGithub, FaBluesky, FaLinkedin } from 'react-icons/fa6'
import ContactForm from '@/components/ContactForm'
import { profile } from '@/lib/data'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with David Hill.',
}

export default function Contact() {
  return (
    <div className="mx-auto max-w-page px-6 py-16 sm:px-8 sm:py-20">
      <header className="mb-12 max-w-prose">
        <p className="label-mono mb-4">Contact</p>
        <h1 className="text-display-lg font-semibold text-text">
          Let&apos;s talk.
        </h1>
        <p className="mt-4 text-lg text-muted">
          Infrastructure roles, security engagements, agentic systems work, or
          open-source collaboration &mdash; I read everything that comes
          through.
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
        <div>
          <ContactForm />
        </div>

        <aside className="space-y-8">
          <div>
            <p className="label-mono mb-3">Direct</p>
            <a
              href={`mailto:${profile.email}`}
              className="text-sm text-text transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
          </div>
          <div>
            <p className="label-mono mb-3">Elsewhere</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/DavidH1ll"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
                >
                  <FaGithub aria-hidden className="h-4 w-4" />
                  <span>github.com/DavidH1ll</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/davidh1ll"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
                >
                  <FaLinkedin aria-hidden className="h-4 w-4" />
                  <span>linkedin.com/in/davidh1ll</span>
                </a>
              </li>
              <li>
                <a
                  href="https://bsky.app/profile/agenticnexus.uk"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
                >
                  <FaBluesky aria-hidden className="h-4 w-4" />
                  <span>bsky.app/profile/agenticnexus.uk</span>
                </a>
              </li>
              <li>
                <a
                  href="https://pinemartinpost.uk/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted transition-colors hover:text-text"
                >
                  pinemartinpost.uk
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="label-mono mb-3">Location</p>
            <p className="text-sm text-muted">{profile.location}</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
