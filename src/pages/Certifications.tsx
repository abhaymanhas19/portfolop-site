import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Sparkles } from 'lucide-react'
import { certificationBadges, homeContent } from '../data/content'

type CategoryGroup = {
  name: string
  badges: typeof certificationBadges
}

const buildCategories = (): CategoryGroup[] => {
  const map = new Map<string, typeof certificationBadges>()
  certificationBadges.forEach(badge => {
    const existing = map.get(badge.category)
    if (existing) {
      existing.push(badge)
    } else {
      map.set(badge.category, [badge])
    }
  })
  return Array.from(map.entries()).map(([name, badges]) => ({ name, badges }))
}

export default function Certifications() {
  const categories = useMemo(buildCategories, [])

  return (
    <div className="relative isolate overflow-hidden bg-white text-slate-700">
      <section className="relative flex min-h-[320px] items-end">
        <motion.img
          src={homeContent.achievementsBackground}
          alt=""
          aria-hidden
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.28, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-[#FDF4EE]/85" aria-hidden />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-12 pt-24 md:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-violet-500">
            <Sparkles className="h-3.5 w-3.5" /> Achievements
          </span>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h1 className="text-3xl font-semibold text-slate-900 md:text-5xl">
              Certifications and awards backing delivery
            </h1>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/85 px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-violet-200 hover:bg-violet-50/70 hover:text-violet-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
            </Link>
          </div>
          <p className="max-w-3xl text-sm text-slate-600 md:text-base">
            Each badge represents months of practice, experimentation, and measurable outcomes. Explore categories to see how the toolkit spans AI, backend, cloud, and problem solving.
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-8 md:px-6 lg:px-8">
        {categories.map(category => (
          <div key={category.name} className="mb-14 last:mb-0">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">{category.name}</h2>
              <span className="text-xs font-semibold uppercase tracking-[0.26em] text-violet-400">
                {category.badges.length} credentials
              </span>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {category.badges.map(badge => (
                <motion.article
                  key={badge.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="flex h-full flex-col overflow-hidden rounded-[28px] border border-violet-100 bg-white/90 shadow-[0_26px_70px_rgba(61,40,120,0.16)] backdrop-blur"
                >
                  <div className="relative h-44">
                    <motion.img
                      src={badge.badgeImage}
                      alt={`${badge.title} certificate`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-900/25 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col gap-4 px-6 pb-7 pt-6 text-left">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.26em] text-violet-400">
                      <span>{badge.issuer}</span>
                      <span>{badge.year}</span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-slate-900">{badge.title}</h3>
                      <p className="text-sm text-slate-600">{badge.summary}</p>
                    </div>
                    {badge.credentialUrl && (
                      <a
                        href={badge.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-auto inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 text-sm font-semibold text-violet-600 transition hover:border-violet-200 hover:bg-violet-50"
                      >
                        <ExternalLink className="h-4 w-4" /> Verify credential
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="mt-16 rounded-[32px] border border-violet-100 bg-gradient-to-r from-violet-50/90 via-white/95 to-cyan-50/90 px-6 py-7 text-slate-700 shadow-[0_24px_60px_rgba(61,40,120,0.15)] md:flex md:items-center md:justify-between md:px-10"
        >
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl font-semibold text-slate-900">Curious how these skills apply to your idea?</h2>
            <p className="text-sm text-slate-600 md:text-base">
              Let’s connect and map how the toolkit can accelerate your roadmap with responsible, production-ready AI.
            </p>
          </div>
          <Link
            to="/#contact"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 px-6 py-3 text-base font-semibold text-slate-900 shadow-[0_18px_48px_rgba(61,40,120,0.25)] transition hover:-translate-y-0.5 md:mt-0"
          >
            Start the conversation
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
