import { getAllWorkSlugs } from '@/lib/content'

const BASE = 'https://agenticnexus.uk'

export default function sitemap() {
  const now = new Date()
  const staticRoutes = ['', '/about', '/work', '/credentials', '/contact']
  const workRoutes = getAllWorkSlugs().map((slug) => `/work/${slug}`)

  return [...staticRoutes, ...workRoutes].map((route) => ({
    url: `${BASE}${route}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
}
