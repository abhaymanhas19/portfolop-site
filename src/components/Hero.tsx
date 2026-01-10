import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Download,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  type LucideIcon,
} from 'lucide-react'
import { heroContent, socials } from '../data/content'
import SplitText from './SplitText'
import VantaRingsBackground from './VantaRingsBackground'

const ease = [0.18, 0.78, 0.24, 1] as const

const socialIcons: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Instagram,
  Twitter,
}

export default function HeroSection() {
  const subheadingLines = [heroContent.description, heroContent.detail, heroContent.aiSummary].filter(
    Boolean,
  )
  const [activeLine, setActiveLine] = useState(0)

  useEffect(() => {
    if (!subheadingLines.length) return
    if (activeLine >= subheadingLines.length) {
      setActiveLine(0)
    }
  }, [activeLine, subheadingLines.length])

  return (
    <section className="relative overflow-hidden bg-[#0f0324]">
      <VantaRingsBackground />
      <div className="relative z-10 flex min-h-screen w-full flex-col items-start justify-center gap-10 px-20 py-10">
        <div className="flex w-full flex-col items-start text-left">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6, ease }}
            className="tag-pill mb-6 border-emerald-200/40 bg-white/10 text-emerald-100"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {heroContent.eyebrow}
          </motion.span>

          {heroContent.trustBadge && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease }}
              className="mb-4 flex w-full justify-start"
            >
              <span className="tag-pill border-emerald-200/40 bg-white/10 text-emerald-100">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {heroContent.trustBadge}
              </span>
            </motion.div>
          )}

          <div className="flex w-full max-w-3xl flex-col items-start text-emerald-50">
            <SplitText
              text={heroContent.title}
              tag="h1"
              splitType="chars"
              delay={60}
              duration={0.55}
              ease="power3.out"
              from={{ opacity: 0, y: 28 }}
              to={{ opacity: 1, y: 0 }}
              className="w-full text-left text-5xl font-bold leading-tight md:text-6xl"
              textAlign="left"
              mutateSplit={split => {
                split.chars?.forEach(char => char.classList.add('inline-block'))
              }}
            />
            <SplitText
              text={heroContent.highlight}
              tag="span"
              splitType="chars"
              delay={60}
              duration={0.55}
              ease="power3.out"
              from={{ opacity: 0, y: 24 }}
              to={{ opacity: 1, y: 0 }}
              className="mt-2 block w-full text-left text-[1.12em] font-semibold tracking-tight [word-spacing:0.35em] md:text-[1.18em] md:[word-spacing:0.55em]"
              textAlign="left"
              mutateSplit={split => {
                split.chars?.forEach(char => char.classList.add('inline-block'))
              }}
            />
          </div>

          <div className="mt-5 min-h-[4.5rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeLine}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease }}
                className="max-w-2xl text-left text-lg font-medium text-emerald-100/80"
              >
                {subheadingLines[activeLine]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.6, ease }}
            className="mt-6 flex w-full max-w-[430px] flex-col items-start gap-4 sm:flex-row sm:justify-start"
          >
            <Link
              to={heroContent.primaryAction.to}
              className="btn-primary text-base"
            >
              {heroContent.primaryAction.label}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.74, duration: 0.6, ease }}
            className="mt-8 flex flex-col items-start gap-4"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.40em] text-emerald-200/70">
              Socials
            </span>
            <div className="flex items-center justify-start gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 shadow-[0_18px_42px_rgba(3,5,17,0.35)] backdrop-blur">
              {socials.map(handle => {
                const Icon = socialIcons[handle.icon] ?? GlobeIconFallback
                return (
                  <a
                    key={handle.id}
                    href={handle.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={handle.label}
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-emerald-100/90 transition-all hover:-translate-y-0.5 hover:border-emerald-200/60 hover:text-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/60 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0f0324]"
                  >
                    <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function GlobeIconFallback(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9Z" />
    </svg>
  )
}
