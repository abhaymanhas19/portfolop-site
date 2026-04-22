import { useEffect, useState } from 'react'
import { BlogPost, BLOGS_DATA_URL, fetchBlogs } from '../pages/blogsData'

type UseBlogsResult = {
  blogs: BlogPost[]
  loading: boolean
  error?: string
}

export function useBlogs(): UseBlogsResult {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    let active = true

    async function load() {
      try {
        setLoading(true)
        const data = await fetchBlogs()
        if (!active) return
        setBlogs(data)
        setError(undefined)
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : 'Failed to load blogs')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [])

  return { blogs, loading, error }
}

export { BLOGS_DATA_URL }
