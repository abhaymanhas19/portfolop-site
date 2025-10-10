import { motion } from 'framer-motion'
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
  'top-20 left-[4%]',
  'top-12 right-[6%]',
  'bottom-28 left-[12%]',
  'bottom-12 right-[6%]',
]

export default function HeroSection() {
  const subheadingLines = [heroContent.description, heroContent.detail]

  return (
    <section className="relative isolate overflow-hidden">
      <motion.img
        src={heroContent.backgroundImage}
        alt=""
        aria-hidden
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.65 }}
        transition={{ duration: 1.2, ease }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/92 to-[#ECF4FF]/88" />
      <div aria-hidden className="hero-aurora" />
      <div aria-hidden className="grid-floor" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-16 px-6 py-24 lg:flex-row lg:items-center lg:gap-14 xl:gap-20">
        <div className="flex w-full flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/70 bg-white/80 px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-cyan-500" />
            {heroContent.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.8, ease }}
            className="max-w-3xl text-4xl font-semibold leading-tight text-slate-900 md:text-6xl lg:self-start lg:pl-6"
          >
            <span className="block text-slate-600">{heroContent.title}</span>
            <motion.span
              className="mt-1 block bg-gradient-to-r from-cyan-500 via-teal-400 to-sky-500 bg-clip-text text-transparent"
              initial={{ backgroundPositionX: '0%' }}
              animate={{ backgroundPositionX: '100%' }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200%' }}
            >
              {heroContent.highlight}
            </motion.span>
          </motion.h1>

          <div className="mt-6 flex flex-col gap-3">
            {subheadingLines.map((line, index) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 + index * 0.12, duration: 0.6, ease }}
                className={index === 0 ? 'max-w-2xl text-lg font-medium text-slate-700 md:text-xl' : 'max-w-2xl text-base text-slate-600 md:text-lg'}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.6, ease }}
            className="mt-10 flex w-full flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link
              to={heroContent.primaryAction.to}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 px-7 py-3 text-base font-semibold text-slate-900 shadow-[0_18px_45px_rgba(79,209,197,0.45)] transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {heroContent.primaryAction.label}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              to={heroContent.secondaryAction.to}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/85 px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50/70 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <Download className="h-5 w-5" />
              {heroContent.secondaryAction.label}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.6, ease }}
            className="mt-10 flex items-center justify-center gap-3 lg:justify-start"
          >
            {socials.map(handle => {
              const Icon = socialIcons[handle.icon] ?? GlobeIconFallback
              return (
                <a
                  key={handle.id}
                  href={handle.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={handle.label}
                  className="group inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white/85 text-slate-500 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                </a>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.92, duration: 0.6, ease }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 lg:justify-start"
          >
            {heroContent.stats.map(stat => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur"
              >
                <span className="text-xl font-semibold text-slate-900">{stat.value}</span>
                <span className="max-w-[8rem] text-xs uppercase tracking-[0.18em] text-slate-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.7, ease }}
          className="relative w-full max-w-[420px]"
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-cyan-200/60 via-transparent to-sky-200/50 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white/85 p-8 shadow-[0_32px_80px_rgba(15,41,67,0.18)] backdrop-blur-lg">
            <div className="relative mx-auto w-full">
              <img
                src={heroContent.portraitIllustration}
                alt="Abhay building with a laptop"
                className="w-full drop-shadow-[0_35px_70px_rgba(15,182,196,0.35)]"
                loading="lazy"
              />
            </div>
            <div className="mt-6 rounded-2xl border border-cyan-100 bg-cyan-50/70 px-5 py-4 text-sm text-slate-600 shadow-sm">
              <p>
                “Our systems need to feel seamless for operators. I obsess over latency budgets, healthy
                pipelines, and guardrails that make AI trustworthy.”
              </p>
            </div>
          </div>
          <div className="absolute inset-x-12 -bottom-8 h-28 rounded-full bg-cyan-200/40 blur-3xl" aria-hidden />
        </motion.div>
      </div>

      {heroContent.codeTiles.map((tile, index) => (
        <motion.div
          key={tile.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: tile.delay, duration: 0.7, ease: 'easeOut' }}
          className={`pointer-events-none absolute hidden w-64 xl:block ${tilePositions[index % tilePositions.length]}`}
        >
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 6 + tile.delay, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-2xl border border-white/90 bg-white/95 p-4 shadow-[0_25px_70px_rgba(79,209,197,0.25)]"
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
