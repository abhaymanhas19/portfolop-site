import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { capabilitiesContent } from '../data/content'

export default function AbilityBadges() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12">
      <div className="flex items-center gap-3 text-slate-600">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-500">
          <Sparkles className="h-4 w-4" />
        </span>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
          Capability Focus
        </p>
      </div>
      <div className="mt-5 overflow-x-auto pb-3">
        <div className="flex min-w-full gap-4">
          {capabilitiesContent.map(capability => (
            <motion.div
              key={capability.id}
              whileHover={{ translateY: -4 }}
              className="min-w-[200px] rounded-[24px] border border-cyan-100 bg-white px-5 py-4 shadow-[0_16px_40px_rgba(15,41,67,0.12)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-500">
                {capability.category}
              </p>
              <h3 className="mt-2 text-sm font-semibold text-slate-800">{capability.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
