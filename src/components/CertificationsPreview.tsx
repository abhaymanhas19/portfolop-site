import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Award, ArrowRight } from 'lucide-react'
import { profile } from '../data/profile'
import MagicBento, { type MagicBentoItem } from './MagicBento'

export default function CertificationsPreview() {
  const previewCerts = profile.certifications.slice(0, 3)

  const items: MagicBentoItem[] = previewCerts.map(cert => ({
    id: cert.title,
    icon: <Award className="h-5 w-5 text-[#FF6B35]" />,
    badge: 'Proof of expertise',
    title: cert.title,
    description: cert.description,
    meta: `${cert.issuer} · ${cert.year}`,
    accent: 'from-[#FF6B35]/20 via-[#1c1a22]/60 to-transparent',
    footer:
      cert.tags && cert.tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {cert.tags.map(tag => (
            <span
              key={tag}
              className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/75"
            >
              {tag}
            </span>
          ))}
        </div>
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
                <ArrowRight className="h-4 w-4" /> View credential
              </a>
            ))}
          </div>
        )}
      </div>
    ),
  }))

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60">
            <Award className="h-3.5 w-3.5 text-[#FF6B35]" /> Proof of expertise
          </span>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Certifications that keep skills sharp
          </h2>
          <p className="max-w-2xl text-sm text-white/70 md:text-base">
            Highlights from the credential stack backing every project—from Azure AI implementations to modern Kubernetes delivery.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link
            to="/certifications"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
          >
            View all credentials <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      <div className="mt-10">
        <MagicBento items={items} columnsClassName="md:grid-cols-3" />
      </div>
    </section>
  )
}
