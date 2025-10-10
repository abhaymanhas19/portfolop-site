import { content } from './content'

export type FocusArea = {
  title: string
  description: string
}

export type ExperienceItem = {
  role: string
  company: string
  period: string
  summary: string
  achievements: string[]
}

export type ValueStatement = {
  title: string
  description: string
}

export type Certification = {
  title: string
  issuer: string
  year: string
  description: string
  tags?: string[]
  credentialUrl?: string[]
}

export type ProfileContent = {
  about: {
    headline: string
    intro: string
    focusAreas: FocusArea[]
    experience: ExperienceItem[]
    values: ValueStatement[]
  }
  certifications: Certification[]
}

export const profile: ProfileContent = {
  about: {
    headline: content.about.headline,
    intro: content.about.intro,
    focusAreas: content.about.tiles.map(tile => ({
      title: tile.title,
      description: tile.description,
    })),
    experience: content.about.experience.map(item => ({
      role: item.role,
      company: item.company,
      period: item.period,
      summary: item.summary,
      achievements: item.achievements,
    })),
    values: content.about.values.map(value => ({
      title: value.title,
      description: value.description,
    })),
  },
  certifications: content.achievements.certifications.map(cert => ({
    title: cert.title,
    issuer: cert.issuer,
    year: cert.year,
    description: cert.summary,
    credentialUrl: cert.credentialUrl ? [cert.credentialUrl] : undefined,
    tags: [cert.category],
  })),
}
