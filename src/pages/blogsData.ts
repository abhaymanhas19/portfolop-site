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

type RawBlogPost = Omit<BlogPost, 'body' | 'images'> & {
  body: string | string[]
  images?: string[]
}

// Raw GitHub Gist serving the blogs JSON
export const BLOGS_DATA_URL = 'https://gist.githubusercontent.com/abhaymanhas19/640fe4a76bf5b81b39aa6c5e48f5104d/raw/sitesblogs.json'

export async function fetchBlogs(): Promise<BlogPost[]> {
  const response = await fetch(BLOGS_DATA_URL)

  if (!response.ok) {
    throw new Error('Unable to load blogs right now')
  }

  const data = (await response.json()) as RawBlogPost[]

  const normalized: BlogPost[] = data.map(post => {
    const images = (post.images && post.images.length > 0)
      ? post.images
      : post.image
        ? [post.image]
        : []

    return {
      ...post,
      body: Array.isArray(post.body) ? post.body.join('\n\n') : post.body,
      image: post.image ?? images[0] ?? '',
      images,
    }
  })

  return normalized
}
