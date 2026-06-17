import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllBlogSlugs, getBlogBySlug } from '@/lib/content'
import { components } from '@/components/MdxComponents'

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }) {
  const { frontmatter } = getBlogBySlug(params.slug)
  return {
    title: frontmatter.title,
    description: frontmatter.summary,
  }
}

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPost({ params }) {
  const { content, frontmatter } = getBlogBySlug(params.slug)
  if (!frontmatter) notFound()

  return (
    <article className="mx-auto max-w-page px-6 py-16 sm:px-8 sm:py-20">
      <Link
        href="/blog"
        className="label-mono inline-flex items-center gap-2 text-muted transition-colors hover:text-text"
      >
        <span aria-hidden>&larr;</span> All posts
      </Link>

      <header className="mt-8 max-w-prose">
        <p className="label-mono mb-4">{formatDate(frontmatter.date)}</p>
        <h1 className="text-display-lg font-semibold text-text">
          {frontmatter.title}
        </h1>
        {frontmatter.summary && (
          <p className="mt-5 text-xl leading-relaxed text-muted">
            {frontmatter.summary}
          </p>
        )}
      </header>

      <div className="prose-mdx mt-12 max-w-prose">
        <MDXRemote source={content} components={components} />
      </div>
    </article>
  )
}
