import { content } from './content'

export type Project = (typeof content.projects.featured)[number]

export const projects = content.projects.featured
