import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Award, ArrowRight, ExternalLink } from 'lucide-react'
import { certificationBadges } from '../data/content'

type CategoryGroup = {
  name: string
  badges: typeof certificationBadges
}

export default function CertificationsPreview() {
  const categories = useMemo<CategoryGroup[]>(() => {
    const map = new Map<string, typeof certificationBadges>()
    certificationBadges.forEach(badge => {
      const key = badge.category
      const existing = map.get(key)
      if (existing) {
        existing.push(badge)
      } else {
        map.set(key, [badge])
      }
    })
    return Array.from(map.entries()).map(([name, badges]) => ({ name, badges }))
  }, [])

  const allCategory: CategoryGroup = useMemo(() => ({ name: 'All Achievements', badges: certificationBadges }), [])
  const categoriesWithAll = useMemo(() => [allCategory, ...categories], [allCategory, categories])

  const [activeCategory, setActiveCategory] = useState(categoriesWithAll[0]?.name ?? 'All Achievements')
  const activeBadges = categoriesWithAll.find(category => category.name === activeCategory)?.badges ?? []

  return (
    <section className="relative overflow-hidden py-20">

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 text-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-3">
            <span className="tag-pill">
              <Award className="h-4 w-4" /> Achievements
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              Credentials by specialisation
            </h2>
            <p className="max-w-3xl text-sm text-slate-600 md:text-base">
              Switch categories to see the badges that back each practice—from AI experimentation to resilient cloud delivery.
            </p>
          </div>
          <Link to="/certifications" className="btn-secondary gap-2 px-6 py-2.5 text-sm">
            View all achievements <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="flex flex-wrap gap-3">
          {categoriesWithAll.map(category => {
            const active = category.name === activeCategory
            return (
              <button
                key={category.name}
                type="button"
                onClick={() => setActiveCategory(category.name)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? 'bg-slate-900 text-white shadow-[0_18px_42px_rgba(15,23,42,0.16)]'
                    : 'border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {category.name}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="overflow-x-auto pb-2"
          >
            <div className="flex min-w-full gap-6">
              {activeBadges.map(badge => (
                <article
                  key={badge.id}
                  className="relative flex min-w-[260px] max-w-xs flex-col overflow-hidden rounded-[28px] border border-violet-200/60 bg-white/85 shadow-[0_26px_60px_rgba(61,40,120,0.12)] backdrop-blur"
                >
                  <div className="relative h-40">
                    <motion.img
                      src={badge.badgeImage}
                      alt={`${badge.title} certificate`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="space-y-4 px-5 pb-6 pt-5 text-left">
                    <div className="space-y-1.5">
                      <span className="tag-pill px-3 py-1 text-[11px] tracking-[0.28em]">
                        {badge.year}
                      </span>
                      <h3 className="text-lg font-semibold text-slate-900">{badge.title}</h3>
                      <p className="text-sm text-slate-600">{badge.summary}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
                      <span>{badge.issuer}</span>
                      {badge.credentialUrl && (
                        <a
                          href={badge.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-gradient-accent px-3 py-1 text-[11px] font-semibold text-[#05202d] shadow-[0_14px_32px_rgba(14,165,233,0.22)] transition hover:-translate-y-0.5"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> Verify
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="flex flex-col gap-4 rounded-[32px] border border-violet-100 bg-gradient-to-r from-violet-50/90 via-white/95 to-cyan-50/85 px-6 py-7 text-slate-700 shadow-[0_24px_60px_rgba(61,40,120,0.12)] md:flex-row md:items-center md:justify-between md:px-10"
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-semibold text-slate-900 md:text-xl">
              Need the full credential stack?
            </h3>
            <p className="max-w-xl text-sm text-slate-600 md:text-base">
              Browse every certification, award, and credential powering delivery across AI, data engineering, and platform reliability.
            </p>
          </div>
          <Link to="/certifications" className="btn-primary px-7 py-3 text-sm">
            View full archive
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
