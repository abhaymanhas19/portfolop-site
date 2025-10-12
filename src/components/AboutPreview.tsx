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
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 text-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#8ED9FF]/60 bg-soft-accent px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFFFFF]">
              <Sparkles className="h-4 w-4 text-[#FFFFFF]" /> Meet Abhay
            </span>
            <h2 className="text-3xl text-[#FFFFFF] font-semibold md:text-4xl">
              {aboutContent.headline}
            </h2>
            <p className="max-w-3xl text-[#FFFFFF] text-sm text-slate-600 md:text-base">
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
              className="rounded-[28px] border border-[#8ED9FF]/45 bg-white/92 p-6 shadow-[0_26px_60px_rgba(15,41,67,0.12)] backdrop-blur"
            >
              <div className="flex items-center gap-3 text-[#FFFFFF] text-xs font-semibold uppercase tracking-[0.26em] text-[#23354A]">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-[#8ED9FF]/55 bg-soft-accent text-sm text-[#23354A]">
                  {index + 1}
                </span>
                Focus area
              </div>
              <h3 className="mt-4 text-xl text-[#FFFFFF] font-semibold text-slate-900">{tile.title}</h3>
              <p className="mt-3 text-sm text-[#FFFFFF] leading-relaxed text-slate-600">{tile.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="rounded-[32px] border border-[#8ED9FF]/45 bg-soft-accent px-6 py-7 text-slate-700 shadow-[0_24px_60px_rgba(15,41,67,0.12)] md:px-10"
        >
          <p className="text-sm md:text-base text-[#FFFFFF] ">
            Curious about the delivery principles, day-to-day rituals, or how the playbook scales across teams?
            Hop over to the about page for experience snapshots and values.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
