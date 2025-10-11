import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, Github } from 'lucide-react'
import { projectCases, homeContent } from '../data/content'
import Modal from './Modal'

const previewProjects = projectCases.slice(0, 3)

const container = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.16,
    },
  },
}

const card = {
  hidden: { opacity: 0, y: 32, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.18, 0.78, 0.24, 1] },
  },
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projectCases)[number] | null>(
    null,
  )

  return (
    <section id="projects" className="relative overflow-hidden py-20">
      <motion.img
        src={homeContent.projectBackground}
        alt=""
        aria-hidden
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 text-white">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200/80 bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-600">
                Case Studies
              </span>
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight text-white drop-shadow-[0_12px_35px_rgba(15,23,42,0.55)] sm:text-4xl">
                  Product builds stitched with realtime AI
                </h2>
                <p className="max-w-2xl text-sm text-white/85 drop-shadow-[0_10px_32px_rgba(15,23,42,0.45)] sm:text-base">
                  A curated look at platforms blending realtime collaboration, applied AI, and pragmatic
                  operations. Tap into the modal for architecture notes and live demos.
                </p>
              </div>
            </div>
            <Link
              to="/projects"
              className="inline-flex h-fit items-center justify-center rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50/70 hover:text-cyan-600"
            >
              Explore all projects
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -140px' }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {previewProjects.map((project, index) => (
            <motion.article
              key={project.slug}
              variants={card}
              className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_60px_rgba(15,41,67,0.14)]"
            >
              <div className="relative h-56 overflow-hidden sm:h-64">
                <motion.img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="h-full w-full object-cover transition-transform duration-[900ms]"
                  loading="lazy"
                  initial={{ scale: 1.05 }}
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>

              <div className="flex flex-1 flex-col gap-5 px-5 pb-6 pt-5 text-left">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-600">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                    {project.category}
                  </span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">{project.title}</h3>
                  <p className="text-sm text-slate-600">
                    {project.summary.length > 120 ? `${project.summary.slice(0, 120)}…` : project.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 pt-2 text-sm">
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-cyan-700 transition hover:border-cyan-200 hover:bg-cyan-100"
                      whileHover={{ scale: 1.03 }}
                    >
                      <ExternalLink className="h-4 w-4" /> Demo
                    </motion.a>
                  )}
                  {project.repo && (
                    <motion.a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                      whileHover={{ scale: 1.03 }}
                    >
                      <Github className="h-4 w-4" /> Source
                    </motion.a>
                  )}
                  <motion.button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-[0_16px_38px_rgba(79,209,197,0.35)] transition hover:-translate-y-0.5"
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setSelectedProject(project)}
                  >
                    Read More
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
          className="flex flex-col items-start gap-4 rounded-[32px] border border-cyan-100 bg-gradient-to-r from-cyan-50/90 via-white/95 to-sky-50/90 px-6 py-7 text-slate-700 shadow-[0_24px_60px_rgba(15,41,67,0.12)] md:flex-row md:items-center md:justify-between md:px-10"
        >
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900 md:text-xl">Looking for the deep dive?</h3>
            <p className="max-w-xl text-sm text-slate-600 md:text-base">
              Case studies include diagrams, evaluation dashboards, and measurable outcomes from discovery
              through roll-out.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 px-7 py-3 text-sm font-semibold text-slate-900 shadow-[0_18px_48px_rgba(79,209,197,0.35)] transition hover:-translate-y-0.5"
          >
            View case studies
          </Link>
        </motion.div>
      </div>

      <Modal open={Boolean(selectedProject)} onClose={() => setSelectedProject(null)} title={selectedProject?.title}>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-start"
          >
            <div className="space-y-5 text-slate-700">
              <p className="text-sm leading-relaxed md:text-base">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-100"
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
                {selectedProject.repo && (
                  <a
                    href={selectedProject.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                  >
                    <Github className="h-4 w-4" /> Source
                  </a>
                )}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
              className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50"
            >
              <img
                src={selectedProject.image}
                alt={`${selectedProject.title} preview`}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </Modal>
    </section>
  )
}
