import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Download,
  Github,
  Instagram,
  Linkedin,
  Sparkles,
  Twitter,
  type LucideIcon,
} from 'lucide-react'
import { heroContent, socials } from '../data/content'

const ease = [0.18, 0.78, 0.24, 1] as const

const socialIcons: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Instagram,
  Twitter,
}

const tilePositions = [
  'top-24 left-[6%]',
  'top-24 right-[6%]',
  'bottom-20 left-[8%]',
  'bottom-20 right-[6%]',
]

export default function HeroSection() {
  const subheadingLines = [heroContent.description, heroContent.detail, heroContent.aiSummary]
  const [activeLine, setActiveLine] = useState(0)

  useEffect(() => {
    if (subheadingLines.length <= 1) return () => {}

    const cycle = setInterval(() => {
      setActiveLine(prev => (prev + 1) % subheadingLines.length)
    }, 5000)

    return () => clearInterval(cycle)
  }, [subheadingLines.length])

  return (
    <section className="relative isolate overflow-hidden">
      <motion.img
        src={heroContent.backgroundImage}
        alt=""
        aria-hidden
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <motion.div
        aria-hidden
        className="hero-aurora"
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div aria-hidden className="grid-floor" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-16 px-6 py-24 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex w-full flex-1 flex-col items-center text-center lg:max-w-[55%] lg:items-start lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8ED9FF]/60 bg-soft-accent px-4 py-1.5 text-xs font-semibold text-[#23354A] shadow-sm backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-[#8ED9FF]" />
            {heroContent.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.8, ease }}
            className="max-w-3xl text-5xl font-bold leading-tight text-slate-50 drop-shadow-[0_18px_55px_rgba(15,23,42,0.6)] md:text-6xl"
          >
            <span className="block text-slate-50">{heroContent.title}</span>
            <motion.span
              className="mt-4 block bg-gradient-accent bg-clip-text text-transparent text-[0.98em] font-semibold tracking-tight drop-shadow-[0_12px_30px_rgba(15,23,42,0.5)]"
              initial={{ backgroundPositionX: '0%' }}
              animate={{ backgroundPositionX: '100%' }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200%' }}
            >
              {heroContent.highlight}
            </motion.span>
          </motion.h1>

          <div className="mt-8 min-h-[4.5rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeLine}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease }}
                className={
                  activeLine === 0
                    ? 'max-w-2xl text-lg font-medium text-slate-100 drop-shadow-[0_10px_30px_rgba(15,23,42,0.4)]'
                    : 'max-w-2xl text-lg text-slate-100/90 drop-shadow-[0_8px_24px_rgba(15,23,42,0.4)]'
                }
              >
                {subheadingLines[activeLine]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.6, ease }}
            className="mt-12 flex w-full flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link
              to={heroContent.primaryAction.to}
              className="btn-primary px-7 py-3 text-base"
            >
              {heroContent.primaryAction.label}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              to={heroContent.secondaryAction.to}
              className="btn-secondary-invert px-6 py-3 text-base"
            >
              <Download className="h-5 w-5" />
              {heroContent.secondaryAction.label}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.6, ease }}
            className="mt-12 flex w-full justify-center lg:justify-start"
          >
            <div className="inline-flex items-center gap-4 rounded-full bg-slate-950/40 px-5 py-3 shadow-[0_18px_42px_rgba(15,23,42,0.5)] backdrop-blur">
              {socials.map(handle => {
                const Icon = socialIcons[handle.icon] ?? GlobeIconFallback
                return (
                  <a
                    key={handle.id}
                    href={handle.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={handle.label}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/30 text-white/80 transition hover:-translate-y-0.5 hover:border-white hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-900/50"
                  >
                    <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  </a>
                )
              })}
            </div>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.7, ease }}
          className="relative w-full max-w-[325px] lg:self-stretch"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-200/35 via-transparent to-sky-200/25 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] bg-white/78 p-7 shadow-[0_26px_64px_rgba(15,41,67,0.2)] backdrop-blur">
            <div className="relative mx-auto w-full">
              <img
                src={heroContent.portraitIllustration}
                alt="Abhay building with a laptop"
                className="w-full drop-shadow-[0_26px_52px_rgba(15,182,196,0.32)]"
                loading="lazy"
              />
            </div>
            <div className="mt-6 rounded-2xl border border-[#8ED9FF]/45 bg-soft-accent px-5 py-4 text-sm text-slate-600 shadow-sm">
              <p>
                “Our systems need to feel seamless for operators. I obsess over latency budgets, healthy
                pipelines, and guardrails that make AI trustworthy.”
              </p>
            </div>
          </div>
          <div className="absolute inset-x-10 -bottom-10 h-24 rounded-full bg-soft-accent/45 blur-3xl" aria-hidden />
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
            className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-[0_25px_70px_rgba(79,209,197,0.18)]"
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
