import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TiltCard from '../components/TiltCard'
import { projects } from '../data/projects'
import { ArrowLeft, ArrowRight, ExternalLink, Github, Image as ImageIcon, Sparkles } from 'lucide-react'

export default function ProjectsDetail() {
  return (
    <div className="relative isolate overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-10 left-[-10%] h-72 w-72 rounded-full bg-[#ff5a1c2b] blur-[110px]" aria-hidden />
        <div className="absolute bottom-[-20%] right-[-5%] h-96 w-96 rounded-full bg-[#ff5a1c1f] blur-[160px]" aria-hidden />
      </div>

      <section className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-4 max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
              <Sparkles className="h-3.5 w-3.5 text-[#ff5a1c]" /> Case studies
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Projects that blend AI systems with production-grade engineering.
            </h1>
            <p className="text-base md:text-lg text-white/70">
              Each engagement pairs experimentation with measurable impact—from cost-aware LLM routing to resilient realtime backends and observability-rich operations.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/60 hover:bg-white/10 transition"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
            </Link>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#FF6B35] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_12px_34px_rgba(255,90,28,0.5)] hover:shadow-[0_16px_42px_rgba(255,90,28,0.55)] transition"
            >
              Discuss a project <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.2, duration: 0.55 }}
            >
              <TiltCard className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/80 via-[#151515] to-black/70">
                <div className="relative group">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  ) : (
                    <div className="aspect-[16/9] w-full bg-[#1e1e22] grid place-items-center text-white/60">
                      <ImageIcon className="h-10 w-10" />
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" aria-hidden />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white">{project.title}</h2>
                      <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#ff5a1c33] bg-[#1f1f22] px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-3 text-sm font-medium text-white/80">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 hover:border-white/50 hover:bg-white/10 transition"
                      >
                        <ExternalLink className="h-4 w-4" /> Live Demo
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 hover:border-white/50 hover:bg-white/10 transition"
                      >
                        <Github className="h-4 w-4" /> Source
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-black/70 via-[#19191c] to-black/70 p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-2xl font-semibold text-white">Have a challenge in mind?</h2>
              <p className="text-sm md:text-base text-white/70">
                I help teams ship responsible AI and backend systems—whether you need a proof-of-concept, a scaling partner, or a production launch. Let’s start the conversation.
              </p>
            </div>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#FF6B35] px-6 py-3 text-base font-semibold text-black shadow-[0_12px_36px_rgba(255,90,28,0.5)] hover:shadow-[0_18px_44px_rgba(255,90,28,0.6)] transition"
            >
              Book a call
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
