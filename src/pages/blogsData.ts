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
let cachedDropboxTokenExpiresAt: number | null = null

function hasDropboxRefreshFlow(): boolean {
  return Boolean(DROPBOX_APP_KEY && DROPBOX_APP_SECRET && DROPBOX_REFRESH_TOKEN)
}

function isCachedDropboxTokenValid(): boolean {
  if (!cachedDropboxToken || !cachedDropboxTokenExpiresAt) return false
  // Refresh a bit early to avoid edge-of-expiry failures.
  return Date.now() < cachedDropboxTokenExpiresAt - 30_000
}

async function getDropboxAccessToken(options?: { forceRefresh?: boolean }): Promise<string> {
  const forceRefresh = options?.forceRefresh ?? false

  if (!forceRefresh && isCachedDropboxTokenValid()) return cachedDropboxToken as string
  // If an access token is configured (Option A), try it first; on expiry callers can force-refresh.
  if (!forceRefresh && DROPBOX_ACCESS_TOKEN) return DROPBOX_ACCESS_TOKEN

  if (!hasDropboxRefreshFlow()) {
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

  const tokenJson = (await tokenResponse.json()) as { access_token?: string; expires_in?: number }
  if (!tokenJson.access_token) {
    throw new Error('Dropbox did not return an access token')
  }

  const expiresInSeconds =
    typeof tokenJson.expires_in === 'number' && tokenJson.expires_in > 0
      ? tokenJson.expires_in
      : 60 * 60

  cachedDropboxToken = tokenJson.access_token
  cachedDropboxTokenExpiresAt = Date.now() + expiresInSeconds * 1000
  return cachedDropboxToken
}

async function fetchDropboxMarkdown(path: string): Promise<string> {
  let accessToken = await getDropboxAccessToken()
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  const makeRequest = async (token: string) =>
    await fetch('https://content.dropboxapi.com/2/files/download', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Dropbox-API-Arg': JSON.stringify({ path: normalizedPath })
      },
      mode: 'cors'
    })

  let response = await makeRequest(accessToken)
  if (response.status === 401 && hasDropboxRefreshFlow()) {
    // Token might be expired/revoked; refresh and retry once.
    cachedDropboxToken = null
    cachedDropboxTokenExpiresAt = null
    accessToken = await getDropboxAccessToken({ forceRefresh: true })
    response = await makeRequest(accessToken)
  }

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
