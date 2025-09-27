import { useEffect, useRef, type ReactNode } from 'react'

type LetterGlitchProps = {
  glitchColors?: string[]
  glitchSpeed?: number
  centerVignette?: boolean
  outerVignette?: boolean
  smooth?: boolean
  characters?: string
  className?: string
  overlayClassName?: string
  centerVignetteClassName?: string
  outerVignetteClassName?: string
  ambientGlow?: boolean
  backgroundFill?: boolean
  roundEdges?: boolean
  children?: ReactNode
}

type RGB = { r: number; g: number; b: number }

type Letter = {
  char: string
  color: RGB
  fromColor: RGB
  targetColor: RGB
  colorProgress: number
  flickerOffset: number
}

const fontSize = 20
const charWidth = 12
const charHeight = 24
const edgeCurveRadius = 28

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3)
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const normalizeHex = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  return hex.replace(shorthandRegex, (_match, r, g, b) => r + r + g + g + b + b)
}

const hexToRgb = (hex: string): RGB => {
  const normalized = normalizeHex(hex)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized)
  if (!result) {
    return { r: 255, g: 255, b: 255 }
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  }
}

const cloneRgb = (color: RGB): RGB => ({ r: color.r, g: color.g, b: color.b })

const rgbToCss = (color: RGB, alpha = 1) => `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`

