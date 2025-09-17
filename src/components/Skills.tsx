import { motion } from 'framer-motion'
import { skills } from '../data/skills'
import TiltCard from './TiltCard'
import { ServerCog, BrainCircuit, Cloud, MessageSquare, Gauge, FlaskConical } from 'lucide-react'

const icons = { ServerCog, BrainCircuit, Cloud, MessageSquare, Gauge, FlaskConical } as const

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .5 }}
        className="text-2xl md:text-3xl font-semibold mb-6"
      >
        Skills by Domain
      </motion.h2>

      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((group, i) => {
          const Icon = (icons as any)[group.icon] || ServerCog
          return (
            <motion.div
              key={group.domain}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * .05 }}
            >
              <TiltCard className="rounded-2xl bg-card border border-border p-6 gradient-border">
                <div className="flex items-center gap-3">
                  {/* Icon tinted to your SVG favicon color */}
                  <div className="h-10 w-10 rounded-xl grid place-items-center bg-black/30 backdrop-blur-sm border border-white/10 ring-1 ring-inset ring-white/5">
                    <Icon className="h-5 w-5 text-[#ff5a1c]" />
                  </div>
                  <h3 className="font-medium text-fg">{group.domain}</h3>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map(s => (
                    <span
                      key={s}
                      className="px-3 py-1.5 rounded-full bg-[#222] text-[#FFFFFF] opacity-85 text-sm border border-border hover:border-[#ff5a1c]/40 hover:shadow-[0_0_0_1px_rgba(255,90,28,0.35)_inset] transition"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
