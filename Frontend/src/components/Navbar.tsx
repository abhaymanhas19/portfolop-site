import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { usePortfolio } from '../hooks/usePortfolio'

type NavItem = {
  label: string
  to: string
}

const navItems: NavItem[] = [
  { label: 'Home', to: '/#home' },
  { label: 'Skills', to: '/#skills' },
  { label: 'Projects', to: '/#projects' },
  { label: 'Achievements', to: '/#achievements' },
  { label: 'Blogs', to: '/#blogs' },
  { label: 'Products', to: '/#products' },
  { label: 'About', to: '/#about' },
]

export default function Navbar() {
  const { branding } = usePortfolio()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleNav = (to: string) => {
    setOpen(false)

    if (to.includes('#')) {
      const [path, hash] = to.split('#')
      const targetPath = path === '' ? '/' : path || '/'
      navigate(targetPath)
      if (hash) {
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 50)
      }
      return
    }

    navigate(to)
  }

  const isActive = (to: string) => {
    if (!to.includes('#')) return location.pathname === to

    const [path, hash] = to.split('#')
    const normalizedPath = path === '' ? '/' : path || '/'
    if (location.pathname !== normalizedPath) return false
    if (!hash) return true
    return location.hash === `#${hash}` || (hash === 'home' && location.hash === '')
  }

  const desktopLinkClass = (active: boolean) =>
    `relative text-sm font-medium tracking-wide transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:rounded-full after:transition-opacity ${
      active
        ? 'text-[#005bc4] after:bg-[#005bc4] after:opacity-100'
        : 'text-[#565e74] after:bg-[#005bc4] after:opacity-0 hover:text-[#005bc4] hover:after:opacity-100'
    }`

  return (
    <header className="sticky top-0 z-50">
      {/* Glassmorphism nav bar */}
      <div className="glass-panel" style={{ boxShadow: '0 32px 64px rgba(42, 52, 57, 0.06)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-3 text-[#2a3439]">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-surface-container-low">
              <img src="/favicon.svg" alt="Brand" className="h-5 w-5" />
            </span>
            <span className="font-display text-base font-semibold tracking-tight">{branding.name}</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map(item => {
              const active = isActive(item.to)
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNav(item.to)}
                  className={desktopLinkClass(active)}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="hidden lg:block">
            <button
              type="button"
              onClick={() => handleNav('/#contact')}
              className="btn-primary px-5 py-2.5 text-sm"
            >
              Hire Me <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            className="rounded-2xl bg-surface-container-low p-2.5 text-[#565e74] transition hover:bg-surface-container-high lg:hidden"
            onClick={() => setOpen(v => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass-panel lg:hidden" style={{ boxShadow: '0 32px 64px rgba(42, 52, 57, 0.06)' }}>
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navItems.map(item => {
              const active = isActive(item.to)
              return (
                <button
                  key={item.label}
                  type="button"
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                    active
                      ? 'bg-surface-container-low text-[#005bc4]'
                      : 'text-[#565e74] hover:bg-surface-container-low hover:text-[#005bc4]'
                  }`}
                  onClick={() => handleNav(item.to)}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </button>
              )
            })}

            <button
              type="button"
              onClick={() => handleNav('/#contact')}
              className="btn-primary mt-2 w-full justify-center px-5 py-3 text-sm"
            >
              Hire Me <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
