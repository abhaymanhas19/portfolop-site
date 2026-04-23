import { useEffect, useState, useCallback, type MouseEvent as ReactMouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

const AUTOPLAY_MS = 5000

const bgVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
}

export default function ImageShowcase() {
  const navigate = useNavigate()
  const { gallery } = usePortfolio()
  const { profile, carousel } = gallery
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false })

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection)
      setCurrent((prev) => (prev + newDirection + carousel.length) % carousel.length)
    },
    [carousel.length],
  )

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    },
    [current],
  )

  // Autoplay
  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => paginate(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [isPaused, paginate])

  const handlePointerMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = event
    const rect = currentTarget.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100
    setSpotlight({ x, y, active: true })
  }

  const handlePointerLeave = () => setSpotlight((prev) => ({ ...prev, active: false }))

  const item = carousel[current]
  if (!item) return null

  return (
    <section
      className="relative min-h-[600px] overflow-hidden py-ds-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Carousel background ── */}
      <div className="absolute inset-0" aria-hidden>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={item.id}
            custom={direction}
            variants={bgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            {item.type === 'video' ? (
              <video
                src={item.src}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <motion.img
                src={item.src}
                alt=""
                className="h-full w-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: 'easeOut' }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* ── Foreground content ── */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-12 px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <span className="tag-pill bg-white/10 text-white/80">AI/ML Field Notes</span>
          <h2 className="font-display text-display-md font-semibold tracking-tight text-white">
            AI/ML experience snapshots from live builds
          </h2>
          <p className="max-w-2xl text-body-lg text-white/70">
            Architecture frames, evaluation readouts, and model ops visuals that show how systems
            behave when they hit production traffic.
          </p>
        </motion.div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          className="group relative w-full max-w-3xl overflow-hidden rounded-card bg-white/90 shadow-ambient-lg backdrop-blur-md"
        >
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
                <p className="text-xs uppercase tracking-[0.3em] text-[#565e74]">
                  {profile.tagline}
                </p>
                <h3 className="font-display text-2xl font-semibold text-[#2a3439] sm:text-3xl">
                  {profile.name}
                </h3>
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
        </motion.div>

        {/* Caption for current slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="text-center"
          >
            {item.title && (
              <h4 className="font-display text-lg font-semibold text-white sm:text-xl">
                {item.title}
              </h4>
            )}
            {item.description && (
              <p className="mt-1 text-sm text-white/60">{item.description}</p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Carousel controls */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous slide"
            className="rounded-full bg-white/10 p-2.5 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            {carousel.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className="p-1"
              >
                <motion.span
                  className="block rounded-full"
                  animate={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    backgroundColor:
                      i === current ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next slide"
            className="rounded-full bg-white/10 p-2.5 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Progress bar */}
        {!isPaused && (
          <motion.div
            key={current}
            className="h-[3px] w-full max-w-xs rounded-full bg-white/30"
            style={{ overflow: 'hidden' }}
          >
            <motion.div
              className="h-full bg-white/70"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}
