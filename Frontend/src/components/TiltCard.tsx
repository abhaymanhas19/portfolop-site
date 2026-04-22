import { useRef } from 'react'
type Props = React.HTMLAttributes<HTMLDivElement> & { maxTilt?: number }
export default function TiltCard({ maxTilt = 6, className = '', children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width   // 0..1
    const y = (e.clientY - r.top) / r.height    // 0..1
    // 2D translate: subtle lift toward cursor
    const tx = (x - 0.5) * maxTilt * 1.2
    const ty = (y - 0.5) * maxTilt * 0.8
    el.style.setProperty('--tx', tx + 'px')
    el.style.setProperty('--ty', ty + 'px')
  }
  function onLeave() {
    const el = ref.current; if (!el) return
    el.style.setProperty('--tx', '0px')
    el.style.setProperty('--ty', '0px')
  }
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`tilt-2d ${className}`} {...rest}>
      {children}
    </div>
  )
}
