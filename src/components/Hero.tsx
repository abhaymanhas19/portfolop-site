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
    <section id="home" className="relative isolate overflow-hidden bg-[#040b16] text-white">
      <div className="absolute inset-0">
        {!videoFailed && (
          <video
            className={`h-full w-full object-cover transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
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
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_28%),linear-gradient(115deg,rgba(2,6,23,0.94)_15%,rgba(2,6,23,0.82)_48%,rgba(2,6,23,0.64)_72%,rgba(2,6,23,0.9)_100%)]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#040b16] via-transparent to-[#040b16]/30" />
        <div aria-hidden className="absolute inset-y-0 left-0 w-full max-w-3xl bg-gradient-to-r from-[#040b16]/92 via-[#040b16]/62 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8.5rem)] max-w-7xl items-center px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/26 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-100 shadow-[0_18px_45px_rgba(16,185,129,0.15)] backdrop-blur"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            Available for Work
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.6, ease: 'easeOut' }}
            className="mt-8 space-y-5"
          >
            <p className="text-sm font-medium uppercase tracking-[0.34em] text-white/52">Freelance Consultant</p>
            <h1 className="text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Abhay Manhas
            </h1>
            <h2 className="max-w-2xl text-2xl font-medium tracking-[-0.03em] text-white/90 sm:text-3xl lg:text-4xl">
              Python, AI &amp; Automation Engineer
            </h2>
            <p className="max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              I build intelligent software, automation systems, and AI-powered solutions for businesses and startups.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6, ease: 'easeOut' }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
          >
            <Link to="/#contact" className="btn-primary-dark px-6 py-3.5 text-sm sm:text-base">
              Hire Me <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/#projects" className="btn-secondary-dark px-6 py-3.5 text-sm sm:text-base">
              View Projects
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.6, ease: 'easeOut' }}
            className="mt-10"
          >
            <div className="inline-flex flex-wrap items-center gap-2 rounded-[28px] border border-white/12 bg-white/8 p-2 shadow-[0_20px_60px_rgba(2,8,23,0.28)] backdrop-blur-xl">
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
            className="mt-12 max-w-xl rounded-[30px] border border-white/10 bg-white/7 p-5 shadow-[0_24px_80px_rgba(2,8,23,0.3)] backdrop-blur-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/76">
              Trusted Focus
            </p>
            <p className="mt-3 text-sm leading-7 text-white/72 sm:text-[15px]">
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
    'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-3 text-sm font-medium text-white/82 transition hover:border-cyan-300/45 hover:bg-white/12 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040b16]'

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
