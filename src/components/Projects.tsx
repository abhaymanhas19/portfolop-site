import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { ExternalLink, Github, Image as ImageIcon } from 'lucide-react'
import MagicBento, { type MagicBentoItem } from './MagicBento'

export default function Projects() {
  const previewProjects = projects.slice(0, 2)
  const remaining = projects.length - previewProjects.length
  const [modalData, setModalData] = useState<{ title: string; items: string[] } | null>(null)

  const handleOpenModal = (title: string, items: string[]) => {
    setModalData({ title, items })
  }

  const handleCloseModal = () => setModalData(null)

  const items: MagicBentoItem[] = previewProjects.map((project, index) => {
    const chips = project.tags.slice(0, 4)
    const extra = project.tags.length - chips.length

    const modalContent = (
      <div className="space-y-5">
        <p className="text-sm leading-relaxed text-white/75 md:text-base">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-white/80"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white/85 transition hover:border-white/50 hover:bg-white/10"
            >
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white/85 transition hover:border-white/50 hover:bg-white/10"
            >
              <Github className="h-4 w-4" /> Source
            </a>
          )}
        </div>
      </div>
    )

    return {
      id: project.title,
      badge: 'Project Spotlight',
      meta: `Case ${String(index + 1).padStart(2, '0')}`,
      title: project.title,
      description: project.description,
      media: project.image ? (
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="aspect-[16/9] w-full bg-[#1e1e22] grid place-items-center text-white/50">
          <ImageIcon className="h-8 w-8" />
        </div>
      ),
      chips,
      accent: index % 2 === 0 ? 'from-[#FF6B35]/20 via-[#1d1b24]/60 to-transparent' : 'from-[#FF6B35]/18 via-[#182024]/60 to-transparent',
      overflowLabel: extra > 0 ? `+${extra} more stack picks` : undefined,
      actions: (
        <>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-white/85 transition hover:border-white/40 hover:bg-white/10"
            >
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-white/85 transition hover:border-white/40 hover:bg-white/10"
            >
              <Github className="h-4 w-4" /> Source
            </a>
          )}
        </>
      ),
      modalContent,
    }
  })

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
            <span className="h-1 w-3 rounded-full bg-[#FF6B35]" aria-hidden /> Project spotlight
          </span>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Highlights from recent AI & platform builds
          </h2>
          <p className="max-w-2xl text-sm text-white/70 md:text-base">
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
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
          >
            Explore all projects
          </Link>
        </motion.div>
      </div>

      <div className="mt-10">
        <MagicBento items={items} />
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
          className="inline-flex items-center justify-center rounded-full bg-[#FF6B35] px-6 py-3 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(255,90,28,0.4)] transition hover:shadow-[0_12px_32px_rgba(255,90,28,0.5)]"
        >
          View case studies
        </Link>
      </motion.div>

      {remaining > 0 && (
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/50">
          +{remaining} additional projects in the library
        </p>
      )}

      <TagListModal
        isOpen={!!modalData}
        title={modalData?.title ?? ''}
        items={modalData?.items ?? []}
        onClose={handleCloseModal}
      />
    </section>
  )
}
