import { useEffect, useRef, useCallback, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
  c: string
}

interface InteractiveParticleBackgroundProps {
  initialCount?: number
  initialStrength?: number
  showControls?: boolean
}

export default function InteractiveParticleBackground({
  initialCount = 260,
  initialStrength = 120,
  showControls = true,
}: InteractiveParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const paletteRef = useRef(['#ffffff', '#bde0fe', '#cdb4db', '#ffc8dd'])
  const rafRef = useRef<number>(0)
  const lastRef = useRef(performance.now())
  const fpsRef = useRef({ last: performance.now(), frames: 0 })

  const [count, setCount] = useState(initialCount)
  const [strength, setStrength] = useState(initialStrength)
  const [showLines, setShowLines] = useState(true)
  const [attract, setAttract] = useState(true)
  const [fps, setFps] = useState(0)

  const rand = useCallback((a: number, b: number) => a + Math.random() * (b - a), [])
  const pick = useCallback(<T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)], [])

  const makeParticle = useCallback(
    (x?: number, y?: number): Particle => ({
      x: x ?? rand(0, window.innerWidth),
      y: y ?? rand(0, window.innerHeight),
      vx: rand(-0.7, 0.7),
      vy: rand(-0.7, 0.7),
      r: rand(1.2, 3.6),
      a: rand(0.45, 0.9),
      c: pick(paletteRef.current),
    }),
    [rand, pick]
  )

  const reset = useCallback(() => {
    particlesRef.current = Array.from({ length: count }, () => makeParticle())
  }, [count, makeParticle])

  const randomizePalette = useCallback(() => {
    paletteRef.current = Array.from(
      { length: 4 },
      () => `hsl(${Math.floor(rand(0, 360))} 90% 75%)`
    )
    for (const p of particlesRef.current) {
      p.c = pick(paletteRef.current)
    }
  }, [rand, pick])

  const spawnBurst = useCallback(
    (x: number, y: number, n = 32) => {
      for (let i = 0; i < n; i++) {
        particlesRef.current.push(makeParticle(x + rand(-12, 12), y + rand(-12, 12)))
      }
      const cap = 1400
      if (particlesRef.current.length > cap) {
        particlesRef.current.splice(0, particlesRef.current.length - cap)
      }
      setCount(Math.min(800, particlesRef.current.length))
    },
    [makeParticle, rand]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleClick = (e: MouseEvent) => {
      spawnBurst(e.clientX, e.clientY)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('click', handleClick)

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () => makeParticle())
    mouseRef.current = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 }

    const drawConnections = () => {
      const particles = particlesRef.current
      const maxD = 105
      const maxD2 = maxD * maxD

      ctx.globalAlpha = 0.12
      ctx.lineWidth = 1

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < maxD2) {
            const t = 1 - d2 / maxD2
            ctx.strokeStyle = `rgba(255,255,255,${(0.18 * t).toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
    }

    const step = (now: number) => {
      const dt = Math.min(32, now - lastRef.current)
      lastRef.current = now

      // Calm trail fade
      ctx.fillStyle = 'rgba(7, 9, 14, 0.12)'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      const polarity = attract ? 1 : -1
      const particles = particlesRef.current

      // Glow-ish additive blending for particles
      ctx.globalCompositeOperation = 'lighter'

      for (const p of particles) {
        const dx = mouseRef.current.x - p.x
        const dy = mouseRef.current.y - p.y

        // Distance-based force
        const dist2 = dx * dx + dy * dy + 120
        const force = (strength / dist2) * polarity

        // Apply force
        p.vx += dx * force * 0.04
        p.vy += dy * force * 0.04

        // Friction
        p.vx *= 0.968
        p.vy *= 0.968

        // Integrate
        p.x += p.vx * (dt / 16)
        p.y += p.vy * (dt / 16)

        // Wrap
        if (p.x < -12) p.x = window.innerWidth + 12
        if (p.x > window.innerWidth + 12) p.x = -12
        if (p.y < -12) p.y = window.innerHeight + 12
        if (p.y > window.innerHeight + 12) p.y = -12

        // Draw particle
        ctx.beginPath()
        ctx.fillStyle = p.c
        ctx.globalAlpha = p.a
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'

      if (showLines && particles.length <= 420) {
        drawConnections()
      }

      // FPS calculation
      fpsRef.current.frames++
      if (now - fpsRef.current.last >= 500) {
        const currentFps = Math.round((fpsRef.current.frames * 1000) / (now - fpsRef.current.last))
        setFps(currentFps)
        fpsRef.current.last = now
        fpsRef.current.frames = 0
      }

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('click', handleClick)
    }
  }, [attract, showLines, strength, count, makeParticle, spawnBurst])

  // Handle count changes
  useEffect(() => {
    const particles = particlesRef.current
    if (count > particles.length) {
      const add = count - particles.length
      for (let i = 0; i < add; i++) {
        particles.push(makeParticle())
      }
    } else if (count < particles.length) {
      particles.length = count
    }
  }, [count, makeParticle])

  return (
    <div className="relative h-screen w-full overflow-hidden" style={{ background: '#07090e' }}>
      <canvas ref={canvasRef} className="fixed inset-0 block h-full w-full" />

      {showControls && (
        <>
          <div
            className="fixed left-4 top-4 z-10 w-[min(520px,calc(100vw-32px))] rounded-2xl border border-white/10 p-3.5 backdrop-blur-xl"
            style={{
              background: 'rgba(16, 18, 26, 0.55)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div className="mb-1.5 flex items-baseline gap-2.5">
              <h1 className="text-base font-semibold text-white">Particle Background</h1>
              <span className="text-xs text-white/75">Move mouse | Click to spawn</span>
            </div>

            <div className="mb-2.5 flex flex-wrap gap-2.5">
              <button
                onClick={reset}
                className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10 active:translate-y-px"
              >
                Reset
              </button>
              <button
                onClick={randomizePalette}
                className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10 active:translate-y-px"
              >
                Randomize Colors
              </button>
              <button
                onClick={() => setShowLines(!showLines)}
                className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10 active:translate-y-px"
              >
                Toggle Lines
              </button>
              <button
                onClick={() => setAttract(!attract)}
                className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10 active:translate-y-px"
              >
                Mode: {attract ? 'Attract' : 'Repel'}
              </button>
            </div>

            <div className="mt-2.5 grid grid-cols-[86px_1fr_44px] items-center gap-2.5">
              <label htmlFor="particles" className="text-xs text-white/80">
                Particles
              </label>
              <input
                id="particles"
                type="range"
                min="50"
                max="800"
                value={count}
                onChange={e => setCount(Number(e.target.value))}
                className="w-full accent-[#bde0fe]"
              />
              <div className="text-right text-xs tabular-nums text-white/85">{count}</div>
            </div>

            <div className="mt-2.5 grid grid-cols-[86px_1fr_44px] items-center gap-2.5">
              <label htmlFor="strength" className="text-xs text-white/80">
                Strength
              </label>
              <input
                id="strength"
                type="range"
                min="10"
                max="220"
                value={strength}
                onChange={e => setStrength(Number(e.target.value))}
                className="w-full accent-[#bde0fe]"
              />
              <div className="text-right text-xs tabular-nums text-white/85">{strength}</div>
            </div>

            <div className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-white/80">
              <div>
                <code className="rounded-lg border border-white/10 bg-white/5 px-1.5 py-0.5">
                  Attract
                </code>{' '}
                pulls particles toward the cursor.{' '}
                <code className="rounded-lg border border-white/10 bg-white/5 px-1.5 py-0.5">
                  Repel
                </code>{' '}
                pushes them away.
              </div>
              <div>
                <code className="rounded-lg border border-white/10 bg-white/5 px-1.5 py-0.5">
                  Lines
                </code>{' '}
                draws soft connections between nearby particles.
              </div>
            </div>
          </div>

          <div
            className="fixed bottom-4 right-4 z-10 rounded-xl border border-white/10 px-3 py-2.5 text-xs text-white/80 backdrop-blur-xl"
            style={{ background: 'rgba(16, 18, 26, 0.45)' }}
          >
            FPS: {fps || '—'}
          </div>
        </>
      )}
    </div>
  )
}
