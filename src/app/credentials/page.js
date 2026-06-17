import { credentials } from '@/lib/data'

export const metadata = {
  title: 'Training & Credentials',
  description:
    'Training, certifications, and the wins behind twenty years in IT infrastructure and security.',
}

export default function Credentials() {
  return (
    <div className="mx-auto max-w-page px-6 py-16 sm:px-8 sm:py-20">
      <header className="mb-16">
        <p className="label-mono mb-4">Credentials</p>
        <h1 className="text-display-lg font-semibold text-text">
          Training &amp; credentials
        </h1>
        <p className="mt-4 max-w-prose text-lg text-muted">
          The training behind the work, and the work that produced the wins.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="mb-6 text-display-md font-semibold text-text">
          Training
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {credentials.training.map((t) => (
            <li key={t.name} className="card">
              <h3 className="text-base font-semibold text-text">{t.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-6 text-display-md font-semibold text-text">
          Selected wins
        </h2>
        <ul className="space-y-3">
          {credentials.wins.map((w) => (
            <li
              key={w.name}
              className="flex flex-col gap-1 border-l-2 border-accent/50 bg-slate-soft/40 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <p className="text-base font-medium text-text">{w.name}</p>
              <p className="text-sm text-muted">{w.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
