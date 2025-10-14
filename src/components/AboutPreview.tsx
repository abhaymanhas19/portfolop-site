import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { aboutContent, homeContent } from '../data/content'

const focusPreview = aboutContent.tiles.slice(0, 2)

export default function AboutPreview() {
  return (
    <section className="relative overflow-hidden py-20">

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 text-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-3">
            <span className="tag-pill">
              <Sparkles />
              Meet Abhay
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              {aboutContent.headline}
            </h2>
            <p className="max-w-3xl text-sm text-slate-600 md:text-base">
              {aboutContent.intro}
            </p>
          </div>
          <Link to="/about" className="btn-secondary">
            Dive into the story <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {focusPreview.map((tile, index) => (
            <motion.div
              key={tile.title}
              whileHover={{ translateY: -6 }}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_26px_60px_rgba(15,23,42,0.12)]"
            >
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-slate-600">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm text-slate-700 shadow-sm">
                  {index + 1}
                </span>
                Focus area
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{tile.title}</h3>
              <p className="mt-3 text-sm   leading-relaxed text-slate-600">{tile.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="rounded-[32px] border border-slate-200 bg-slate-50 px-6 py-7 text-slate-700 shadow-[0_24px_60px_rgba(15,23,42,0.12)] md:px-10"
        >
          <p className="text-sm md:text-base text-slate-700">
            Curious about the delivery principles, day-to-day rituals, or how the playbook scales across teams?
            Hop over to the about page for experience snapshots and values.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link to="/about" className="btn-primary px-5 py-2 text-sm">
              Read the full story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
