import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Award, ArrowRight, ExternalLink, Sparkles } from 'lucide-react'
import { profile } from '../data/profile'

export default function Certifications() {
  const { certifications } = profile
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 max-w-4xl -translate-y-1/2 rounded-full bg-[#ff5a1c1f] blur-[150px] mx-auto" aria-hidden />

      <div className="relative space-y-12">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-black/85 via-[#141415] to-black/90 p-8 md:p-12"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4 max-w-3xl">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
                <Sparkles className="h-3.5 w-3.5 text-[#ff5a1c]" /> Staying current
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                Certifications that back the delivery.
              </h1>
              <p className="text-base md:text-lg text-white/70">
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

        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <motion.article
              key={cert.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="rounded-3xl border border-white/10 bg-[#101014]/90 p-6 md:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white">{cert.title}</h2>
                  <p className="text-sm text-white/60">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Award className="h-5 w-5 text-[#ff5a1c]" />
                </span>
              </div>

              <p className="mt-4 text-sm text-white/70 leading-relaxed">{cert.description}</p>

              {cert.tags && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {cert.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#ff5a1c33] bg-[#1f1f22] px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {cert.credentialUrl && cert.credentialUrl.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {cert.credentialUrl.map((url, idx) => (
                    <a
                      key={url || idx}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff5a1c] hover:text-[#ff7b4d]"
                    >
                      <ExternalLink className="h-4 w-4" /> View credential
                    </a>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
