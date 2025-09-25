import { useState, type MouseEvent as ReactMouseEvent } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { galleryProfile } from '../data/gallery'

export default function ImageShowcase() {
  const navigate = useNavigate()
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false })

  const handlePointerMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = event
    const rect = currentTarget.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100
    setSpotlight({ x, y, active: true })
  }

  const handlePointerLeave = () => {
    setSpotlight(prev => ({ ...prev, active: false }))
  }

  return (
    <section className="relative overflow-hidden bg-background py-20">
      <div className="pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
        <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-[#FF6B35]/30 blur-[140px]" aria-hidden />
        <div className="absolute bottom-10 right-0 h-72 w-72 translate-x-1/3 rounded-full bg-purple-500/20 blur-[150px]" aria-hidden />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 text-white">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
            Visual Logbook
          </span>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Everyday frames beyond the keyboard
          </h2>
          <p className="max-w-2xl text-sm text-white/70 sm:text-base">
            Little rituals, weekend escapes, and candid snapshots that refill the tank so I can bring fresh energy back to the workbench.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          className="group relative w-full max-w-3xl overflow-hidden rounded-[36px] border border-white/10 bg-background p-[1px]"
        >
          <div className="relative h-full w-full overflow-hidden rounded-[35px] bg-surface">
            <motion.div
              className="absolute inset-0" aria-hidden
              animate={{ opacity: spotlight.active ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: `radial-gradient(380px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,107,53,0.35), transparent 65%)`,
              }}
            />

            <div className="relative grid gap-6 px-8 py-10 sm:grid-cols-[auto,1fr] sm:items-center">
              <motion.div
                className="relative h-40 w-40 shrink-0 overflow-hidden rounded-3xl border border-white/15 bg-white/5"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 160, damping: 18 }}
              >
                <motion.img
                  src={galleryProfile.image}
                  alt={galleryProfile.name}
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.05 }}
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
              </motion.div>

              <div className="flex flex-col gap-4 text-left">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">{galleryProfile.tagline}</p>
                  <h3 className="text-2xl font-semibold text-white sm:text-3xl">{galleryProfile.name}</h3>
                </div>
                <p className="text-sm text-white/70 sm:text-base">{galleryProfile.highlight}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                    Personal moments
                  </span>
                  <span className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                    Off-duty energy
                  </span>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => navigate('/image-gallery')}
                    className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-5 py-2 text-sm font-semibold text-black shadow-[0_10px_28px_rgba(255,90,28,0.45)] transition hover:shadow-[0_14px_34px_rgba(255,90,28,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {galleryProfile.cta}
                  </button>
                </div>
              </div>
            </div>

            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ opacity: [0.25, 0.75, 0.25] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
