import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Award, ArrowRight } from 'lucide-react'
import { profile } from '../data/profile'

export default function CertificationsPreview() {
  const previewCerts = profile.certifications.slice(0, 3)

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
            <Award className="h-3.5 w-3.5 text-[#ff5a1c]" /> Proof of expertise
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Certifications that keep skills sharp
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
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
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/50 hover:bg-white/10 transition"
          >
            View all credentials <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {previewCerts.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="rounded-2xl border border-white/10 bg-[#111]/70 p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{cert.title}</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60 mt-2">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Award className="h-4 w-4 text-[#ff5a1c]" />
              </span>
            </div>
            <p className="mt-3 text-sm text-white/70 leading-relaxed line-clamp-4">{cert.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
