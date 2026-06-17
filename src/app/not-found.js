import Link from 'next/link'

export const metadata = {
  title: 'Not found',
}

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-page flex-col items-start justify-center px-6 sm:px-8">
      <p className="label-mono mb-4">404</p>
      <h1 className="text-display-lg font-semibold text-text">
        Nothing here.
      </h1>
      <p className="mt-4 max-w-prose text-lg text-muted">
        The page you were looking for has moved or never existed. Try the
        navigation, or head back home.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent-soft"
      >
        <span aria-hidden>&larr;</span> Back home
      </Link>
    </div>
  )
}
