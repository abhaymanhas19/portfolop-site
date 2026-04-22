import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Building2, BriefcaseBusiness, UsersRound } from 'lucide-react'
import { heroContent } from '../data/content'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const statIcons: Record<string, LucideIcon> = {
  BriefcaseBusiness,
  UsersRound,
  Building2,
}

export default function HeroStats() {
  if (!heroContent.stats?.length) return null

  return (
    <section aria-label="Key delivery metrics" className="relative overflow-hidden bg-surface py-14 section-depth">
      <motion.div
        className="relative mx-auto max-w-6xl px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -140px 0px' }}
      >
        <div className="relative overflow-hidden rounded-card bg-surface-container-lowest px-6 py-10 shadow-ambient sm:px-8">
          <motion.div
            className="relative flex flex-wrap items-center justify-center gap-5 text-sm text-[#565e74] md:justify-between"
            variants={container}
          >
            {heroContent.stats.map(stat => {
              const Icon = stat.icon ? statIcons[stat.icon] : undefined
              return (
                <motion.div
                  key={stat.label}
                  variants={item}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative flex min-w-[240px] items-center gap-4 rounded-card bg-surface-container-low px-6 py-5 shadow-ambient-sm transition-transform"
                >
                  {Icon && (
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-container-lowest text-[#005bc4]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                  )}
                  <span className="relative font-display text-2xl font-semibold text-[#2a3439]">
                    <motion.span
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.18, 0.78, 0.24, 1] }}
                      className="block"
                    >
                      {stat.value}
                    </motion.span>
                  </span>
                  <span className="relative max-w-[10rem] text-xs uppercase tracking-[0.22em] text-[#565e74]">
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
