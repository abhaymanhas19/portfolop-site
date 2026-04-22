import type { Variants, Transition } from 'framer-motion'

// Premium easing curves
export const ease = {
  smooth: [0.22, 1, 0.36, 1] as const,
  smoothOut: [0, 0.55, 0.45, 1] as const,
  decelerate: [0.0, 0.0, 0.2, 1] as const,
}

// Standard durations
export const duration = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  entrance: 0.7,
}

// Stagger container factory
export const staggerContainer = (staggerDelay = 0.1): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: staggerDelay },
  },
})

// Scroll-reveal: fade up with subtle depth
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: ease.smooth } as Transition,
  },
}

// Scroll-reveal: fade up with 3D rotateX tilt
export const revealDepth: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 6, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.8, ease: ease.smooth } as Transition,
  },
}

// Hero word-by-word entrance
export const heroWord: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: ease.smooth } as Transition,
  },
}

// Card stagger container
export const cardContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      ease: ease.smooth,
    },
  },
}

// Card reveal with depth
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: ease.smooth } as Transition,
  },
}
