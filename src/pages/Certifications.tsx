import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Award, ArrowRight, ExternalLink, Sparkles } from 'lucide-react'
import { profile } from '../data/profile'
import MagicBento, { type MagicBentoItem } from '../components/MagicBento'

export default function Certifications() {
  const { certifications } = profile

  const items: MagicBentoItem[] = certifications.map(cert => ({
    id: cert.title,
    icon: <Award className="h-5 w-5 text-[#FF6B35]" />,
    badge: cert.issuer,
    meta: cert.year,
    title: cert.title,
    description: cert.description,
    chips: cert.tags,
    accent: 'from-[#FF6B35]/20 via-[#1d1c22]/60 to-transparent',
    actions:
      cert.credentialUrl && cert.credentialUrl.length > 0 ? (
        cert.credentialUrl.map((url, idx) => (
          <a
            key={url || idx}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white/85 transition hover:border-white/50 hover:bg-white/10"
          >
            <ExternalLink className="h-4 w-4" /> View credential
          </a>
        ))
      ) : undefined,
    modalContent: (
      <div className="space-y-5">
        <p className="text-sm leading-relaxed text-white/75 md:text-base">{cert.description}</p>
        {cert.tags && cert.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {cert.tags.map(tag => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {cert.credentialUrl && cert.credentialUrl.length > 0 && (
          <div className="flex flex-wrap gap-3 text-sm">
            {cert.credentialUrl.map((url, idx) => (
              <a
                key={url || idx}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white/85 transition hover:border-white/50 hover:bg-white/10"
              >
                <ExternalLink className="h-4 w-4" /> View credential
              </a>
            ))}
          </div>
        )}
      </div>
    ),
  }))

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-64 max-w-4xl -translate-y-1/2 rounded-full bg-[#FF6B35]/20 blur-[150px]" aria-hidden />

      <div className="relative space-y-12">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-black/85 via-[#141415] to-black/90 p-8 md:p-12"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
                <Sparkles className="h-3.5 w-3.5 text-[#FF6B35]" /> Staying current
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                Certifications that back the delivery.
              </h1>
              <p className="text-base text-white/70 md:text-lg">
                Each certification reflects the tooling and practices I rely on for client engagements—from Azure AI workloads to Kubernetes rollouts and practical deep learning.
              </p>
            </div>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
            >
              Discuss a training plan <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.header>

        <MagicBento items={items} columnsClassName="md:grid-cols-2" motionFrom={{ opacity: 0, y: 32 }} />
      </div>
    </section>
  )
}
