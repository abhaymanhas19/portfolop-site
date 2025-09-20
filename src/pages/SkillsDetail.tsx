import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { skills } from '../data/skills'
import MagicBento, { type MagicBentoItem } from '../components/MagicBento'
import { ArrowLeft, ArrowRight, Sparkles, ServerCog, BrainCircuit, Cloud, MessageSquare, Gauge, FlaskConical } from 'lucide-react'

const icons = { ServerCog, BrainCircuit, Cloud, MessageSquare, Gauge, FlaskConical } as const

export default function SkillsDetail() {
  return (
    <div className="relative isolate overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-16 -right-32 h-72 w-72 rounded-full bg-[#ff5a1c33] blur-[120px]" aria-hidden />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#ff5a1c1a] blur-[160px]" aria-hidden />
      </div>

      <section className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-4 max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
              <Sparkles className="h-3.5 w-3.5 text-[#ff5a1c]" /> Core Expertise
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Technical skills that ship reliable, intelligent products.
            </h1>
            <p className="text-base md:text-lg text-white/70">
              From Python backends to production RAG pipelines, these are the capabilities I use to deliver resilient, data-driven platforms.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/60 hover:bg-white/10 transition"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
            </Link>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#FF6B35] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(255,90,28,0.45)] hover:shadow-[0_16px_36px_rgba(255,90,28,0.55)] transition"
            >
              Let’s build together <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <div className="mt-12">
          <MagicBento
            items={skills.map((group, index) => {
              const Icon = (icons as any)[group.icon] || ServerCog
              const item: MagicBentoItem = {
                id: group.domain,
                icon: <Icon className="h-5 w-5 text-[#FF6B35]" />,
                badge: 'Core discipline',
                title: group.domain,
                description: group.description,
                chips: group.skills,
                meta: `${String(group.skills.length).padStart(2, '0')} skills`,
                accent:
                  index % 3 === 0
                    ? 'from-[#FF6B35]/24 via-[#261c18]/55 to-transparent'
                    : index % 3 === 1
                      ? 'from-[#FF6B35]/20 via-[#192227]/55 to-transparent'
                      : 'from-[#FF6B35]/20 via-[#1f1a27]/55 to-transparent',
              }
              return item
            })}
            columnsClassName="sm:grid-cols-2 xl:grid-cols-3"
            motionFrom={{ opacity: 0, y: 28 }}
          />
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-black/70 via-[#1c1c1f] to-black/70 p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-2xl font-semibold text-white">Need a hand with your next project?</h2>
              <p className="text-sm md:text-base text-white/70">
                I love partnering with teams to architect reliable AI-powered products. Share the challenge on your mind and we can map the solution together.
              </p>
            </div>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#FF6B35] px-6 py-3 text-base font-semibold text-black shadow-[0_12px_36px_rgba(255,90,28,0.5)] hover:shadow-[0_18px_44px_rgba(255,90,28,0.6)] transition"
            >
              Start the conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
