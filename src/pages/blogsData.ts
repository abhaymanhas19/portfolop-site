export type BlogPost = {
  slug: string
  title: string
  category: string
  summary: string
  publishedAt: string
  readTime: string
  image: string
  images?: string[]
  body: string
  skills: string[]
}

type RawBlogPost = Omit<BlogPost, 'body' | 'images' | 'image'> & {
  image: string | string[]
  body: string | string[]
  images?: string[]
}

// Raw GitHub Gist serving the blogs JSON
export const BLOGS_DATA_URL = 'https://gist.githubusercontent.com/abhaymanhas19/640fe4a76bf5b81b39aa6c5e48f5104d/raw/sitesblogs.json'

// Base URL + token come from env (Vite requires VITE_ prefix for exposure).
const BASE_URL_FOR_BLOGS =
  (import.meta.env.VITE_BASE_URL_FOR_BLOGS as string | undefined) ??
  (import.meta.env.BASE_URL_FOR_BLOGS as string | undefined) ??
  ''

const GITHUB_TOKEN =
  (import.meta.env.VITE_GITHUB_TOKEN as string | undefined) ??
  (import.meta.env.GITHUB_TOKEN as string | undefined)

async function resolveBodyContent(body: string | string[]): Promise<string> {
  const filename = Array.isArray(body) ? body.find(Boolean) ?? '' : body
  const trimmed = filename.trim()

  // If the body already contains a full URL, respect it as-is.
  const markdownUrl = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : (() => {
        const trimmedBase = BASE_URL_FOR_BLOGS.replace(/\/+$/, '')
        const trimmedFile = trimmed.replace(/^\/+/, '')

        if (!trimmedBase || !trimmedFile) {
          console.error('Missing base URL or filename for blog content', {
            trimmedBase,
            trimmedFile
          })
          return ''
        }

        return `${trimmedBase}/${trimmedFile}`
      })()

  try {
    const response = await fetch(markdownUrl, {
      headers: {
        ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
        // GitHub requires this for some raw endpoints to allow CORS
        Accept: 'application/vnd.github.raw'
      },
      // Explicitly enable CORS in case defaults differ per environment
      mode: 'cors'
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch markdown: ${response.status}`)
    }

    return await response.text()
  } catch (error) {
    console.error('Unable to load blog markdown from', markdownUrl, error)
    return 'Sorry, the blog content could not be loaded right now.'
  }
}

export async function fetchBlogs(): Promise<BlogPost[]> {
  const response = await fetch(BLOGS_DATA_URL)

  if (!response.ok) {
    throw new Error('Unable to load blogs right now')
  }

  const data = (await response.json()) as RawBlogPost[]

  const normalized: BlogPost[] = await Promise.all(data.map(async post => {
    const rawImages = Array.isArray(post.image) ? post.image : post.images
    const images = (rawImages && rawImages.length > 0)
      ? rawImages
      : post.image
        ? [post.image as string]
        : []

    const body = await resolveBodyContent(post.body)

    return {
      ...post,
      body,
      image: Array.isArray(post.image) ? (post.image[0] ?? '') : (post.image ?? images[0] ?? ''),
      images,
    }
  }))

  return normalized
}
