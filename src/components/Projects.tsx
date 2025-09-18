import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { ExternalLink, Github, Image as ImageIcon } from 'lucide-react'
import TiltCard from './TiltCard'

export default function Projects() {
  const previewProjects = projects.slice(0, 2)
  const remaining = projects.length - previewProjects.length

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60">
            <span className="h-1 w-3 rounded-full bg-[#ff5a1c]" aria-hidden /> Project spotlight
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Highlights from recent AI & platform builds
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
            A snapshot of engagements that pair intelligent products with reliable delivery. Full write-ups live on the dedicated projects page.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/50 hover:bg-white/10 transition"
          >
            Explore all projects
          </Link>
        </motion.div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {previewProjects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <TiltCard className="rounded-2xl bg-card border border-border overflow-hidden gradient-border">
              <div className="relative group">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.title} screenshot`}
                    className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                ) : (
                  <div className="w-full aspect-[16/9] grid place-items-center bg-[#222] text-[#FFFFFF]">
                    <ImageIcon className="h-8 w-8" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-fg">{p.title}</h3>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-2 text-[#FFFFFF] line-clamp-4">
                  {p.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.slice(0, 3).map(t => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-[#222] text-[#FFFFFF] opacity-85 border border-border">
                      {t}
                    </span>
                  ))}
                  {p.tags.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-full border border-[#ff5a1c33] text-[#ff5a1c]">
                      +{p.tags.length - 3} more
                    </span>
                  )}
                </div>
                <div className="mt-4 flex gap-3 text-sm">
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-fg hover:underline">
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-fg hover:underline">
                      <Github className="h-4 w-4" /> Source
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-10 flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-[#111]/70 p-6 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h3 className="text-lg font-semibold text-white">See the full breakdown?</h3>
          <p className="text-sm text-white/65">
            Read the case studies covering architecture choices, trade-offs, and results.
          </p>
        </div>
        <Link
          to="/projects"
          className="inline-flex items-center justify-center rounded-full bg-[#FF6B35] px-6 py-3 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(255,90,28,0.4)] hover:shadow-[0_12px_32px_rgba(255,90,28,0.5)] transition"
        >
          View case studies
        </Link>
      </motion.div>

      {remaining > 0 && (
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/50">
          +{remaining} additional projects in the library
        </p>
      )}
    </section>
  )
}
