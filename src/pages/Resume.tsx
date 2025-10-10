import { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Download, ExternalLink, Mail, MapPin } from 'lucide-react'
import { site } from '../data/site'
import { homeContent } from '../data/content'

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
    <div className="bg-white text-slate-700">
      <section className="relative flex min-h-[300px] items-end">
        <img
          src={homeContent.projectBackground}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/96 via-white/92 to-[#ECF7FF]/88" aria-hidden />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 pb-12 pt-24 md:px-6 lg:px-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cyan-500">
              Resume Snapshot
            </span>
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              {site.NAME} · {site.ROLE}
            </h1>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-8 md:px-6 lg:px-8">
        <div className="flex flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-slate-600 md:text-base">
            A closer look at experience leading AI/ML initiatives, building resilient Python platforms, and shipping production-ready systems with measurable impact.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
              <MapPin className="h-4 w-4 text-cyan-500" /> {site.LOCATION}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
              <Mail className="h-4 w-4 text-cyan-500" /> {site.CONTACT_EMAIL}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={site.RESUME_PDF_PATH}
            download
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_18px_40px_rgba(79,209,197,0.35)] transition hover:-translate-y-0.5"
          >
            <Download className="h-4 w-4" /> Download PDF
          </a>
          <a
            href={site.RESUME_PDF_PATH}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50/70 hover:text-cyan-600"
          >
            <ExternalLink className="h-4 w-4" /> Open in new tab
          </a>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50/70 hover:text-cyan-600"
          >
            <Mail className="h-4 w-4" /> Hire me
          </a>
        </div>

        <div className="mt-10 rounded-[32px] border border-cyan-100 bg-white/92 p-4 shadow-[0_28px_80px_rgba(15,41,67,0.16)] md:p-6">
          {!ready && !error && (
            <div className="grid place-items-center rounded-[24px] border border-cyan-100 bg-cyan-50/60 p-10 text-sm text-slate-500">
              Loading resume…
            </div>
          )}

          {error && (
            <div className="grid gap-3 rounded-[24px] border border-rose-200 bg-rose-50/80 p-8 text-sm text-rose-600">
              <p className="font-semibold text-rose-700">We couldn’t load the PDF viewer in this browser.</p>
              <p>
                Please use the download button above or open the resume in a new tab. If the issue persists, email me for a copy.
              </p>
              <a href={`mailto:${site.CONTACT_EMAIL}`} className="inline-flex items-center gap-2 text-rose-600">
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
                  className="w-full max-w-4xl overflow-hidden rounded-[24px] border border-slate-200 shadow-[0_24px_60px_rgba(15,41,67,0.16)]"
                />
              ))}
            </Document>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-[32px] border border-cyan-100 bg-gradient-to-r from-cyan-50/90 via-white/95 to-sky-50/90 px-6 py-7 text-sm text-slate-600 shadow-[0_24px_60px_rgba(15,41,67,0.12)] md:flex-row md:items-center md:justify-between md:px-10">
          <p className="max-w-3xl">
            Need a tailored resume or portfolio for a specific role? I’m happy to highlight relevant experience in more detail—just let me know what you’re hiring for.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_18px_40px_rgba(79,209,197,0.35)] transition hover:-translate-y-0.5"
          >
            Start a conversation
          </a>
        </div>
      </section>
    </div>
  )
}
