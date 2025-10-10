import { content } from './content'

export type BuildCapability = (typeof content.capabilities)[number]

export const buildCapabilities = content.capabilities
