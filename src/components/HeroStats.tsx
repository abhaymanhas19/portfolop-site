import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Building2, BriefcaseBusiness, UsersRound } from 'lucide-react'
import { heroContent } from '../data/content'

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.18, 0.78, 0.24, 1],
      staggerChildren: 0.15,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.18, 0.78, 0.24, 1] } },
}

const statIcons: Record<string, LucideIcon> = {
  BriefcaseBusiness,
  UsersRound,
  Building2,
}

export default function HeroStats() {
  if (!heroContent.stats?.length) return null

  return (
    <section aria-label="Key delivery metrics" className="relative overflow-hidden bg-white py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-50/80 via-white to-transparent"
      />
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-soft-accent/35 blur-3xl" />
      <motion.div
        className="relative mx-auto max-w-6xl px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -140px 0px' }}
      >
        <div className="relative overflow-hidden rounded-[36px] border border-[#8ED9FF]/45/70 bg-white/92 px-6 py-10 shadow-[0_26px_80px_rgba(15,41,67,0.12)] backdrop-blur-lg sm:px-8">
          <div className="pointer-events-none absolute inset-y-8 -left-20 h-32 w-32 rounded-full bg-soft-accent/40 blur-2xl" />
          <div className="pointer-events-none absolute inset-y-12 -right-16 h-40 w-40 rounded-full bg-sky-100/35 blur-2xl" />
          <motion.div
            className="relative flex flex-wrap items-center justify-center gap-5 text-sm text-slate-500 md:justify-between"
            variants={container}
          >
            {heroContent.stats.map(stat => {
              const Icon = stat.icon ? statIcons[stat.icon] : undefined
              return (
                <motion.div
                  key={stat.label}
                  variants={item}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative flex min-w-[240px] items-center gap-4 rounded-3xl border border-white/40 bg-white/90 px-6 py-5 shadow-[0_18px_50px_rgba(15,41,67,0.12)] ring-1 ring-inset ring-cyan-100/55 transition-transform"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-100/25 via-transparent to-sky-100/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {Icon && (
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-200/70 bg-emerald-50/90 text-emerald-600 shadow-inner">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                  )}
                  <span className="relative text-2xl font-semibold text-slate-900">
                    <motion.span
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.18, 0.78, 0.24, 1] }}
                      className="block"
                    >
                      {stat.value}
                    </motion.span>
                  </span>
                  <span className="relative max-w-[10rem] text-xs uppercase tracking-[0.22em] text-slate-500">
                    {stat.label}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
