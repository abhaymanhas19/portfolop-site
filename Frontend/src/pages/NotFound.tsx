import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="grid min-h-[60vh] place-items-center px-4 bg-surface">
      <div className="rounded-card bg-surface-container-lowest px-8 py-10 text-center shadow-ambient">
        <h1 className="font-display text-5xl font-semibold text-[#2a3439]">404</h1>
        <p className="mt-3 text-sm text-[#565e74]">
          The page you're looking for doesn't exist. Maybe explore the latest projects instead.
        </p>
        <Link to="/" className="mt-6 btn-primary px-5 py-2 text-sm">
          Go Home
        </Link>
      </div>
    </section>
  )
}
