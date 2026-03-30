import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Document, Page, pdfjs } from 'react-pdf'
import { Download, ExternalLink, Mail, MapPin } from 'lucide-react'
import VantaRingsBackground from '../components/VantaRingsBackground'
import { site } from '../data/site'

function usePdfWorker() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let active = true
    import('pdfjs-dist/build/pdf.worker.min.mjs?url').then(worker => {
      if (!active) return
      pdfjs.GlobalWorkerOptions.workerSrc = worker.default
      setReady(true)
    })
    return () => {
      active = false
    }
  }, [])
  return ready
}

export default function Resume() {
  const ready = usePdfWorker()
  const [numPages, setNumPages] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

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
            className="relative h-[min(55vh,460px)] w-full md:h-[460px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          >
            <VantaRingsBackground />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="absolute inset-0 flex items-end"
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-12 pt-24 text-white md:px-6 lg:px-8">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-blue-200">
                  Resume Snapshot
                </span>
                <h1 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
                  {site.NAME} · {site.ROLE}
                </h1>
                <p className="max-w-2xl text-sm text-white/85 md:text-base">
                  Highlights from shipping AI-led platforms, resilient Python systems, and observability-first operations across industries.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-[#2a3439] shadow-ambient-sm">
                  <MapPin className="h-4 w-4 text-[#005bc4]" /> {site.LOCATION}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-[#2a3439] shadow-ambient-sm">
                  <Mail className="h-4 w-4 text-[#005bc4]" /> {site.CONTACT_EMAIL}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-8 md:px-6 lg:px-8">
        <div className="flex flex-col gap-3 text-sm text-[#565e74] md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-body-lg text-[#565e74]">
            A closer look at experience leading AI/ML initiatives, building resilient Python platforms, and shipping production-ready systems with measurable impact.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-lowest px-3 py-1 shadow-ambient-sm">
              <MapPin className="h-4 w-4 text-[#005bc4]" /> {site.LOCATION}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-lowest px-3 py-1 shadow-ambient-sm">
              <Mail className="h-4 w-4 text-[#005bc4]" /> {site.CONTACT_EMAIL}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={site.RESUME_PDF_PATH}
            download
            className="btn-primary px-5 py-2.5 text-sm"
          >
            <Download className="h-4 w-4" /> Download PDF
          </a>
          <a
            href={site.RESUME_PDF_PATH}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary px-5 py-2.5 text-sm"
          >
            <ExternalLink className="h-4 w-4" /> Open in new tab
          </a>
          <a
            href="/#contact"
            className="btn-secondary px-5 py-2.5 text-sm"
          >
            <Mail className="h-4 w-4" /> Hire me
          </a>
        </div>

        <div className="mt-10 rounded-card bg-surface-container-lowest p-4 shadow-ambient md:p-6">
          {!ready && !error && (
            <div className="grid place-items-center rounded-2xl bg-surface-container-low p-10 text-sm text-[#565e74]">
              Loading resume…
            </div>
          )}

          {error && (
            <div className="grid gap-3 rounded-2xl bg-red-50/80 p-8 text-sm text-red-600">
              <p className="font-semibold text-red-700">We couldn't load the PDF viewer in this browser.</p>
              <p>
                Please use the download button above or open the resume in a new tab. If the issue persists, email me for a copy.
              </p>
              <a href={`mailto:${site.CONTACT_EMAIL}`} className="inline-flex items-center gap-2 text-red-600">
                <Mail className="h-4 w-4" /> {site.CONTACT_EMAIL}
              </a>
            </div>
          )}

          {ready && !error && (
            <Document
              file={site.RESUME_PDF_PATH}
              onLoadSuccess={({ numPages: pages }) => setNumPages(pages)}
              onLoadError={() => setError('PDF failed to load')}
              className="flex flex-col items-center gap-6"
              loading=""
            >
              {Array.from({ length: numPages }, (_, i) => (
                <Page
                  key={i}
                  pageNumber={i + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-ambient"
                />
              ))}
            </Document>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-card bg-surface-container-lowest px-6 py-7 text-sm text-[#565e74] shadow-ambient md:flex-row md:items-center md:justify-between md:px-10">
          <p className="max-w-3xl">
            Need a tailored resume or portfolio for a specific role? I'm happy to highlight relevant experience in more detail—just let me know what you're hiring for.
          </p>
          <a href="/#contact" className="btn-primary px-5 py-2.5 text-sm">
            Start a conversation
          </a>
        </div>
      </section>
    </div>
  )
}
