import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { capabilitiesContent } from '../data/content'

const LOOP_DURATION = 28
const CARD_WIDTH = 240

export default function AbilityBadges() {
  const navigate = useNavigate()
  const [paused, setPaused] = useState(false)
  const loopItems = useMemo(() => [...capabilitiesContent, ...capabilitiesContent], [])

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12">
      <div className="flex items-center gap-3 text-slate-600">
        <span className="tag-pill">
          <Sparkles className="h-4 w-4" />
        </span>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Capability Focus</p>
      </div>

      <div
        className="relative mt-6 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_26px_70px_rgba(15,23,42,0.12)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/70 to-transparent" />

        <div
          className="logo-loop-track flex w-max items-stretch gap-5 py-6"
          style={{ animationDuration: `${LOOP_DURATION}s`, animationPlayState: paused ? 'paused' : 'running' }}
        >
          {loopItems.map((capability, idx) => (
            <motion.button
              type="button"
              key={`${capability.id}-${idx}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex min-h-[140px] flex-col items-start justify-between rounded-[28px] border border-slate-200 bg-white px-6 py-5 text-left shadow-[0_18px_60px_rgba(15,23,42,0.12)] transition-colors hover:border-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              style={{ width: CARD_WIDTH }}
              onClick={() => navigate('/what-i-can-build', { state: { capabilityId: capability.id } })}
            >
              <span className="tag-pill px-3 py-1 text-[10px] tracking-[0.3em]">
                {capability.category}
              </span>
              <span className="mt-3 line-clamp-2 text-sm font-semibold text-slate-900">{capability.title}</span>
              <span className="mt-2 line-clamp-3 text-xs text-slate-600">{capability.description}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
