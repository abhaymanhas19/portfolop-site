import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Workflow, ExternalLink } from 'lucide-react'
import { aboutContent } from '../data/content'

export default function AboutPreview() {
  return (
    <section className="relative overflow-hidden bg-surface py-ds-16">
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <section className="mt-6 space-y-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-container-low">
              <Workflow className="h-5 w-5 text-[#005bc4]" />
            </span>
            <h2 className="font-display text-headline-lg font-semibold text-[#2a3439]">Experiences Snapchots</h2>
          </div>
          <Link to="/about" className="btn-secondary">
            Dive into the story <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="grid gap-6 md:grid-cols-2">
            {aboutContent.experience.map(experience => (
              <div
                key={experience.company}
                className="rounded-card bg-surface-container-lowest p-6 shadow-ambient"
              >
                <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.26em] text-[#565e74]/60">
                  <span>{experience.company}</span>
                  <span>{experience.period}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-[#2a3439]">{experience.role}</h3>
                <p className="mt-2 text-sm text-[#565e74]">{experience.summary}</p>
                <ul className="mt-4 space-y-2 text-sm text-[#565e74]">
                  {experience.achievements.map(point => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#005bc4]/30" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {experience.link && (
                  <a
                    href={experience.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary mt-5 inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm"
                  >
                    Visit site <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="rounded-card bg-surface-container-lowest px-6 py-7 shadow-ambient md:px-10"
        >
          <p className="text-sm text-[#565e74] md:text-base">
            Curious about the delivery principles, day-to-day rituals, or how the playbook scales across teams?
            Hop over to the about page for experience snapshots and values.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link to="/about" className="btn-primary px-5 py-2 text-sm">
              Read the full story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
