import { useRef } from 'react'
type Props = React.HTMLAttributes<HTMLDivElement> & { maxTilt?: number }
export default function TiltCard({ maxTilt = 10, className = '', children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width; const y = (e.clientY - r.top) / r.height
    const ry = (x - 0.5) * (maxTilt * 2); const rx = (0.5 - y) * (maxTilt * 2)
    el.style.setProperty('--rx', rx + 'deg'); el.style.setProperty('--ry', ry + 'deg')
  }
  function onLeave(){ const el = ref.current; if(!el) return; el.style.setProperty('--rx','0deg'); el.style.setProperty('--ry','0deg') }
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`tilt ${className}`} {...rest}>{children}</div>
}
