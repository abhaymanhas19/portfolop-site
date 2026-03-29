import { useState } from 'react'
import { ArrowUpRight, Menu, Sparkles, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { site } from '../data/site'

type NavItem = {
  label: string
  to: string
}

const navItems: NavItem[] = [
  { label: 'Home', to: '/#home' },
  { label: 'Skills', to: '/#skills' },
  { label: 'Projects', to: '/#projects' },
  { label: 'Experience', to: '/#experience' },
  { label: 'Achievements', to: '/#achievements' },
  { label: 'Blogs', to: '/#blogs' },
  { label: 'Products', to: '/#products' },
  { label: 'Contact', to: '/#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

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
    `relative text-sm font-medium tracking-[0.02em] transition-colors after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-cyan-300 after:transition-opacity ${
      active ? 'text-white after:opacity-100' : 'text-white/72 after:opacity-0 hover:text-white hover:after:opacity-100'
    }`

  return (
    <header className="sticky top-0 z-50">
      {isHome && (
        <div className="border-b border-white/10 bg-[#07111f]/82 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl justify-center px-4 py-2.5 sm:px-6 lg:px-8">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-white/82 shadow-[0_18px_50px_rgba(2,8,23,0.28)] backdrop-blur-xl sm:px-5 sm:text-[11px]">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
              <span className="truncate">Python • AI • ML • Automation • Consulting</span>
            </div>
          </div>
        </div>
      )}

      <div className={`border-b backdrop-blur-xl ${isHome ? 'border-white/10 bg-[#07111f]/70' : 'border-slate-200/80 bg-white/88'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className={`inline-flex items-center gap-3 ${isHome ? 'text-white' : 'text-slate-900'}`}>
            <span className={`grid h-10 w-10 place-items-center rounded-2xl border shadow-sm ${isHome ? 'border-white/12 bg-white/8' : 'border-slate-200 bg-slate-50'}`}>
              <img src="/favicon.svg" alt="Brand" className="h-5 w-5" />
            </span>
            <span className="text-base font-semibold tracking-tight">{site.NAME}</span>
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
              className={`${isHome ? 'btn-primary-dark' : 'btn-primary'} px-5 py-2.5 text-sm`}
            >
              Hire Me <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            className={`rounded-xl border p-2.5 transition lg:hidden ${
              isHome
                ? 'border-white/12 bg-white/8 text-white hover:bg-white/12'
                : 'border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            onClick={() => setOpen(v => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className={`border-t backdrop-blur-xl lg:hidden ${isHome ? 'border-white/10 bg-[#07111f]/94' : 'border-slate-200/80 bg-white/96'}`}>
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            {navItems.map(item => {
              const active = isActive(item.to)
              return (
                <button
                  key={item.label}
                  type="button"
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                    active
                      ? isHome
                        ? 'bg-white/12 text-white'
                        : 'bg-slate-100 text-slate-900'
                      : isHome
                        ? 'text-white/72 hover:bg-white/8 hover:text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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
              className={`${isHome ? 'btn-primary-dark' : 'btn-primary'} mt-2 w-full justify-center px-5 py-3 text-sm`}
            >
              Hire Me <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
