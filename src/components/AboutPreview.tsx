import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { site } from '../data/site'
import { profile } from '../data/profile'

export default function AboutPreview() {
  const { about } = profile
  const focusPreview = about.focusAreas.slice(0, 2)

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
            <Sparkles className="h-3.5 w-3.5 text-[#ff5a1c]" /> Meet {site.NAME}
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            {about.headline}
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
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
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/50 hover:bg-white/10 transition"
          >
            Dive into the story <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {focusPreview.map(area => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-white/10 bg-[#111]/70 p-6"
          >
            <h3 className="text-lg font-semibold text-white">{area.title}</h3>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">{area.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
