import { useEffect, useRef } from 'react'

type LetterGlitchProps = {
  glitchSpeed?: number
  centerVignette?: boolean
  outerVignette?: boolean
  smooth?: boolean
  characters?: string
  colors?: string[]
  className?: string
}

type Glyph = {
  char: string
  color: string
  startColor: string
  targetColor: string
  progress: number
}

const DEFAULT_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&?/<>'
const DEFAULT_COLORS = ['#FF6B35', '#F5F5F5', '#D1D1D1']

const toRgb = (hex: string) => {
  const normalized = hex.replace('#', '')
  if (normalized.length === 3) {
    const [r, g, b] = normalized.split('')
    return {
      r: parseInt(`${r}${r}`, 16),
      g: parseInt(`${g}${g}`, 16),
      b: parseInt(`${b}${b}`, 16),
    }
  }
  if (normalized.length !== 6) return null
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  }
}

const lerpColor = (fromHex: string, toHex: string, t: number) => {
  const from = toRgb(fromHex)
  const to = toRgb(toHex)
  if (!from || !to) return toHex
  const clampT = Math.min(1, Math.max(0, t))
  const r = Math.round(from.r + (to.r - from.r) * clampT)
  const g = Math.round(from.g + (to.g - from.g) * clampT)
  const b = Math.round(from.b + (to.b - from.b) * clampT)
  return `rgb(${r}, ${g}, ${b})`
}

export default function LetterGlitch({
  glitchSpeed = 55,
  centerVignette = true,
  outerVignette = false,
  smooth = true,
  characters = DEFAULT_CHARACTERS,
  colors = DEFAULT_COLORS,
  className = '',
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const glyphsRef = useRef<Glyph[]>([])
  const gridRef = useRef({ columns: 0, rows: 0 })
  const frameRef = useRef<number>()
  const lastUpdateRef = useRef(performance.now())
  const spacingRef = useRef({ fontSize: 20, charWidth: 16, charHeight: 28, letterSpacing: 6 })

  const letters = useRef(Array.from(characters))

  const pickChar = () => letters.current[Math.floor(Math.random() * letters.current.length)]
  const pickColor = () => colors[Math.floor(Math.random() * colors.length)]

  const calculateGrid = (width: number, height: number) => {
    const { charWidth, charHeight } = spacingRef.current
    const columns = Math.ceil(width / charWidth) + 2
    const rows = Math.ceil(height / charHeight) + 2
    return { columns, rows }
  }

  const initialiseGlyphs = (columns: number, rows: number) => {
    gridRef.current = { columns, rows }
    const total = columns * rows
    glyphsRef.current = Array.from({ length: total }, () => {
      const color = pickColor()
      return {
        char: pickChar(),
        color,
        startColor: color,
        targetColor: pickColor(),
        progress: 1,
      }
    })
  }

  const drawGlyphs = () => {
    const ctx = contextRef.current
    const canvas = canvasRef.current
    if (!ctx || !canvas || glyphsRef.current.length === 0) return

    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)
    const { fontSize, charWidth, charHeight } = spacingRef.current

    ctx.font = `600 ${fontSize}px "IBM Plex Mono", monospace`
    ctx.textBaseline = 'top'

    glyphsRef.current.forEach((glyph, index) => {
      const col = index % gridRef.current.columns
      const row = Math.floor(index / gridRef.current.columns)
      const x = col * charWidth
      const y = row * charHeight
      ctx.fillStyle = glyph.color
      ctx.fillText(glyph.char, x, y)
    })
  }

  const updateGlyphs = () => {
    if (glyphsRef.current.length === 0) return
    const count = Math.max(1, Math.floor(glyphsRef.current.length * 0.05))
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * glyphsRef.current.length)
      const glyph = glyphsRef.current[idx]
      const nextColor = pickColor()
      glyph.char = pickChar()
      glyph.startColor = smooth ? glyph.color : nextColor
      glyph.targetColor = nextColor
      glyph.progress = smooth ? 0 : 1
      if (!smooth) {
        glyph.color = nextColor
      }
    }
  }

  const stepColours = () => {
    let dirty = false
    glyphsRef.current.forEach((glyph) => {
      if (glyph.progress < 1) {
        glyph.progress = Math.min(1, glyph.progress + 0.05)
        glyph.color = lerpColor(glyph.startColor, glyph.targetColor, glyph.progress)
        dirty = true
      }
    })
    if (dirty) drawGlyphs()
  }

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const dpr = window.devicePixelRatio || 1
    const { width, height } = parent.getBoundingClientRect()
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    contextRef.current = ctx
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.font = `600 ${spacingRef.current.fontSize}px "IBM Plex Mono", monospace`
    const measuredWidth = ctx.measureText('M').width
    spacingRef.current.charWidth = measuredWidth + spacingRef.current.letterSpacing
    spacingRef.current.charHeight = spacingRef.current.fontSize * 1.35

    const { columns, rows } = calculateGrid(width, height)
    initialiseGlyphs(columns, rows)
    drawGlyphs()
  }

  const animate = () => {
    const now = performance.now()
    if (now - lastUpdateRef.current >= glitchSpeed) {
      updateGlyphs()
      drawGlyphs()
      lastUpdateRef.current = now
    }
    if (smooth) stepColours()
    frameRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    letters.current = Array.from(characters)
  }, [characters])

  useEffect(() => {
    resizeCanvas()
    animate()

    const handleResize = () => {
      cancelAnimationFrame(frameRef.current ?? 0)
      resizeCanvas()
      animate()
    }

    globalThis.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameRef.current ?? 0)
      globalThis.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth, colors])

  return (
    <div className={`relative h-full w-full overflow-hidden bg-black ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
      {outerVignette && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,0.9)_100%)]" />
      )}
      {centerVignette && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.3)_0%,_rgba(0,0,0,0)_60%)]" />
      )}
    </div>
  )
}
