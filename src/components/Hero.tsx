import { type ReactNode, type SVGProps, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const HERO_VIDEO_SRC = '/hero-sora-video.mp4'
const HERO_VIDEO_POSTER = '/hero-video-poster.svg'

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

export default function HeroSection() {
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

  const socialLinks = useMemo<SocialLink[]>(
    () => [
      { id: 'github', label: 'GitHub', href: 'https://github.com/abhaymanhas19' },
      { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/abhaymanhas19' },
      { id: 'blog', label: 'Blog', href: '/blogs', internal: true },
      { id: 'email', label: 'Email', href: 'mailto:abhayramgarhia19@outlook.com' },
    ],
    [],
  )

  return (
    <section id="home" className="relative isolate overflow-hidden bg-surface min-h-[calc(100vh-5rem)]">
      {/* Background: GIF/Video - right-aligned with zoom-in */}
      <div className="absolute inset-0">
        {!videoFailed && (
          <video
            className={`h-full w-full object-cover object-right transition-opacity duration-700 hero-gif-zoom ${videoReady ? 'opacity-40' : 'opacity-0'}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_VIDEO_POSTER}
            aria-hidden="true"
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoFailed(true)}
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        )}
        {/* Soft gradient overlays for readability */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[#f7f9fb] via-[#f7f9fb]/95 to-[#f7f9fb]/40"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#f7f9fb] via-transparent to-[#f7f9fb]/30"
        />
      </div>

      {/* Content - Left-aligned with asymmetric layout */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="tag-pill"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Available for Work
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.6, ease: 'easeOut' }}
            className="mt-8 space-y-5"
          >
            <p className="text-sm font-medium uppercase tracking-[0.34em] text-[#565e74]/60">Freelance Consultant</p>
            <h1 className="font-display text-display-lg font-semibold text-[#2a3439]">
              Abhay Manhas
            </h1>
            <h2 className="font-display text-headline-lg font-medium text-[#005bc4]">
              Python, AI &amp; Automation Engineer
            </h2>
            <p className="max-w-xl text-body-lg text-[#565e74]">
              I build intelligent software, automation systems, and AI-powered solutions for businesses and startups.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6, ease: 'easeOut' }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
          >
            <Link to="/#contact" className="btn-primary px-6 py-3.5 text-sm sm:text-base">
              Hire Me <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/#projects" className="btn-ghost px-6 py-3.5 text-sm sm:text-base">
              View Projects
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.6, ease: 'easeOut' }}
            className="mt-10"
          >
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-surface-container-lowest p-2" style={{ boxShadow: '0 32px 64px rgba(42, 52, 57, 0.06)' }}>
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

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.65, ease: 'easeOut' }}
            className="mt-12 max-w-xl rounded-card bg-surface-container-lowest p-6"
            style={{ boxShadow: '0 32px 64px rgba(42, 52, 57, 0.06)' }}
          >
            <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[#005bc4]">
              Trusted Focus
            </p>
            <p className="mt-3 text-sm leading-7 text-[#565e74]">
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
    'inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-[#565e74] transition hover:bg-surface-container-low hover:text-[#005bc4] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2'

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
