import Image from 'next/image'
import { profile, themes, skills } from '@/lib/data'

export const metadata = {
  title: 'About',
  description:
    'IT Technician at Active Office, Ayr. Twenty years in infrastructure and security; current focus on agentic systems and open-source tools.',
}

export default function About() {
  return (
    <div className="mx-auto max-w-page px-6 py-16 sm:px-8 sm:py-20">
      <header className="mb-12">
        <p className="label-mono mb-4">About</p>
        <h1 className="text-display-lg font-semibold text-text">
          {profile.name}
        </h1>
        <p className="mt-3 text-lg text-muted">
          IT Technician at Active Office, Kilmarnock. Ayr, Scotland.
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1fr_240px]">
        <div className="max-w-prose">
          <div className="prose-mdx">
            <p>
              I&apos;m an IT professional with twenty years of experience across
              infrastructure, networking, and security. Most of that time has
              been spent keeping enterprise systems running &mdash; Microsoft
              365 estates, Cisco networks, ISMS audit programmes, and the kind
              of day-to-day service delivery that makes a workplace function.
            </p>
            <p>
              The work I&apos;ve been doing more recently is different in tone,
              if not in substance. I completed 100 days of Python projects,
              built tooling inside Neovim, and shipped a Pygame game with the
              kind of polish that small projects reward. The throughline is the
              same: I want to understand the systems I work with end to end, and
              I&apos;d rather build the thing than just buy it.
            </p>
            <p>
              Right now that&apos;s pointing me toward agentic systems and the
              infrastructure they run on. I&apos;m working through Google
              Gemini, learning Rust, and documenting the journey publicly. This
              site is part of that &mdash; a quiet corner of the open web where
              the work and the thinking can live side by side.
            </p>
          </div>

          <h2 className="mt-16 text-display-md font-semibold text-text">
            What I work on
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {themes.map((t) => (
              <div key={t.title} className="card">
                <h3 className="text-base font-semibold text-text">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-md border border-border bg-slate-soft">
            <Image
              src="/avatars/david.jpg"
              alt="David Hill"
              width={480}
              height={480}
              className="h-auto w-full"
              priority
            />
          </div>
          <blockquote className="border-l-2 border-accent/60 pl-4">
            <p className="text-sm italic leading-relaxed text-text/90">
              &ldquo;The expert in anything was once a beginner.&rdquo;
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              &mdash; Helen Hayes
            </p>
          </blockquote>
          <div>
            <p className="label-mono mb-3">Currently</p>
            <ul className="space-y-1.5 text-sm text-muted">
              <li>&middot; Learning Rust</li>
              <li>&middot; Building agentic workflows</li>
              <li>&middot; Writing on the open web</li>
            </ul>
          </div>
        </aside>
      </div>

      <section className="mt-20">
        <h2 className="text-display-md font-semibold text-text">Skills</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group}>
              <p className="label-mono mb-3">{group}</p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <span key={s} className="pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
