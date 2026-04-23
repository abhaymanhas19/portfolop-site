import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Workflow, ExternalLink } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'
import TiltCard from './TiltCard'

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

export default function AboutPreview() {
  const { about: aboutContent } = usePortfolio()

  return (
    <section className="relative overflow-hidden bg-surface py-ds-16 section-depth">
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
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -100px' }}
            className="grid gap-6 md:grid-cols-2"
          >
            {aboutContent.experience.map(experience => (
              <TiltCard key={experience.company} maxTilt={5}>
              <motion.div
                variants={cardVariants}
                className="rounded-card bg-surface-container-lowest p-6 shadow-ambient h-full"
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
                  <div className="relative z-10 mt-5">
                    <a
                      href={experience.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm"
                    >
                      Visit site <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </motion.div>
              </TiltCard>
            ))}
          </motion.div>
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
