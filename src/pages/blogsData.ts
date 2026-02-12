export type BlogPost = {
  slug: string
  title: string
  category: string
  summary: string
  publishedAt: string
  readTime: string
  image: string
  body: string[]
  skills: string[]
}

// Raw GitHub Gist serving the blogs JSON
export const BLOGS_DATA_URL = 'https://gist.githubusercontent.com/abhaymanhas19/640fe4a76bf5b81b39aa6c5e48f5104d/raw/sitesblogs.json'

export async function fetchBlogs(): Promise<BlogPost[]> {
  const response = await fetch(BLOGS_DATA_URL)

  if (!response.ok) {
    throw new Error('Unable to load blogs right now')
  }

  const data = (await response.json()) as BlogPost[]
  return data
}
