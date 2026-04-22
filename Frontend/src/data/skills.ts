import { content } from './content'

export type SkillDomain = (typeof content.skills.categories)[number]

export const skills = content.skills.categories
