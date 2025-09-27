import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects, type Project } from '../data/projects'
import { ExternalLink, Github, Image as ImageIcon } from 'lucide-react'
import Modal from './Modal'

const containerVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.14,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28, rotateX: -10 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 18,
    },
  },
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="relative overflow-hidden bg-background py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-1/4 left-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[#FF6B35]/30 blur-[140px]" />
        <div className="absolute bottom-1/4 left-0 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[130px]" />
        <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 rounded-full bg-purple-500/25 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <motion.div
          className="flex flex-col gap-4 text-white"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <Link
            to="/projects"
            className="inline-flex w-fit items-center rounded-full border border-white/12 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/30 hover:bg-white/12"
          >
            Project Gallery
          </Link>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Shipping intelligent products end-to-end
              </h2>
              <p className="max-w-2xl text-sm text-white/70 sm:text-base">
                A rotating view of builds that blend ML, data platforms, and thoughtful DX. Each card links to deeper case studies and live experiences.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex h-fit items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
            >
              Explore all projects
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -150px 0px' }}
        >
          {projects.map((project, index) => {
            const previewText =
              project.description.length > 100
                ? `${project.description.slice(0, 100)}…`
                : project.description
            const displayTags = project.tags.slice(0, 3)
            const extraTagCount = project.tags.length - displayTags.length

            return (
              <motion.article
                key={project.title}
                variants={cardVariants}
                whileHover={{ scale: 1.015 }}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedProject(project)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setSelectedProject(project)
                  }
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
              <div className="relative overflow-hidden">
                {project.image ? (
                  <motion.img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="h-56 w-full object-cover transition duration-700 sm:h-64"
                    loading="lazy"
                    initial={{ scale: 1.08 }}
                    whileHover={{ scale: 1.16 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                ) : (
                  <div className="grid h-56 w-full place-items-center bg-gradient-to-br from-[#FF6B35]/30 via-background to-background text-white/50 sm:h-64">
                    <ImageIcon className="h-10 w-10" />
                  </div>
                )}

                <motion.div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/25 to-transparent"
                  animate={{ opacity: [0.5, 0.75, 0.5] }}
                  transition={{ duration: 7 + index, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  aria-hidden
                  className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-white/25 blur-3xl opacity-0 transition duration-700 group-hover:opacity-60"
                />
              </div>

              <div className="space-y-4 px-5 pb-6 pt-5 text-white">
                <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.3em] text-white/60">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-[#FF6B35]" />
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <span className="text-white/40">Case Study</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold sm:text-2xl">{project.title}</h3>
                  <p className="text-sm text-white/70 sm:text-base">{previewText}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {displayTags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                  {extraTagCount > 0 ? (
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-white/50">
                      +{extraTagCount}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-3 pt-2 text-sm">
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white/85 transition hover:border-white/50 hover:bg-white/10"
                      whileHover={{ scale: 1.03 }}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </motion.a>
                  )}
                  {project.repo && (
                    <motion.a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white/85 transition hover:border-white/50 hover:bg-white/10"
                      whileHover={{ scale: 1.03 }}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Github className="h-4 w-4" /> Source
                    </motion.a>
                  )}
                </div>
              </div>

              <motion.div
                aria-hidden
                className="absolute inset-0 border border-transparent"
                whileHover={{ borderColor: 'rgba(255, 255, 255, 0.18)' }}
              />

              <motion.div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
              </motion.article>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
          className="flex flex-col items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur-sm md:flex-row md:items-center md:justify-between"
        >
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Need the deep dive?</h3>
            <p className="text-sm text-white/70">
              Explore architecture diagrams, ops notes, and measurable outcomes for each delivery.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center rounded-full bg-[#FF6B35] px-6 py-3 text-sm font-semibold text-black shadow-[0_10px_28px_rgba(255,90,28,0.45)] transition hover:shadow-[0_14px_34px_rgba(255,90,28,0.55)]"
          >
            View case studies
          </Link>
        </motion.div>
      </div>

      <Modal
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
      >
        {selectedProject ? (
          <>
            <p className="text-sm leading-relaxed text-white/75 sm:text-base">
              {selectedProject.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map(tag => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-white/75"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2 text-sm">
              {selectedProject.demo && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white/85 transition hover:border-white/50 hover:bg-white/10"
                >
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </a>
              )}
              {selectedProject.repo && (
                <a
                  href={selectedProject.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white/85 transition hover:border-white/50 hover:bg-white/10"
                >
                  <Github className="h-4 w-4" /> Source
                </a>
              )}
            </div>
          </>
        ) : null}
      </Modal>
    </section>
  )
}
