import { devProjects } from '@/lib/dev'

export const metadata = {
  title: 'Development',
  description: 'Experimental projects and unfinished work — not on the main site.',
  robots: { index: false, follow: false },
}

export default function Development() {
  return (
    <div className="mx-auto max-w-page px-6 py-16 sm:px-8 sm:py-20">
      <header className="mb-16">
        <p className="label-mono mb-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
          Experimental &middot; unlisted
        </p>
        <h1 className="text-display-lg font-semibold text-text">Dev area</h1>
        <p className="mt-4 max-w-prose text-lg text-muted">
          A working scratchpad for unfinished things &mdash; prototypes, half-baked
          ideas, learning projects. Not linked from the main site. Bookmark the
          URL if you want to find it again.
        </p>
      </header>

      {devProjects.length === 0 ? (
        <p className="text-muted">Nothing in progress right now.</p>
      ) : (
        <ol className="space-y-10 border-l border-border pl-8">
          {devProjects.map((p) => (
            <li key={p.slug} className="relative">
              <span
                aria-hidden
                className="absolute -left-[34px] top-2 h-2.5 w-2.5 rounded-full border border-amber bg-obsidian"
              />
              <p className="label-mono mb-2">{p.status}</p>
              <h2 className="text-lg font-semibold text-text">{p.title}</h2>
              <p className="mt-2 max-w-prose text-[1.05rem] leading-relaxed text-muted">
                {p.description}
              </p>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-soft"
                >
                  Open &rarr;
                </a>
              )}
            </li>
          ))}
        </ol>
      )}

      <section className="mt-20 border-t border-border/60 pt-8">
        <p className="label-mono mb-3">Adding projects</p>
        <p className="max-w-prose text-sm leading-relaxed text-muted">
          Add new entries in{' '}
          <code className="rounded bg-slate-soft px-1.5 py-0.5 font-mono text-text">
            src/lib/dev.js
          </code>{' '}
          and push to <code className="rounded bg-slate-soft px-1.5 py-0.5 font-mono text-text">main</code>.
          The page rebuilds on the next Cloudflare deploy.
        </p>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">
          To embed a Godot HTML5 export (or any static asset), copy the build files
          into{' '}
          <code className="rounded bg-slate-soft px-1.5 py-0.5 font-mono text-text">
            public/&lt;project-slug&gt;/
          </code>{' '}
          and set the <code className="rounded bg-slate-soft px-1.5 py-0.5 font-mono text-text">link</code>{' '}
          field in the data file to{' '}
          <code className="rounded bg-slate-soft px-1.5 py-0.5 font-mono text-text">
            /&lt;project-slug&gt;/
          </code>
          .
        </p>
      </section>
    </div>
  )
}
