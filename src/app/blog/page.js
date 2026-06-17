import Link from 'next/link'
import { getAllBlog } from '@/lib/content'

export const metadata = {
  title: 'Blog',
  description:
    'Notes on agentic systems, security, the open web, and twenty years of building toward what comes next.',
}

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function Blog() {
  const posts = getAllBlog()

  return (
    <div className="mx-auto max-w-page px-6 py-16 sm:px-8 sm:py-20">
      <header className="mb-16 max-w-prose">
        <p className="label-mono mb-4">Blog</p>
        <h1 className="text-display-lg font-semibold text-text">
          Notes &amp; writing
        </h1>
        <p className="mt-4 text-lg text-muted">
          Long-form thinking on the work &mdash; agentic systems, security, the
          open web, and the slow process of becoming a builder.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet.</p>
      ) : (
        <ol className="space-y-10 border-l border-border pl-8">
          {posts.map((post) => (
            <li key={post.slug} className="relative">
              <span
                aria-hidden
                className="absolute -left-[34px] top-2 h-2.5 w-2.5 rounded-full border border-accent bg-obsidian"
              />
              <p className="label-mono mb-2">{formatDate(post.date)}</p>
              <h2 className="text-xl font-semibold text-text">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-colors hover:text-accent-soft"
                >
                  {post.title}
                </Link>
              </h2>
              {post.summary && (
                <p className="mt-2 max-w-prose text-[1.05rem] leading-relaxed text-muted">
                  {post.summary}
                </p>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
