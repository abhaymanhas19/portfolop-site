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

const DROPBOX_APP_KEY =
  (import.meta.env.VITE_DROPBOX_APP_KEY as string | undefined) ??
  (import.meta.env.DROPBOX_APP_KEY as string | undefined)

const DROPBOX_APP_SECRET =
  (import.meta.env.VITE_DROPBOX_APP_SECRET as string | undefined) ??
  (import.meta.env.DROPBOX_APP_SECRET as string | undefined)

const DROPBOX_REFRESH_TOKEN =
  (import.meta.env.VITE_DROPBOX_REFRESH_TOKEN as string | undefined) ??
  (import.meta.env.DROPBOX_REFRESH_TOKEN as string | undefined)

const DROPBOX_ACCESS_TOKEN =
  (import.meta.env.VITE_DROPBOX_ACCESS_TOKEN as string | undefined) ??
  (import.meta.env.DROPBOX_ACCESS_TOKEN as string | undefined)

let cachedDropboxToken: string | null = null

async function getDropboxAccessToken(): Promise<string> {
  if (DROPBOX_ACCESS_TOKEN) return DROPBOX_ACCESS_TOKEN
  if (cachedDropboxToken) return cachedDropboxToken

  if (!DROPBOX_APP_KEY || !DROPBOX_APP_SECRET || !DROPBOX_REFRESH_TOKEN) {
    throw new Error('Missing Dropbox credentials')
  }

  const tokenResponse = await fetch('https://api.dropboxapi.com/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${DROPBOX_APP_KEY}:${DROPBOX_APP_SECRET}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: DROPBOX_REFRESH_TOKEN
    }).toString(),
    mode: 'cors'
  })

  if (!tokenResponse.ok) {
    throw new Error(`Unable to refresh Dropbox token (${tokenResponse.status})`)
  }

  const tokenJson = (await tokenResponse.json()) as { access_token?: string }
  if (!tokenJson.access_token) {
    throw new Error('Dropbox did not return an access token')
  }

  cachedDropboxToken = tokenJson.access_token
  return cachedDropboxToken
}

async function fetchDropboxMarkdown(path: string): Promise<string> {
  const accessToken = await getDropboxAccessToken()
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  const response = await fetch('https://content.dropboxapi.com/2/files/download', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Dropbox-API-Arg': JSON.stringify({ path: normalizedPath })
    },
    mode: 'cors'
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch markdown from Dropbox (${response.status})`)
  }

  return await response.text()
}

async function fetchDirectMarkdown(url: string): Promise<string> {
  const response = await fetch(url, { mode: 'cors' })

  if (!response.ok) {
    throw new Error(`Failed to fetch markdown from ${url} (${response.status})`)
  }

  return await response.text()
}

async function resolveBodyContent(body: string | string[]): Promise<string> {
  const filename = Array.isArray(body) ? body.find(Boolean) ?? '' : body
  const trimmed = filename.trim()

  if (!trimmed) {
    return 'Sorry, the blog content could not be loaded right now.'
  }

  try {
    // If the body already contains a full URL (e.g. a Dropbox shared link), fetch directly.
    if (/^https?:\/\//i.test(trimmed)) {
      return await fetchDirectMarkdown(trimmed)
    }

    return await fetchDropboxMarkdown(trimmed)
  } catch (error) {
    console.error('Unable to load blog markdown from Dropbox', trimmed, error)
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
