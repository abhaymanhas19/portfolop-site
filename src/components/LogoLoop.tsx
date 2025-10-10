import { useMemo, useState } from 'react'
import { logoLoopItems } from '../data/logoLoop'

const ITEM_WIDTH = 120
const ITEM_HEIGHT = 70
const ROTATION_DURATION = 22

export default function LogoLoop() {
  const duplicatedItems = useMemo(() => [...logoLoopItems, ...logoLoopItems], [])
  const [paused, setPaused] = useState(false)

  return (
    <section className="relative mx-auto w-full py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-transparent" aria-hidden />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6">
        <div className="text-center text-slate-800">
          <p className="text-sm uppercase tracking-[0.55em] text-cyan-500/80">Ecosystem</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">Technologies in Motion</h2>
          <p className="mt-4 max-w-3xl text-balance text-sm text-slate-600 md:text-base">
            A pulse of the tools and platforms powering Python, AI, and realtime projects. Hover to pause and
            explore.
          </p>
        </div>

        <div
          className="group relative isolate w-full max-w-[min(820px,95vw)] overflow-hidden rounded-[36px] border border-cyan-100 bg-white/85 px-4 py-12 shadow-[0_32px_80px_rgba(15,41,67,0.18)] backdrop-blur"
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
                className="relative flex select-none flex-col items-center justify-center rounded-[24px] border border-cyan-100 bg-white px-4 text-center text-slate-600 shadow-[0_20px_45px_rgba(15,41,67,0.16)] transition-transform duration-500 hover:scale-[1.05] hover:border-cyan-200 hover:shadow-[0_24px_55px_rgba(15,41,67,0.2)]"
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                }}
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-slate-400">
                  {item.label}
                </span>
                <span className="mt-1 text-2xl font-semibold" style={{ color: item.foreground }}>
                  {item.acronym}
                </span>
                <div
                  className="mt-1 h-1 w-12 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
