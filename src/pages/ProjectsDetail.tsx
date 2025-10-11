import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink, Github, Sparkles, MapPin } from 'lucide-react'
import { projectCases, homeContent } from '../data/content'
import Modal from '../components/Modal'

const card = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function ProjectsDetail() {
  const [selectedProject, setSelectedProject] = useState<(typeof projectCases)[number] | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const state = location.state as { projectSlug?: string } | undefined
    if (state?.projectSlug) {
      const project = projectCases.find(item => item.slug === state.projectSlug)
      if (project) {
        setSelectedProject(project)
      }
      navigate(location.pathname, { replace: true })
    }
  }, [location.state, location.pathname, navigate])

  return (
    <div className="bg-white text-slate-700">
      <section className="border-b border-slate-200/70 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative w-full overflow-hidden"
        >
          <motion.img
            src={homeContent.projectBackground}
            alt="Featured project montage"
            className="block h-[min(60vh,520px)] w-full object-cover md:h-[520px]"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
            className="absolute inset-0 flex items-end"
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-12 pt-24 text-white md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
              <div className="max-w-3xl space-y-4">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#8ED9FF]">
                  <Sparkles className="h-3.5 w-3.5" /> Case Studies
                </span>
                <h1 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
                  Projects that blend AI systems with production-grade engineering
                </h1>
                <p className="text-sm text-white/85 md:text-base">
                  Front-line experiments with realtime systems, grounded AI, and platform reliability—all broken down
                  with the guardrails they shipped with.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link to="/" className="btn-secondary-invert px-5 py-2.5 text-sm">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
                </Link>
                <Link to="/#contact" className="btn-primary px-5 py-2.5 text-sm">
                  Discuss a project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-16 md:px-6 lg:px-8">
        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -160px 0px' }}
        >
          {projectCases.map((project, index) => (
            <motion.article
              key={project.slug}
              variants={card}
              className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white/90 shadow-[0_32px_80px_rgba(15,41,67,0.16)] backdrop-blur"
            >
              <div className="relative h-56 overflow-hidden sm:h-64">
                <motion.img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  initial={{ scale: 1.06 }}
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>

              <div className="flex flex-1 flex-col gap-5 px-6 pb-7 pt-6 text-left">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-slate-400">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-soft-accent0" />
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <span>{project.category}</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">{project.title}</h3>
                  <p className="text-sm text-slate-600 sm:text-base">
                    {project.summary.length > 140 ? `${project.summary.slice(0, 140)}…` : project.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 pt-2 text-sm">
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#8ED9FF]/45 bg-soft-accent px-4 py-2 text-[#1F2A37] transition hover:border-[#8ED9FF]/60 hover:bg-soft-accent"
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
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-4 py-2 text-sm font-semibold text-slate-900 shadow-[0_16px_38px_rgba(79,209,197,0.35)] transition hover:-translate-y-0.5"
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setSelectedProject(project)}
                  >
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400">
                  <MapPin className="h-3.5 w-3.5" /> {project.category}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <Modal open={Boolean(selectedProject)} onClose={() => setSelectedProject(null)} title={selectedProject?.title}>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-start"
          >
            <div className="space-y-5 text-slate-600">
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
                    className="inline-flex items-center gap-2 rounded-full border border-[#8ED9FF]/60 bg-soft-accent px-4 py-2 text-[#1F2A37] transition hover:border-[#8ED9FF]/70 hover:bg-soft-accent"
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
    </div>
  )
}
