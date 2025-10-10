import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { aboutContent, homeContent } from '../data/content'

const focusPreview = aboutContent.tiles.slice(0, 2)

export default function AboutPreview() {
  return (
    <section className="relative overflow-hidden py-20">
      <motion.img
        src={homeContent.aboutBackground}
        alt=""
        aria-hidden
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 0.25, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/94 via-white/90 to-[#ECF7FF]/85" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-6 text-slate-800 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200/80 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-600">
              <Sparkles className="h-4 w-4" /> Meet Abhay
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">{aboutContent.headline}</h2>
            <p className="max-w-3xl text-sm text-slate-600 md:text-base">{aboutContent.intro}</p>
          </div>
          <Link
            to="/about"
            className="inline-flex h-fit items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/85 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50/70 hover:text-cyan-600"
          >
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
              className="rounded-[28px] border border-cyan-100 bg-white/85 p-6 shadow-[0_26px_60px_rgba(15,41,67,0.12)] backdrop-blur"
            >
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-cyan-500">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-sm text-cyan-600">
                  {index + 1}
                </span>
                Focus area
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{tile.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{tile.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="rounded-[32px] border border-cyan-100 bg-gradient-to-r from-cyan-50/90 via-white/95 to-sky-50/85 px-6 py-7 text-slate-700 shadow-[0_24px_60px_rgba(15,41,67,0.12)] md:px-10"
        >
          <p className="text-sm md:text-base">
            Curious about the delivery principles, day-to-day rituals, or how the playbook scales across teams?
            Hop over to the about page for experience snapshots and values.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
