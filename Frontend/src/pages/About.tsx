import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Target, Workflow, Heart, ExternalLink } from 'lucide-react'
import MagicBento from '../components/MagicBento'
import VantaRingsBackground from '../components/VantaRingsBackground'
import { aboutContent, galleryContent } from '../data/content'
import { site } from '../data/site'

export default function About() {
  const focusItems = aboutContent.tiles.map((tile, index) => ({
    id: tile.title,
    badge: 'Focus area',
    title: tile.title,
    description: tile.description,
    accent: index % 2 === 0 ? 'from-blue-50/70 via-transparent to-transparent' : 'from-sky-50/70 via-transparent to-transparent',
  }))

  return (
    <div className="bg-surface font-body">
      <section className="bg-surface-container-low">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative w-full overflow-hidden"
        >
          <motion.div
            className="relative h-[min(60vh,520px)] w-full md:h-[520px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          >
            <VantaRingsBackground />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="absolute inset-0 flex items-end"
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-12 pt-24 text-white md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
              <div className="max-w-3xl space-y-4">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-blue-200">
                  <Sparkles className="h-3.5 w-3.5" /> About {aboutContent.headline.split(' ')[0]}
                </span>
                <h1 className="font-display text-3xl font-semibold leading-tight md:text-5xl">{aboutContent.headline}</h1>
                <p className="text-sm text-white/85 md:text-base">{aboutContent.intro}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link to="/resume" className="btn-ghost px-5 py-2.5 text-sm">
                  View resume <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/#contact" className="btn-primary px-5 py-2.5 text-sm">
                  Start a project
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-8 md:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          className="mt-10 rounded-card bg-surface-container-lowest px-6 py-10 shadow-ambient md:px-10"
        >
          <div className="grid gap-8 md:grid-cols-[1.25fr,0.85fr] md:items-center">
            <div className="space-y-4">
              <span className="tag-pill">
                {aboutContent.profile.tag}
              </span>
              <h2 className="font-display text-display-md font-semibold text-[#2a3439]">
                {aboutContent.profile.heading}
              </h2>
              <p className="text-body-lg text-[#565e74]">
                {aboutContent.profile.summary}
              </p>
              <p className="text-body-lg text-[#565e74]">
                {aboutContent.profile.ending}
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <a
                href={site.RESUME_PDF_PATH}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary px-6 py-3 text-sm"
              >
                View My Full Resume <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="https://www.linkedin.com/in/abhaymanhas19"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#005bc4] transition hover:text-[#004fad]"
              >
                Connect on LinkedIn <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="mt-10 rounded-card bg-surface-container-lowest px-6 py-10 shadow-ambient md:px-10"
        >
          <MagicBento items={focusItems} columnsClassName="md:grid-cols-3" />
        </motion.div>

        <section className="mt-ds-16 space-y-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-container-low">
              <Workflow className="h-5 w-5 text-[#005bc4]" />
            </span>
            <h2 className="font-display text-headline-lg font-semibold text-[#2a3439]">Experience snapshots</h2>
          </div>
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

        <section className="mt-ds-16 space-y-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-container-low">
              <Target className="h-5 w-5 text-[#005bc4]" />
            </span>
            <h2 className="font-display text-headline-lg font-semibold text-[#2a3439]">Working principles</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {aboutContent.values.map(value => (
              <div
                key={value.title}
                className="rounded-card bg-surface-container-lowest p-6 shadow-ambient"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-container-low text-[#005bc4]">
                  <Heart className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-[#2a3439]">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#565e74]">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-ds-16 overflow-hidden rounded-card bg-surface-container-lowest shadow-ambient">
          <div className="grid gap-6 px-6 py-10 md:grid-cols-[1.1fr,1fr] md:px-10">
            <div className="space-y-4">
              <h2 className="font-display text-headline-lg font-semibold text-[#2a3439]">Away from the screen</h2>
              <p className="text-body-lg text-[#565e74]">
                Weekend hikes, sunrise coffee rituals, and candid moments with the people who keep me grounded fuel the energy I bring to complex delivery.
              </p>
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#005bc4] hover:text-[#004fad]"
              >
                Read the study blogs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <motion.div
              className="relative h-64 rounded-card bg-surface-container-low"
              initial={{ opacity: 0.85 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <img
                src={galleryContent.images[0]?.src}
                alt="Gallery highlight"
                className="h-full w-full rounded-card object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </section>
      </section>
    </div>
  )
}
