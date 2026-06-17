import Link from 'next/link'
import { experience } from '@/lib/data'
import { getAllWork } from '@/lib/content'

export const metadata = {
  title: 'Work',
  description:
    'Twenty years of experience in IT infrastructure, security, and the open-source work happening now.',
}

export default function Work() {
  const work = getAllWork()

  return (
    <div className="mx-auto max-w-page px-6 py-16 sm:px-8 sm:py-20">
      <header className="mb-16">
        <p className="label-mono mb-4">Work</p>
        <h1 className="text-display-lg font-semibold text-text">
          Experience &amp; selected projects
        </h1>
        <p className="mt-4 max-w-prose text-lg text-muted">
          The career history, and the open-source work that&apos;s been
          happening in parallel.
        </p>
      </header>

      <section className="mb-24">
        <h2 className="mb-8 text-display-md font-semibold text-text">
          Experience
        </h2>
        <ol className="relative space-y-10 border-l border-border pl-8">
          {experience.map((e) => (
            <li key={`${e.company}-${e.role}`} className="relative">
              <span
                aria-hidden
                className="absolute -left-[34px] top-2 h-2.5 w-2.5 rounded-full border border-accent bg-obsidian"
              />
              <p className="label-mono mb-2">{e.period}</p>
              <h3 className="text-lg font-semibold text-text">{e.role}</h3>
              <p className="text-sm text-muted">
                {e.company} &middot; {e.location}
              </p>
              <p className="mt-3 max-w-prose text-[1.05rem] leading-relaxed text-text/85">
                {e.summary}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="mb-8 text-display-md font-semibold text-text">
          Selected projects
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {work.map((item) => (
            <Link
              key={item.slug}
              href={`/work/${item.slug}`}
              className="card group flex flex-col"
            >
              <p className="label-mono mb-3">
                {item.year}
                {item.role ? ` · ${item.role}` : ''}
              </p>
              <h3 className="mb-2 text-xl font-semibold text-text transition-colors group-hover:text-accent-soft">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {item.summary}
              </p>
              {item.stack && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.stack.map((s) => (
                    <span key={s} className="pill">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
