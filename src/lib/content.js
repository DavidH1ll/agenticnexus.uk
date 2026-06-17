import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const WORK_DIR = path.join(process.cwd(), 'src', 'content', 'work')

export function getAllWorkSlugs() {
  if (!fs.existsSync(WORK_DIR)) return []
  return fs
    .readdirSync(WORK_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getAllWork() {
  return getAllWorkSlugs()
    .map((slug) => {
      const filePath = path.join(WORK_DIR, `${slug}.mdx`)
      const raw = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(raw)
      return { slug, ...data }
    })
    .sort((a, b) => {
      const da = new Date(a.date || 0).getTime()
      const db = new Date(b.date || 0).getTime()
      return db - da
    })
}

export function getWorkBySlug(slug) {
  const filePath = path.join(WORK_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(raw)
  return { slug, content, frontmatter: data }
}
