import { useCallback, useEffect, useState } from 'react'
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

const ease = [0.18, 0.78, 0.24, 1] as const

const socialIcons: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Instagram,
  Twitter,
}

const tilePositions = [
  'top-28 left-[8%]',
  'top-20 right-[8%]',
  'bottom-14 left-[4%]',
  'bottom-16 right-[12%]',
]

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

  useEffect(() => {
    if (subheadingLines.length <= 1) return () => {}

    const cycle = setInterval(() => {
      setActiveLine(prev => (prev + 1) % subheadingLines.length)
    }, 5000)

    return () => clearInterval(cycle)
  }, [subheadingLines.length])

  return (
    <section className="relative overflow-hidden bg-white">
      <motion.img
        src={heroContent.backgroundImage}
        alt=""
        aria-hidden
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/92 via-white/75 to-white/60 backdrop-blur-[2px]"
      />
      <motion.div
        aria-hidden
        className="hero-aurora"
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div aria-hidden className="grid-floor" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-16 px-6 py-24 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex w-full flex-1 flex-col items-center text-center lg:max-w-[55%] lg:items-start lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6, ease }}
            className="tag-pill mb-6"
          >
            {heroContent.eyebrow}
          </motion.span>

          <div className="w-full max-w-3xl">
            <SplitText
              text={heroContent.title}
              tag="h1"
              splitType="chars"
              delay={60}
              duration={0.55}
              ease="power3.out"
              from={{ opacity: 0, y: 28 }}
              to={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold leading-tight text-slate-900 md:text-6xl"
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
              className="mt-2 block text-[1.12em] font-semibold tracking-tight text-slate-700 md:text-[1.18em]"
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
                className="max-w-2xl text-lg font-medium text-slate-600"
              >
                {subheadingLines[activeLine]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.6, ease }}
            className="mt-6 flex w-full max-w-[430px] flex-col items-center gap-4 self-center sm:flex-row sm:justify-between lg:self-start"
          >
            <Link
              to={heroContent.primaryAction.to}
              className="btn-primary text-base"
            >
              {heroContent.primaryAction.label}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              to={heroContent.secondaryAction.to}
              className="btn-secondary-invert text-base"
            >
              <Download className="h-5 w-5" />
              {heroContent.secondaryAction.label}
            </Link>
          </motion.div>

          {heroContent.trustBadge && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.68, duration: 0.6, ease }}
              className="mt-2 flex w-full justify-center lg:justify-start"
            >
              <span className="tag-pill">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {heroContent.trustBadge}
              </span>
            </motion.div>
          )}

        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.7, ease }}
          className="relative w-full max-w-[325px] lg:self-stretch"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
            <div className="relative mx-auto w-full">
              <img
                src={heroContent.portraitIllustration}
                alt="Abhay building with a laptop"
                className="w-full"
                loading="lazy"
              />
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600 shadow-sm">
              <p>
                “Our systems need to feel seamless for operators. I obsess over latency budgets, healthy
                pipelines, and guardrails that make AI trustworthy.”
              </p>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-10 -bottom-10 h-24 rounded-full bg-slate-100 blur-3xl" aria-hidden />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.82, duration: 0.6, ease }}
            className="relative z-20 mt-10 flex justify-center"
          >
            <div className="flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-[0_18px_42px_rgba(15,23,42,0.14)]">
              {socials.map(handle => {
                const Icon = socialIcons[handle.icon] ?? GlobeIconFallback
                return (
                  <a
                    key={handle.id}
                    href={handle.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={handle.label}
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60 focus-visible:ring-offset-1 focus-visible:ring-offset-white"
                  >
                    <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {heroContent.codeTiles.map((tile, index) => (
        <motion.div
          key={tile.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: tile.delay, duration: 0.7, ease: 'easeOut' }}
          className={`pointer-events-none absolute hidden w-64 opacity-60 xl:block ${tilePositions[index % tilePositions.length]}`}
        >
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 6 + tile.delay, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_25px_70px_rgba(15,23,42,0.12)]"
          >
            <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                <span className="h-2 w-2 rounded-full bg-amber-300/80" />
                <span className="h-2 w-2 rounded-full bg-rose-300/80" />
              </div>
              <span>{tile.title}</span>
            </div>
            <pre className="whitespace-pre-wrap text-[13px] leading-relaxed text-slate-700">
              <code>{tile.code}</code>
            </pre>
          </motion.div>
        </motion.div>
      ))}
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
