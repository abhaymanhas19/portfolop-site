import { useEffect, useRef } from 'react'

type VantaInstance = {
  destroy: () => void
}

type VantaRingsBackgroundProps = {
  className?: string
}

export default function VantaRingsBackground({ className }: VantaRingsBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement | null>(null)
  const vantaInstance = useRef<VantaInstance | null>(null)

  useEffect(() => {
    if (!vantaRef.current || !window.VANTA?.RINGS) return

    vantaInstance.current = window.VANTA.RINGS({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      backgroundColor: 0x50506,
    })

    return () => {
      vantaInstance.current?.destroy()
      vantaInstance.current = null
    }
  }, [])

  return (
    <div
      ref={vantaRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className ?? ''}`}
    />
  )
}
