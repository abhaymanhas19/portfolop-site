import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="grid min-h-[60vh] place-items-center px-4">
      <div className="rounded-[32px] border border-cyan-100 bg-white/90 px-8 py-10 text-center shadow-[0_24px_60px_rgba(15,41,67,0.12)]">
        <h1 className="text-5xl font-semibold text-slate-900">404</h1>
        <p className="mt-3 text-sm text-slate-600">
          The page you’re looking for doesn’t exist. Maybe explore the latest projects instead.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 px-5 py-2 text-sm font-semibold text-slate-900 shadow-[0_16px_40px_rgba(79,209,197,0.35)] transition hover:-translate-y-0.5"
        >
          Go Home
        </Link>
      </div>
    </section>
  )
}
