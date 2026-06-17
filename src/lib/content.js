import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const WORK_DIR = path.join(process.cwd(), 'src', 'content', 'work')
const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog')

function listMdx(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

function readMdx(dir, slug) {
  const filePath = path.join(dir, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(raw)
  return { slug, content, frontmatter: data }
}

function withMeta(slug, data) {
  return { slug, ...data }
}

export function getAllWorkSlugs() {
  return listMdx(WORK_DIR)
}

export function getAllWork() {
  return getAllWorkSlugs()
    .map((slug) => withMeta(slug, readMdx(WORK_DIR, slug).frontmatter))
    .sort((a, b) => {
      const da = new Date(a.date || 0).getTime()
      const db = new Date(b.date || 0).getTime()
      return db - da
    })
}

export function getWorkBySlug(slug) {
  return readMdx(WORK_DIR, slug)
}

export function getAllBlogSlugs() {
  return listMdx(BLOG_DIR)
}

export function getAllBlog() {
  return getAllBlogSlugs()
    .map((slug) => withMeta(slug, readMdx(BLOG_DIR, slug).frontmatter))
    .sort((a, b) => {
      const da = new Date(a.date || 0).getTime()
      const db = new Date(b.date || 0).getTime()
      return db - da
    })
}

export function getBlogBySlug(slug) {
  return readMdx(BLOG_DIR, slug)
}
