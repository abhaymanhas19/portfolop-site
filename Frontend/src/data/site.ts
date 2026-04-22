import { content } from './content'

export type SocialLink = (typeof content.socials)[number]

export type SiteInfo = {
  NAME: string
  ROLE: string
  TAGLINE: string
  LOCATION: string
  CONTACT_EMAIL: string
  RESUME_PDF_PATH: string
  SOCIAL: SocialLink[]
}

export const site: SiteInfo = {
  NAME: content.branding.name,
  ROLE: content.branding.role,
  TAGLINE: content.branding.tagline,
  LOCATION: content.branding.location,
  CONTACT_EMAIL: import.meta.env.VITE_CONTACT_EMAIL || content.branding.contactEmail,
  RESUME_PDF_PATH: content.branding.resumePath,
  SOCIAL: content.socials,
}
