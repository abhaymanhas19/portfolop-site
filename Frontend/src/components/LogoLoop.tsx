import { useMemo, useState } from 'react'
import { usePortfolio } from '../hooks/usePortfolio'

const ITEM_WIDTH = 120
const ITEM_HEIGHT = 70
const ROTATION_DURATION = 22

export default function LogoLoop() {
  const { logoLoop: logoLoopContent } = usePortfolio()
  const logoLoopItems = logoLoopContent.items || []
  const duplicatedItems = useMemo(() => [...logoLoopItems, ...logoLoopItems], [logoLoopItems])
  const [paused, setPaused] = useState(false)

  return (
    <section className="relative mx-auto w-full py-ds-16">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.55em] text-[#005bc4]/60">Ecosystem</p>
          <h2 className="mt-3 font-display text-display-md font-semibold text-[#2a3439]">Technologies in Motion</h2>
          <p className="mt-4 max-w-3xl text-balance text-body-lg text-[#565e74]">
            A pulse of the tools and platforms powering Python, AI, and realtime projects. Hover to pause and
            explore.
          </p>
        </div>

        <div
          className="group relative isolate w-full max-w-[min(820px,95vw)] overflow-hidden rounded-card bg-surface-container-lowest px-4 py-12 shadow-ambient"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent" />

          <div
            className="logo-loop-track relative flex w-max items-center gap-6"
            style={{ animationDuration: `${ROTATION_DURATION}s`, animationPlayState: paused ? 'paused' : 'running' }}
          >
            {duplicatedItems.map((item, idx) => (
              <a
                key={`${item.label}-${idx}`}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="relative flex select-none flex-col items-center justify-center rounded-2xl bg-surface-container-low px-4 text-center text-[#565e74] shadow-ambient-sm transition-transform duration-500 hover:scale-[1.05] hover:shadow-ambient"
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                }}
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#565e74]/60">
                  {item.label}
                </span>
                <span className="mt-1 text-2xl font-semibold" style={{ color: item.foreground || '#005bc4' }}>
                  {item.acronym}
                </span>
                <div
                  className="mt-1 h-1 w-12 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${item.accent || '#0fb6c4'}, transparent)` }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
