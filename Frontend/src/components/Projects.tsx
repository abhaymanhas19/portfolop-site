import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, Github } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'
import Modal from './Modal'
import TiltCard from './TiltCard'
import FloatingAccents from './FloatingAccents'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
    },
  },
}

const card = {
  hidden: { opacity: 0, y: 44, rotateX: 4, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Projects() {
  const { projects } = usePortfolio()
  const projectCases = projects.featured
  const previewProjects = projectCases.slice(0, 3)
  
  const [selectedProject, setSelectedProject] = useState<(typeof projectCases)[number] | null>(
    null,
  )

  return (
    <section id="projects" className="relative overflow-hidden bg-surface-container-low py-ds-16 section-depth">
      <FloatingAccents />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <span className="tag-pill">Case Studies</span>
              <div className="space-y-2">
                <h2 className="font-display text-display-md font-semibold tracking-tight text-[#2a3439]">
                  Projects builds stitched with realtime AI
                </h2>
                <p className="max-w-2xl text-body-lg text-[#565e74]">
                  A curated look at platforms blending realtime collaboration, applied AI, and pragmatic
                  operations. Tap into the modal for architecture notes and live demos.
                </p>
              </div>
            </div>
            <Link to="/projects" className="btn-secondary">
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
            <TiltCard key={project.slug} maxTilt={6}>
            <motion.article
              variants={card}
              className="relative flex h-full flex-col rounded-card bg-surface-container-lowest shadow-ambient"
            >
              {/* Image — own overflow-hidden so clip stays within image area only */}
              <div className="relative h-56 overflow-hidden rounded-t-card sm:h-64">
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
                  <span className="tag-pill px-3 py-1 text-[11px] tracking-[0.3em]">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#565e74]/60">
                    {project.category}
                  </span>
                </div>
                <div className="space-y-3">
                  <h3 className="font-display text-xl font-semibold text-[#2a3439] sm:text-2xl">{project.title}</h3>
                  <p className="text-sm text-[#565e74]">
                    {project.summary.length > 120 ? `${project.summary.slice(0, 120)}…` : project.summary}
                  </p>
                </div>
                {/* Button row — plain elements so CSS hover is never blocked by FM transforms */}
                <div className="relative z-10 flex flex-wrap gap-3 pt-2 text-sm">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary px-4 py-2 text-sm"
                    >
                      <ExternalLink className="h-4 w-4" /> Demo
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary px-4 py- 2 text-sm"
                    >
                      <Github className="h-4 w-4" /> Source
                    </a>
                  )}
                  <button
                    type="button"
                    className="btn-primary px-4 py-2 text-sm"
                    onClick={() => setSelectedProject(project)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </motion.article>
            </TiltCard>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
          className="flex flex-col items-start gap-4 rounded-card bg-surface-container-lowest px-6 py-7 shadow-ambient md:flex-row md:items-center md:justify-between md:px-10"
        >
          <div className="space-y-2">
            <h3 className="font-display text-lg font-semibold text-[#2a3439] md:text-xl">Looking for the deep dive?</h3>
            <p className="max-w-xl text-sm text-[#565e74] md:text-base">
              Case studies include diagrams, evaluation dashboards, and measurable outcomes from discovery
              through roll-out.
            </p>
          </div>
          <Link to="/projects" className="btn-primary px-7 py-3 text-sm">
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
            <div className="space-y-5 text-[#565e74]">
              <p className="text-sm leading-relaxed md:text-base">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-container-low px-3 py-1 text-xs font-medium text-[#565e74]"
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
                    className="btn-secondary px-4 py-2 text-sm"
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
                {selectedProject.repo && (
                  <a
                    href={selectedProject.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary px-4 py-2 text-sm"
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
              className="overflow-hidden rounded-card bg-surface-container-low"
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
