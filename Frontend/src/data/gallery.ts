import { content } from './content'

export type GalleryImage = (typeof content.gallery.images)[number]
export type GalleryProfile = typeof content.gallery.profile

export const galleryProfile = content.gallery.profile
export const galleryImages = content.gallery.images
