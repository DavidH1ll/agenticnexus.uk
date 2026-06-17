import { getAllWorkSlugs, getAllBlogSlugs } from '@/lib/content'

const BASE = 'https://agenticnexus.uk'

export default function sitemap() {
  const now = new Date()
  const staticRoutes = [
    '',
    '/about',
    '/work',
    '/blog',
    '/credentials',
    '/contact',
  ]
  const workRoutes = getAllWorkSlugs().map((slug) => `/work/${slug}`)
  const blogRoutes = getAllBlogSlugs().map((slug) => `/blog/${slug}`)

  return [...staticRoutes, ...workRoutes, ...blogRoutes].map((route) => ({
    url: `${BASE}${route}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
}
