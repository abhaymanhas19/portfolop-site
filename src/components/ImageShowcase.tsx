import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { galleryContent } from '../data/content'

export default function ImageShowcase() {
  const navigate = useNavigate()
  const { profile } = galleryContent
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false })
  const vantaRef = useRef<HTMLDivElement | null>(null)
  const vantaInstance = useRef<{ destroy: () => void } | null>(null)

  useEffect(() => {
    if (!vantaRef.current || !window.VANTA?.NET) return

    vantaInstance.current = window.VANTA.NET({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x15900c,
      backgroundColor: 0xf0324,
    })

    return () => {
      vantaInstance.current?.destroy()
      vantaInstance.current = null
    }
  }, [])

  const handlePointerMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = event
    const rect = currentTarget.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100
    setSpotlight({ x, y, active: true })
  }

  const handlePointerLeave = () => setSpotlight(prev => ({ ...prev, active: false }))

  return (
    <section className="relative overflow-hidden bg-[#2a3439] py-ds-16">
      <div
        ref={vantaRef}
        id="gallery-vanta"
        aria-hidden
        className="pointer-events-none absolute inset-0"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <span className="tag-pill bg-white/10 text-white/80">
            AI/ML Field Notes
          </span>
          <h2 className="font-display text-display-md font-semibold tracking-tight text-white">
            AI/ML experience snapshots from live builds
          </h2>
          <p className="max-w-2xl text-body-lg text-white/70">
            Architecture frames, evaluation readouts, and model ops visuals that show how systems behave when they hit production traffic.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          className="group relative w-full max-w-3xl overflow-hidden rounded-card bg-surface-container-lowest shadow-ambient-lg"
        >
          <div className="relative h-full w-full overflow-hidden rounded-card bg-surface-container-lowest">
            <motion.div
              className="absolute inset-0"
              aria-hidden
              animate={{ opacity: spotlight.active ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: `radial-gradient(420px circle at ${spotlight.x}% ${spotlight.y}%, rgba(0,91,196,0.08), transparent 65%)`,
              }}
            />

            <div className="relative grid gap-6 px-ds-8 py-10 sm:grid-cols-[auto,1fr] sm:items-center">
              <motion.div
                className="relative h-40 w-40 shrink-0 overflow-hidden rounded-card bg-surface-container-low"
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
                  <p className="text-xs uppercase tracking-[0.3em] text-[#565e74]">{profile.tagline}</p>
                  <h3 className="font-display text-2xl font-semibold text-[#2a3439] sm:text-3xl">{profile.name}</h3>
                </div>
                <p className="text-sm text-[#565e74] sm:text-base">{profile.highlight}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="tag-pill px-3 py-1 text-[11px] tracking-[0.3em]">
                    Model diagnostics
                  </span>
                  <span className="tag-pill px-3 py-1 text-[11px] tracking-[0.3em]">
                    RAG pipelines
                  </span>
                  <span className="tag-pill px-3 py-1 text-[11px] tracking-[0.3em]">
                    Latency dashboards
                  </span>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => navigate('/blogs')}
                    className="btn-primary px-5 py-2.5 text-sm"
                  >
                    {profile.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
