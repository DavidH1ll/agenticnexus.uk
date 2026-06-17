import Link from 'next/link'
import { profile } from '@/lib/data'
import { getAllWork, getAllBlog } from '@/lib/content'

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function Home() {
  const work = getAllWork().slice(0, 3)
  const posts = getAllBlog().slice(0, 2)

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="grid-bg grid-bg-mask pointer-events-none absolute inset-0 -z-10"
        />
        <div className="mx-auto max-w-page px-6 pb-24 pt-20 sm:px-8 sm:pt-28 lg:pt-36">
          <p className="label-mono mb-8">Ayr, Scotland</p>
          <h1 className="max-w-4xl text-display-xl font-semibold text-text">
            {profile.name}.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted sm:text-2xl">
            {profile.tagline}
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/5 px-5 py-3 text-sm font-medium text-text transition-colors hover:border-accent hover:bg-accent/10"
            >
              See my work
              <span aria-hidden>&rarr;</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium text-muted transition-colors hover:text-text"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-page px-6 py-16 sm:px-8 sm:py-20">
          <div className="flex items-end justify-between gap-6 pb-10">
            <h2 className="text-display-md font-semibold text-text">
              Selected work
            </h2>
            <Link
              href="/work"
              className="hidden text-sm text-muted transition-colors hover:text-text sm:inline"
            >
              All work &rarr;
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                <h3 className="mb-2 text-lg font-semibold text-text transition-colors group-hover:text-accent-soft">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {item.summary}
                </p>
                {item.stack && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.stack.slice(0, 3).map((s) => (
                      <span key={s} className="pill">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="border-t border-border/60">
          <div className="mx-auto max-w-page px-6 py-16 sm:px-8 sm:py-20">
            <div className="flex items-end justify-between gap-6 pb-10">
              <h2 className="text-display-md font-semibold text-text">
                From the blog
              </h2>
              <Link
                href="/blog"
                className="hidden text-sm text-muted transition-colors hover:text-text sm:inline"
              >
                All posts &rarr;
              </Link>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="card group flex flex-col"
                  >
                    <p className="label-mono mb-3">{formatDate(post.date)}</p>
                    <h3 className="mb-2 text-lg font-semibold text-text transition-colors group-hover:text-accent-soft">
                      {post.title}
                    </h3>
                    {post.summary && (
                      <p className="text-sm leading-relaxed text-muted">
                        {post.summary}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
