import { useState, type MouseEvent as ReactMouseEvent } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { galleryContent, homeContent } from '../data/content'

export default function ImageShowcase() {
  const navigate = useNavigate()
  const { profile } = galleryContent
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false })

  const handlePointerMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = event
    const rect = currentTarget.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100
    setSpotlight({ x, y, active: true })
  }

  const handlePointerLeave = () => setSpotlight(prev => ({ ...prev, active: false }))

  return (
    <section className="relative overflow-hidden py-20">
      <motion.img
        src={homeContent.galleryBackground}
        alt=""
        aria-hidden
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.05, ease: 'easeOut' }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 text-white">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-amber-200/80 bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">
            Visual Logbook
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-white drop-shadow-[0_12px_35px_rgba(15,23,42,0.55)] sm:text-4xl">
            Everyday frames beyond the keyboard
          </h2>
          <p className="max-w-2xl text-sm text-white/85 drop-shadow-[0_10px_32px_rgba(15,23,42,0.45)] sm:text-base">
            Little rituals, weekend escapes, and candid snapshots that refill the tank so there’s always fresh
            energy to ship reliably.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          className="group relative w-full max-w-3xl overflow-hidden rounded-[36px] border border-amber-100 bg-white/80 p-[1px] shadow-[0_32px_80px_rgba(120,72,0,0.18)] backdrop-blur"
        >
          <div className="relative h-full w-full overflow-hidden rounded-[35px] bg-gradient-to-br from-white via-amber-50/70 to-white">
            <motion.div
              className="absolute inset-0"
              aria-hidden
              animate={{ opacity: spotlight.active ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: `radial-gradient(420px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,183,66,0.25), transparent 65%)`,
              }}
            />

            <div className="relative grid gap-6 px-8 py-10 sm:grid-cols-[auto,1fr] sm:items-center">
              <motion.div
                className="relative h-40 w-40 shrink-0 overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 160, damping: 18 }}
              >
                <motion.img
                  src={profile.image}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.05 }}
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </motion.div>

              <div className="flex flex-col gap-4 text-left">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-500">{profile.tagline}</p>
                  <h3 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{profile.name}</h3>
                </div>
                <p className="text-sm text-slate-600 sm:text-base">{profile.highlight}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center rounded-full border border-amber-100 bg-white px-3 py-1 text-xs uppercase tracking-[0.25em] text-amber-500">
                    Personal moments
                  </span>
                  <span className="inline-flex items-center rounded-full border border-amber-100 bg-white px-3 py-1 text-xs uppercase tracking-[0.25em] text-amber-500">
                    Off-duty energy
                  </span>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => navigate('/image-gallery')}
                    className="btn-primary px-5 py-2.5 text-sm"
                  >
                    {profile.cta}
                  </button>
                </div>
              </div>
            </div>

            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-200/80 to-transparent"
              animate={{ opacity: [0.25, 0.75, 0.25] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
