import { getAllWorkSlugs, getAllBlogSlugs } from '@/lib/content'

const BASE = 'https://agenticnexus.uk'

const PUBLIC_ROUTES = [
  '',
  '/about',
  '/work',
  '/blog',
  '/credentials',
  '/contact',
]

const HIDDEN_ROUTES = ['/development']

export default function sitemap() {
  const now = new Date()
  const workRoutes = getAllWorkSlugs().map((slug) => `/work/${slug}`)
  const blogRoutes = getAllBlogSlugs().map((slug) => `/blog/${slug}`)

  return [...PUBLIC_ROUTES, ...workRoutes, ...blogRoutes].map((route) => ({
    url: `${BASE}${route}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
}

export const hiddenPaths = HIDDEN_ROUTES
