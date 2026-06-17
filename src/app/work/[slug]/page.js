import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getAllWorkSlugs, getWorkBySlug } from '@/lib/content'
import { components } from '@/components/MdxComponents'

export function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }) {
  const { frontmatter } = getWorkBySlug(params.slug)
  return {
    title: frontmatter.title,
    description: frontmatter.summary,
  }
}

export default function CaseStudy({ params }) {
  const { content, frontmatter } = getWorkBySlug(params.slug)
  if (!frontmatter) notFound()

  return (
    <article className="mx-auto max-w-page px-6 py-16 sm:px-8 sm:py-20">
      <Link
        href="/work"
        className="label-mono inline-flex items-center gap-2 text-muted transition-colors hover:text-text"
      >
        <span aria-hidden>&larr;</span> All work
      </Link>

      <header className="mt-8 max-w-prose">
        <p className="label-mono mb-4">
          {frontmatter.year}
          {frontmatter.role ? ` · ${frontmatter.role}` : ''}
        </p>
        <h1 className="text-display-lg font-semibold text-text">
          {frontmatter.title}
        </h1>
        {frontmatter.summary && (
          <p className="mt-5 text-xl leading-relaxed text-muted">
            {frontmatter.summary}
          </p>
        )}
        {frontmatter.stack && (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {frontmatter.stack.map((s) => (
              <span key={s} className="pill">
                {s}
              </span>
            ))}
          </div>
        )}
        {frontmatter.link && (
          <a
            href={frontmatter.link}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-soft"
          >
            View on GitHub &rarr;
          </a>
        )}
      </header>

      <div className="prose-mdx mt-12 max-w-prose">
        <MDXRemote
          source={content}
          components={components}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  )
}
