import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { site } from '../data/site'
import { profile } from '../data/profile'
import MagicBento, { type MagicBentoItem } from './MagicBento'

export default function AboutPreview() {
  const { about } = profile
  const focusPreview = about.focusAreas.slice(0, 2)

  const items: MagicBentoItem[] = focusPreview.map((area, index) => ({
    id: area.title,
    badge: 'Focus area',
    title: area.title,
    description: area.description,
    accent: index === 0 ? 'from-[#FF6B35]/22 via-[#1f1a18]/55 to-transparent' : 'from-[#FF6B35]/18 via-[#181f22]/55 to-transparent',
    modalContent: (
      <p className="text-sm leading-relaxed text-white/75 md:text-base">{area.description}</p>
    ),
  }))

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60">
            <Sparkles className="h-3.5 w-3.5 text-[#FF6B35]" /> Meet {site.NAME}
          </span>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            {about.headline}
          </h2>
          <p className="max-w-2xl text-sm text-white/70 md:text-base">
            {about.intro}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
          >
            Dive into the story <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      <div className="mt-10">
        <MagicBento items={items} />
      </div>
    </section>
  )
}
