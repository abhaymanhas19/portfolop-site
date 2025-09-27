import { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Download, ExternalLink, Mail, MapPin } from 'lucide-react'
import { site } from '../data/site'

function usePdfWorker() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let active = true
    import('pdfjs-dist/build/pdf.worker.min.js?url').then(worker => {
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
    <section className="relative mx-auto max-w-6xl px-4 py-20">
      <div className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-72 max-w-3xl rounded-full bg-[#ff5a1c26] blur-[140px]" aria-hidden />

      <div className="relative space-y-12">
        <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-background/85 via-[#151516] to-background/90 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
              Resume Snapshot
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              {site.NAME} · {site.ROLE}
            </h1>
            <p className="text-sm md:text-base text-white/70 max-w-xl">
              A closer look at my experience leading AI/ML initiatives, building resilient Python platforms, and shipping production-ready systems with measurable impact.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <MapPin className="h-4 w-4 text-[#ff5a1c]" /> {site.LOCATION}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <Mail className="h-4 w-4 text-[#ff5a1c]" /> {site.CONTACT_EMAIL}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={site.RESUME_PDF_PATH}
              download
              className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_12px_28px_rgba(255,90,28,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(255,90,28,0.55)]"
            >
              <Download className="h-4 w-4" /> Download PDF
            </a>
            <a
              href={site.RESUME_PDF_PATH}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
            >
              <ExternalLink className="h-4 w-4" /> Open in new tab
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
            >
              <Mail className="h-4 w-4" /> Hire me
            </a>
          </div>
        </header>

        <div className="rounded-3xl border border-white/10 bg-surface/80 p-4 md:p-6">
          {!ready && !error && (
            <div className="grid place-items-center rounded-2xl border border-white/10 bg-[#111]/70 p-10 text-sm text-white/70">
              Loading resume…
            </div>
          )}

          {error && (
            <div className="grid gap-3 rounded-2xl border border-[#ff5a1c33] bg-[#1f1f22]/90 p-8 text-sm text-white/70">
              <p className="font-semibold text-white">
                We couldn’t load the PDF viewer in this browser.
              </p>
              <p>
                Please use the download button above or open the resume in a new tab. If the issue persists, email me for a copy.
              </p>
              <a href={`mailto:${site.CONTACT_EMAIL}`} className="inline-flex items-center gap-2 text-[#ff5a1c]">
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
                  className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
                />
              ))}
            </Document>
          )}
        </div>

        <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-[#111]/70 p-8 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl">
            Need a tailored resume or portfolio for a specific role? I’m happy to highlight relevant experience in more detail—just let me know what you’re hiring for.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_12px_28px_rgba(255,90,28,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(255,90,28,0.55)]"
          >
            Start a conversation
          </a>
        </div>
      </div>
    </section>
  )
}
