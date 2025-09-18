import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Target, Workflow, Heart } from 'lucide-react'
import { site } from '../data/site'
import { profile } from '../data/profile'

export default function About() {
  const { about } = profile

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 max-w-4xl -translate-y-1/2 rounded-full bg-[#ff5a1c2a] blur-[160px] mx-auto" aria-hidden />

      <div className="relative space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-black/85 via-[#151516] to-black/90 p-8 md:p-12"
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

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {about.focusAreas.map(area => (
              <div
                key={area.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{area.title}</p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <Workflow className="h-4 w-4 text-[#ff5a1c]" />
            </span>
            <h2 className="text-2xl font-semibold text-white">Experience snapshots</h2>
          </div>
          <div className="space-y-6">
            {about.experience.map(item => (
              <motion.article
                key={`${item.company}-${item.role}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="rounded-3xl border border-white/10 bg-[#101013]/90 p-6 md:p-8"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                    <p className="text-sm text-white/60">{item.company}</p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">{item.period}</p>
                </div>
                <p className="mt-4 text-sm md:text-base text-white/70 leading-relaxed">{item.summary}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  {item.achievements.map(point => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[#ff5a1c]" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <Target className="h-4 w-4 text-[#ff5a1c]" />
            </span>
            <h2 className="text-2xl font-semibold text-white">Working principles</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {about.values.map(val => (
              <div key={val.title} className="rounded-2xl border border-white/10 bg-[#111]/80 p-5">
                <p className="text-sm font-semibold text-white flex items-center gap-2">
                  <Heart className="h-4 w-4 text-[#ff5a1c]" /> {val.title}
                </p>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