const LetterGlitch = ({
  glitchColors = ['#FF6B35', '#FFE3C7', '#9BC2FF', '#FFFFFF'],
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789',
  className = '',
  overlayClassName,
  centerVignetteClassName,
  outerVignetteClassName,
  ambientGlow = true,
  backgroundFill = true,
  roundEdges = true,
  children
}: LetterGlitchProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const letters = useRef<Letter[]>([])
  const grid = useRef({ columns: 0, rows: 0 })
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const lastGlitchTime = useRef(Date.now())
  const intensityRef = useRef(0.5)
  const startTimeRef = useRef(Date.now())

  const lettersAndSymbols = useRef(Array.from(characters))

  const getRandomChar = () => {
    const pool = lettersAndSymbols.current
    return pool[Math.floor(Math.random() * pool.length)]
  }

  const getRandomColor = () => {
    const hex = glitchColors[Math.floor(Math.random() * glitchColors.length)]
    return hexToRgb(hex)
  }

  const calculateGrid = (width: number, height: number) => {
    const columns = Math.ceil(width / charWidth)
    const rows = Math.ceil(height / charHeight)
    return { columns, rows }
  }

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { columns, rows }
    const totalLetters = columns * rows
    letters.current = Array.from({ length: totalLetters }, () => {
      const initialColor = getRandomColor()
      const nextColor = getRandomColor()
      return {
        char: getRandomChar(),
        color: cloneRgb(initialColor),
        fromColor: cloneRgb(initialColor),
        targetColor: cloneRgb(nextColor),
        colorProgress: 1,
        flickerOffset: Math.random() * Math.PI * 2
      }
    })
  }

  const drawScene = (intensity: number, now: number) => {
    if (!context.current || !canvasRef.current || letters.current.length === 0) return
    const ctx = context.current
    const rect = canvasRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    ctx.clearRect(0, 0, width, height)

    if (backgroundFill) {
      const baseGradient = ctx.createLinearGradient(0, 0, width, height)
      baseGradient.addColorStop(0, 'rgba(71, 56, 142, 0.96)')
      baseGradient.addColorStop(0.46, 'rgba(48, 36, 102, 0.9)')
      baseGradient.addColorStop(1, 'rgba(32, 26, 76, 0.94)')
      ctx.fillStyle = baseGradient
      ctx.fillRect(0, 0, width, height)

      const friendlyWash = ctx.createLinearGradient(0, height * 0.25, width, height)
      friendlyWash.addColorStop(0, 'rgba(255, 178, 140, 0.25)')
      friendlyWash.addColorStop(0.4, 'rgba(255, 223, 196, 0.18)')
      friendlyWash.addColorStop(1, 'rgba(147, 189, 255, 0.22)')
      ctx.fillStyle = friendlyWash
      ctx.fillRect(0, 0, width, height)

      const sideGlow = ctx.createRadialGradient(
        width * 0.25,
        height * 0.25,
        Math.max(width, height) * 0.08,
        width * 0.25,
        height * 0.25,
        Math.max(width, height) * 0.55
      )
      sideGlow.addColorStop(0, 'rgba(255, 206, 170, 0.35)')
      sideGlow.addColorStop(1, 'rgba(255, 206, 170, 0)')
      ctx.fillStyle = sideGlow
      ctx.fillRect(0, 0, width, height)

      const coolGlow = ctx.createRadialGradient(
        width * 0.78,
        height * 0.68,
        Math.max(width, height) * 0.05,
        width * 0.78,
        height * 0.68,
        Math.max(width, height) * 0.6
      )
      coolGlow.addColorStop(0, 'rgba(155, 198, 255, 0.32)')
      coolGlow.addColorStop(1, 'rgba(155, 198, 255, 0)')
      ctx.fillStyle = coolGlow
      ctx.fillRect(0, 0, width, height)
    }

    ctx.font = `${fontSize}px monospace`
    ctx.textBaseline = 'top'

    letters.current.forEach((letter, index) => {
      const column = index % grid.current.columns
      const row = Math.floor(index / grid.current.columns)
      let x = column * charWidth
      let y = row * charHeight

      if (!backgroundFill && roundEdges) {
        const curveInset = edgeCurveRadius
        const effectiveWidth = Math.max(0, rect.width - curveInset * 2)
        const effectiveHeight = Math.max(0, rect.height - curveInset * 2)
        const curvedX = x - rect.width / 2 + charWidth / 2
        const curvedY = y - rect.height / 2 + charHeight / 2
        const normalizedX = curvedX / (effectiveWidth / 2)
        const normalizedY = curvedY / (effectiveHeight / 2)
        const distance = Math.sqrt(normalizedX ** 2 + normalizedY ** 2)
        if (distance > 1) {
          const scale = Math.max(1, distance)
          const easedDistance = easeOutCubic(Math.min(1, (distance - 1) * 1.4))
          x = rect.width / 2 + (normalizedX / scale) * (effectiveWidth / 2) + Math.sign(normalizedX) * easedDistance * (curveInset - charWidth)
          y = rect.height / 2 + (normalizedY / scale) * (effectiveHeight / 2) + Math.sign(normalizedY) * easedDistance * (curveInset - charHeight)
        } else {
          x += Math.sin((normalizedY + 1) * Math.PI * 0.5) * curveInset * 0.08
          y += Math.sin((normalizedX + 1) * Math.PI * 0.5) * curveInset * 0.08
        }
      }

      const pulse = Math.sin(now / 240 + letter.flickerOffset + column * 0.08) * 0.5 + 0.5
      const brightness = clamp(0.45 + pulse * 0.4 + intensity * 0.3, 0.4, 1.05)

      ctx.shadowBlur = 6 + intensity * 18
      ctx.shadowColor = rgbToCss(letter.color, 0.4 + intensity * 0.4)
      ctx.fillStyle = rgbToCss(letter.color, brightness)

      ctx.fillText(letter.char, x, y)
    })

    ctx.shadowBlur = 0

    if (backgroundFill) {
      ctx.globalCompositeOperation = 'lighter'

      const bubbleCount = Math.floor(4 + intensity * 5)
      for (let i = 0; i < bubbleCount; i++) {
        const radius = 18 + Math.random() * 26
        const centerX = Math.random() * width
        const centerY = Math.random() * height
        const color = getRandomColor()
        const bubbleGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, radius)
        bubbleGradient.addColorStop(0, rgbToCss(color, 0.42 + intensity * 0.28))
        bubbleGradient.addColorStop(0.6, rgbToCss(color, 0.12 + intensity * 0.1))
        bubbleGradient.addColorStop(1, rgbToCss(color, 0))
        ctx.fillStyle = bubbleGradient
        ctx.globalAlpha = 0.55
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1

      const streakCount = Math.floor(2 + intensity * 6)
      for (let i = 0; i < streakCount; i++) {
        const streakY = Math.random() * height
        const streakHeight = 2 + Math.random() * 4
        const streakWidth = width * (0.3 + Math.random() * 0.4)
        const offsetX = (Math.random() - 0.5) * width * 0.1
        ctx.globalAlpha = 0.04 + Math.random() * 0.05
        ctx.fillStyle = `rgba(255, 255, 255, ${0.38 + Math.random() * 0.2})`
        ctx.fillRect(offsetX, streakY, streakWidth, streakHeight)
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'

      const hotspotRadius = Math.max(width, height) * 0.65
      const hotspot = ctx.createRadialGradient(
        width / 2,
        height * 0.45,
        Math.max(width, height) * 0.2,
        width / 2,
        height * 0.45,
        hotspotRadius
      )
      hotspot.addColorStop(0, `rgba(255, 140, 102, ${0.22 + intensity * 0.28})`)
      hotspot.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)')
      hotspot.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = hotspot
      ctx.fillRect(0, 0, width, height)

      const scanlineHeight = 4
      ctx.fillStyle = 'rgba(255, 255, 255, 0.035)'
      for (let y = 0; y < height; y += scanlineHeight) {
        ctx.fillRect(0, y, width, 1)
      }
    } else {
      ctx.globalCompositeOperation = 'source-over'
    }
  }

  const updateLetters = (intensity: number) => {
    if (!letters.current || letters.current.length === 0) return

    const baseRatio = 0.04
    const intensityBoost = 0.06 * intensity
    const updateCount = Math.max(1, Math.floor(letters.current.length * (baseRatio + intensityBoost)))

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length)
      const letter = letters.current[index]
      if (!letter) continue

      letter.char = getRandomChar()
      const nextColor = getRandomColor()
      letter.fromColor = cloneRgb(letter.color)
      letter.targetColor = cloneRgb(nextColor)

      if (!smooth) {
        letter.color = cloneRgb(nextColor)
        letter.colorProgress = 1
      } else {
        letter.colorProgress = 0
      }

      if (Math.random() < 0.2 * intensity) {
        letter.flickerOffset = Math.random() * Math.PI * 2
      }
    }
  }

  const handleSmoothTransitions = (intensity: number) => {
    letters.current.forEach(letter => {
      if (letter.colorProgress < 1) {
        const progress = clamp(letter.colorProgress + 0.07 + intensity * 0.08, 0, 1)
        letter.colorProgress = progress
        const eased = easeOutCubic(progress)
        letter.color = {
          r: Math.round(letter.fromColor.r + (letter.targetColor.r - letter.fromColor.r) * eased),
          g: Math.round(letter.fromColor.g + (letter.targetColor.g - letter.fromColor.g) * eased),
          b: Math.round(letter.fromColor.b + (letter.targetColor.b - letter.fromColor.b) * eased)
        }
      }
    })
  }

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const dpr = window.devicePixelRatio || 1
    const rect = parent.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const { columns, rows } = calculateGrid(rect.width, rect.height)
    initializeLetters(columns, rows)
    drawScene(intensityRef.current, Date.now())
  }

  const animate = () => {
    const now = Date.now()
    const elapsed = now - startTimeRef.current

    const primaryPulse = Math.sin(elapsed / 640) * 0.5 + 0.5
    const secondaryPulse = Math.sin(elapsed / 170 + Math.PI / 3) * 0.5 + 0.5
    const intensity = clamp(0.25 + primaryPulse * 0.4 + secondaryPulse * 0.25, 0.2, 1)
    intensityRef.current = intensity

    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters(intensity)
      lastGlitchTime.current = now
    }

    if (smooth) {
      handleSmoothTransitions(intensity)
    }

    drawScene(intensity, now)
    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    lettersAndSymbols.current = Array.from(characters)
  }, [characters])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    context.current = canvas.getContext('2d')
    resizeCanvas()
    animate()

    let resizeTimeout: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
        resizeCanvas()
        animate()
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth, backgroundFill])

  const overlayClasses = overlayClassName
    ? `absolute inset-0 z-10 ${overlayClassName}`
    : 'absolute inset-0 z-10 flex items-center justify-center'

  return (
    <div className={`relative h-full w-full overflow-hidden bg-transparent ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
      {ambientGlow ? (
        <>
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-45 mix-blend-screen [background-image:radial-gradient(circle_at_top,_rgba(255,255,255,0.28),_rgba(255,255,255,0)_60%)]" />
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-45 mix-blend-soft-light [background-image:linear-gradient(135deg,_rgba(255,166,120,0.24)_0%,_rgba(255,214,194,0.14)_42%,_rgba(124,175,255,0.22)_78%,_rgba(26,18,54,0.2)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 rounded-b-[inherit] opacity-55 [background-image:linear-gradient(to_top,_rgba(20,16,45,0.85),_rgba(20,16,45,0))]" />
        </>
      ) : null}
      {outerVignette && (
        <div
          className={
            outerVignetteClassName ??
            'pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle,_rgba(0,0,0,0)_62%,_rgba(0,0,0,0.55)_100%)]'
          }
        />
      )}
      {centerVignette && (
        <div
          className={
            centerVignetteClassName ??
            'pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle,_rgba(0,0,0,0.85)_0%,_rgba(0,0,0,0.25)_65%)]'
          }
        />
      )}
      {children ? <div className={overlayClasses}>{children}</div> : null}
    </div>
  )
}

export default LetterGlitch
