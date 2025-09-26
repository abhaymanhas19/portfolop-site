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
    chips: cert.tags,
    accent: 'from-[#FF6B35]/20 via-[#1c1a22]/60 to-transparent',
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
          <Link
            to="/certifications"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.25em] text-white/70 transition hover:border-white/30 hover:bg-white/12"
          >
            <Award className="h-3.5 w-3.5 text-[#FF6B35]" /> Achievements
          </Link>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Achievements that keep skills sharp
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
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10 whitespace-nowrap"
          >
            View all achievements <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      <div className="mt-10">
        <MagicBento items={items} columnsClassName="md:grid-cols-3" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="mt-12 flex flex-col gap-4 rounded-[32px] border border-white/10 bg-gradient-to-r from-[#15121e]/85 via-[#14101e]/78 to-[#110c1a]/85 p-6 shadow-[0_24px_60px_rgba(7,5,12,0.4)] backdrop-blur md:flex-row md:items-center md:justify-between md:px-10 md:py-8"
      >
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg font-semibold text-white md:text-xl">Want the full achievement roster?</h3>
          <p className="max-w-xl text-sm text-white/70 md:text-base">
            Browse every certification, award, and credential powering delivery across AI, data, and platform engineering.
          </p>
        </div>
        <Link
          to="/certifications"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B35] via-[#FF7A35] to-[#FF4D35] px-7 py-3 text-sm font-semibold text-[#1a0b05] shadow-[0_18px_45px_rgba(255,107,53,0.45)] transition hover:shadow-[0_22px_55px_rgba(255,107,53,0.55)] whitespace-nowrap"
        >
          View all achievements
        </Link>
      </motion.div>
    </section>
  )
}
