import { useMemo, useState } from 'react'
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
  const allCategory: CategoryGroup = useMemo(
    () => ({ name: 'All Achievements', badges: certificationBadges }),
    [],
  )
  const categoriesWithAll = useMemo(() => [allCategory, ...categories], [allCategory, categories])
  const [activeCategory, setActiveCategory] = useState(categoriesWithAll[0]?.name ?? 'All Achievements')
  const activeBadges = categoriesWithAll.find(group => group.name === activeCategory)?.badges ?? certificationBadges

  return (
    <div className="relative isolate overflow-hidden bg-white text-slate-700">
      <section className="border-b border-slate-200/70 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative w-full overflow-hidden"
        >
          <motion.img
            src={homeContent.achievementsBackground}
            alt="Certifications hero"
            className="block h-[min(60vh,520px)] w-full object-cover md:h-[520px]"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/42 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="absolute inset-0 flex items-end"
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-12 pt-24 text-white md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
              <div className="max-w-3xl space-y-4">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-violet-200">
                  <Sparkles className="h-3.5 w-3.5" /> Achievements
                </span>
                <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
                  Certifications and awards backing delivery
                </h1>
                <p className="text-sm text-white/85 md:text-base">
                  Each badge represents months of practice, experimentation, and measurable outcomes. Explore categories to see how the toolkit spans AI, backend, cloud, and problem solving.
                </p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/90 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-white hover:bg-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-8 md:px-6 lg:px-8">
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
                    ? 'bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 text-slate-900 shadow-[0_12px_34px_rgba(61,40,120,0.24)]'
                    : 'border border-slate-200 bg-white/85 text-slate-600 hover:border-violet-200 hover:text-violet-600'
                }`}
              >
                {category.name}
              </button>
            )
          })}
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {activeBadges.map(badge => (
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
        </motion.div>

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
