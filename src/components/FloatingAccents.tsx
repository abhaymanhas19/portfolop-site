export default function FloatingAccents({ variant = 'primary' }: { variant?: 'primary' | 'secondary' }) {
  if (variant === 'secondary') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="float-accent absolute -right-16 top-1/4 h-48 w-48 rounded-full bg-[#005bc4]/[0.04] blur-3xl" />
        <div className="float-accent-slow absolute -left-20 bottom-1/4 h-56 w-56 rounded-full bg-[#9e4400]/[0.03] blur-3xl" />
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="float-accent absolute -right-24 top-16 h-64 w-64 rounded-full bg-[#005bc4]/[0.05] blur-3xl" />
      <div className="float-accent-slow absolute -left-16 bottom-20 h-52 w-52 rounded-full bg-[#565e74]/[0.04] blur-3xl" />
      <div className="float-accent absolute left-1/3 top-1/2 h-36 w-36 rounded-full bg-[#9e4400]/[0.03] blur-3xl" />
    </div>
  )
}
