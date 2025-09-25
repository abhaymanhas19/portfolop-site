import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Target, Workflow, Heart } from 'lucide-react'
import { site } from '../data/site'
import { profile } from '../data/profile'
import MagicBento from '../components/MagicBento'

export default function About() {
  const { about } = profile
  const experienceItems = about.experience.map((item, index) => (
    {
      id: `${item.company}-${item.role}`,
      badge: item.company,
      meta: item.period,
      title: item.role,
      description: item.summary,
      chips: item.achievements.slice(0, 2),
      overflowLabel:
        item.achievements.length > 2 ? `+${item.achievements.length - 2} more wins` : undefined,
      accent:
        index % 3 === 0
          ? 'from-[#FF6B35]/24 via-[#1f1814]/55 to-transparent'
          : index % 3 === 1
            ? 'from-[#FF6B35]/20 via-[#1a2128]/55 to-transparent'
            : 'from-[#FF6B35]/20 via-[#1f1b28]/55 to-transparent',
      modalContent: (
        <div className="space-y-5">
          <p className="text-sm leading-relaxed text-white/75 md:text-base">{item.summary}</p>
          <div className="space-y-2 text-sm text-white/80">
            {item.achievements.map(point => (
              <div key={point} className="flex gap-2">
                <span className="mt-1 h-1 w-1 flex-none rounded-full bg-[#FF6B35]" aria-hidden />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    }
  ))

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 max-w-4xl -translate-y-1/2 rounded-full bg-[#ff5a1c2a] blur-[160px] mx-auto" aria-hidden />

      <div className="relative space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-background/85 via-[#151516] to-background/90 p-8 md:p-12"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4 max-w-3xl">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
                <Sparkles className="h-3.5 w-3.5 text-[#ff5a1c]" /> About {site.NAME}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                {about.headline}
              </h1>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                {about.intro}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_12px_32px_rgba(255,90,28,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(255,90,28,0.55)]"
              >
                View resume <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
              >
                Start a project
              </Link>
            </div>
          </div>

          <MagicBento
            items={about.focusAreas.map((area, index) => ({
              id: area.title,
              badge: 'Focus area',
              title: area.title,
              description: area.description,
              accent:
                index % 2 === 0
                  ? 'from-[#FF6B35]/22 via-[#201b18]/55 to-transparent'
                  : 'from-[#FF6B35]/18 via-[#181f24]/55 to-transparent',
            }))}
            columnsClassName="sm:grid-cols-2 lg:grid-cols-3"
          />
        </motion.div>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <Workflow className="h-4 w-4 text-[#ff5a1c]" />
            </span>
            <h2 className="text-2xl font-semibold text-white">Experience snapshots</h2>
          </div>
          <MagicBento items={experienceItems} />
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <Target className="h-4 w-4 text-[#ff5a1c]" />
            </span>
            <h2 className="text-2xl font-semibold text-white">Working principles</h2>
          </div>
          <MagicBento
            items={about.values.map(val => ({
              id: val.title,
              icon: <Heart className="h-5 w-5 text-[#FF6B35]" />,
              title: val.title,
              description: val.description,
              accent: 'from-[#FF6B35]/18 via-[#1d1d21]/55 to-transparent',
            }))}
            columnsClassName="md:grid-cols-3"
          />
        </section>
      </div>
    </section>
  )
}
