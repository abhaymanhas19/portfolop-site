import { useMemo, useState } from 'react'
import { logoLoopItems } from '../data/logoLoop'

const ITEM_WIDTH = 120
const ITEM_HEIGHT = 72
const ROTATION_DURATION = 22

export default function LogoLoop() {
  const duplicatedItems = useMemo(() => [...logoLoopItems, ...logoLoopItems], [])

  const [paused, setPaused] = useState(false)

  return (
    <section className="relative mx-auto w-full bg-transparent py-24">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.55em] text-white/40">Ecosystem</p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Technologies in Motion</h2>
          <p className="mt-4 max-w-3xl text-balance text-sm text-white/60 md:text-base">
            A quick pulse of the tools and platforms that power my Python, AI, and realtime projects.
          </p>
        </div>

        <div
          className="group relative isolate w-full max-w-[min(820px,95vw)] overflow-hidden rounded-[38px] border border-white/5 bg-[radial-gradient(circle_at_center,_rgba(19,17,36,0.9)_0%,_rgba(8,6,18,0.65)_60%,_rgba(3,3,9,0.2)_100%)] px-4 py-12 shadow-[0_30px_90px_rgba(4,6,18,0.55)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background via-background/70 to-transparent" />

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
                className="peer relative flex select-none flex-col items-center justify-center rounded-[24px] border border-white/8 text-center text-white shadow-[0_24px_45px_rgba(6,8,22,0.35)] backdrop-blur-sm transition-transform duration-500 hover:scale-[1.04] hover:border-white/40"
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  background: `linear-gradient(150deg, ${item.background} 0%, rgba(18,16,35,0.85) 70%)`,
                  boxShadow: `0 24px 45px -16px ${item.accent}33`
                }}
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/65 group-hover:text-white/80">{item.label}</span>
                <span className="mt-1 text-2xl font-semibold" style={{ color: item.foreground }}>
                  {item.acronym}
                </span>
                <div className="mt-1 h-1 w-10 rounded-full" style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
