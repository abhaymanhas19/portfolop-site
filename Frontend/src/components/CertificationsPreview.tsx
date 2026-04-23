import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Award, ArrowRight, ExternalLink } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

type CategoryGroup = {
  name: string
  badges: any[]
}

export default function CertificationsPreview() {
  const { achievements } = usePortfolio()
  const certificationBadges = achievements.certifications

  const categories = useMemo<CategoryGroup[]>(() => {
    const map = new Map<string, any[]>()
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
  }, [certificationBadges])

  const allCategory: CategoryGroup = useMemo(() => ({ name: 'All Achievements', badges: certificationBadges }), [certificationBadges])
  const categoriesWithAll = useMemo(() => [allCategory, ...categories], [allCategory, categories])

  const [activeCategory, setActiveCategory] = useState(categoriesWithAll[0]?.name ?? 'All Achievements')
  const activeBadges = categoriesWithAll.find(category => category.name === activeCategory)?.badges ?? []

  return (
    <section className="relative overflow-hidden bg-surface-container-low py-ds-16 section-depth">
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-4">
            <span className="tag-pill">
              <Award className="h-4 w-4" /> Achievements
            </span>
            <h2 className="font-display text-display-md font-semibold text-[#2a3439]">
              Credentials by specialisation
            </h2>
            <p className="max-w-3xl text-body-lg text-[#565e74]">
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
                    ? 'bg-gradient-cta text-white shadow-ambient-sm'
                    : 'bg-surface-container-lowest text-[#565e74] hover:bg-surface-container-high hover:text-[#2a3439]'
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
            <div className="flex min-w-full items-stretch gap-6">
              {activeBadges.map(badge => (
                <article
                  key={badge.id}
                  className="relative flex h-full min-w-[260px] max-w-xs flex-col overflow-hidden rounded-card bg-surface-container-lowest shadow-ambient transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-40 overflow-hidden">
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
                  <div className="flex h-[240px] flex-col gap-4 px-5 pb-6 pt-5 text-left">
                    <div className="space-y-1.5">
                      <span className="tag-pill px-3 py-1 text-[11px] tracking-[0.28em]">
                        {badge.year}
                      </span>
                      <h3 className="line-clamp-2 font-display text-lg font-semibold text-[#2a3439]">{badge.title}</h3>
                      <p className="line-clamp-3 min-h-[3.75rem] text-sm text-[#565e74]">{badge.summary}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#565e74]/60">
                      <span>{badge.issuer}</span>
                      {badge.credentialUrl && (
                        <div className="relative z-10">
                          <a
                            href={badge.credentialUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-primary px-3 py-1 text-[11px]"
                          >
                            <ExternalLink className="h-3.5 w-3.5" /> Verify
                          </a>
                        </div>
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
          className="flex flex-col gap-4 rounded-card bg-surface-container-lowest px-6 py-7 shadow-ambient md:flex-row md:items-center md:justify-between md:px-10"
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display text-lg font-semibold text-[#2a3439] md:text-xl">
              Need the full credential stack?
            </h3>
            <p className="max-w-xl text-sm text-[#565e74] md:text-base">
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
