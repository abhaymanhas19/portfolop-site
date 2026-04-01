import { type ReactNode, type SVGProps, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import useReducedMotion from '../hooks/useReducedMotion'
import { ease, heroWord, staggerContainer } from '../lib/motion'

type SocialLink = {
  id: string
  label: string
  href: string
  internal?: boolean
}

const socialIcons: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
}

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <motion.span
      variants={staggerContainer(0.06)}
      initial="hidden"
      animate="show"
      transition={{ delayChildren: delay }}
      className="inline"
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={heroWord}
          className="mr-[0.3em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function HeroSection() {
  const reducedMotion = useReducedMotion()

  const socialLinks = useMemo<SocialLink[]>(
    () => [
      { id: 'github', label: 'GitHub', href: 'https://github.com/abhaymanhas19' },
      { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/abhaymanhas19' },
      { id: 'blog', label: 'Blog', href: '/blogs', internal: true },
      { id: 'email', label: 'Email', href: 'mailto:abhayramgarhia19@outlook.com' },
    ],
    [],
  )

  const motionProps = reducedMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : undefined

  return (
    <section id="home" className="relative isolate overflow-hidden min-h-[calc(100vh-5rem)]" style={{ perspective: '1200px' }}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="https://res.cloudinary.com/dol8jpqwr/video/upload/v1774984665/change_this_women_202604010025_fynplv.mp4"
      />

      {/* Dark overlay for text readability */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-black/40"
      />

      {/* Content - Left-aligned with asymmetric layout */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="max-w-2xl">
          {/* Status pill */}
          <motion.div
            {...(reducedMotion ? motionProps : {
              initial: { opacity: 0, y: 16, scale: 0.95 },
              animate: { opacity: 1, y: 0, scale: 1 },
            })}
            transition={{ duration: 0.55, ease: ease.smooth }}
            className="tag-pill"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 hero-pulse" />
            Available for Work
          </motion.div>

          {/* Main heading block */}
          <div className="mt-8 space-y-5">
            <motion.p
              {...(reducedMotion ? motionProps : {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
              })}
              transition={{ delay: 0.1, duration: 0.5, ease: ease.smooth }}
              className="text-sm font-medium uppercase tracking-[0.34em] text-white/70"
            >
              Freelance Consultant
            </motion.p>

            <h1 className="font-display text-display-lg font-semibold text-white">
              {reducedMotion ? (
                'Abhay Manhas'
              ) : (
                <WordReveal text="Abhay Manhas" delay={0.15} />
              )}
            </h1>

            <h2 className="font-display text-headline-lg font-medium text-blue-300">
              {reducedMotion ? (
                <>Python, AI &amp; Automation Engineer</>
              ) : (
                <WordReveal text="Python, AI & Automation Engineer" delay={0.35} />
              )}
            </h2>

            <motion.p
              {...(reducedMotion ? motionProps : {
                initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
                animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
              })}
              transition={{ delay: 0.6, duration: 0.6, ease: ease.smooth }}
              className="max-w-xl text-body-lg text-white/80"
            >
              I build intelligent software, automation systems, and AI-powered solutions for businesses and startups.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            {...(reducedMotion ? motionProps : {
              initial: { opacity: 0, y: 22 },
              animate: { opacity: 1, y: 0 },
            })}
            transition={{ delay: 0.72, duration: 0.6, ease: ease.smooth }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
          >
            <Link to="/#contact" className="btn-primary btn-glow px-6 py-3.5 text-sm sm:text-base">
              Hire Me <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/#projects" className="btn-ghost px-6 py-3.5 text-sm sm:text-base">
              View Projects
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div
            {...(reducedMotion ? motionProps : {
              initial: { opacity: 0, y: 22 },
              animate: { opacity: 1, y: 0 },
            })}
            transition={{ delay: 0.84, duration: 0.6, ease: ease.smooth }}
            className="mt-10"
          >
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-white/10 p-2 backdrop-blur-sm">
              {socialLinks.map(link => {
                const Icon = socialIcons[link.id] ?? GlobeIconFallback
                return (
                  <SocialLinkButton key={link.id} href={link.href} label={link.label} internal={link.internal}>
                    <Icon className="h-4 w-4" />
                  </SocialLinkButton>
                )
              })}
            </div>
          </motion.div>

          {/* Trust badge */}
          <motion.div
            {...(reducedMotion ? motionProps : {
              initial: { opacity: 0, y: 24, rotateX: 4 },
              animate: { opacity: 1, y: 0, rotateX: 0 },
            })}
            transition={{ delay: 0.95, duration: 0.65, ease: ease.smooth }}
            className="mt-12 max-w-xl rounded-card bg-white/10 p-6 backdrop-blur-sm"
          >
            <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-blue-300">
              Trusted Focus
            </p>
            <p className="mt-3 text-sm leading-7 text-white/80">
              Intelligent systems for teams that need dependable automation, practical AI integration, and delivery that feels senior from day one.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

type SocialLinkButtonProps = {
  children: ReactNode
  href: string
  label: string
  internal?: boolean
}

function SocialLinkButton({ children, href, label, internal }: SocialLinkButtonProps) {
  const className =
    'inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/20 hover:text-white hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2'

  if (internal) {
    return (
      <Link to={href} className={className}>
        {children}
        {label}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className={className}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
    >
      {children}
      {label}
    </a>
  )
}

function GlobeIconFallback(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9Z" />
    </svg>
  )
}
