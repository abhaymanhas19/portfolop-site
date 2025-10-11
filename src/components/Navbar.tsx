import { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { site } from '../data/site'

type NavItem =
  | { type: 'link'; label: string; to: string }
  | { type: 'dropdown'; label: string; items: { label: string; to: string }[] }

const navItems: NavItem[] = [
  { type: 'link', label: 'Home', to: '/' },
  { type: 'link', label: 'Skills', to: '/skills' },
  { type: 'link', label: 'Projects', to: '/projects' },
  { type: 'link', label: 'Achievements', to: '/certifications' },
  {
    type: 'dropdown',
    label: 'About',
    items: [
      { label: 'About Me', to: '/about' },
      { label: 'What I Can Build', to: '/what-i-can-build' },
      { label: 'Image Gallery', to: '/image-gallery' },
    ],
  },
  { type: 'link', label: 'Resume', to: '/resume' },
  { type: 'link', label: 'Contact', to: '/#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const aboutCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const clearAboutClose = () => {
    if (aboutCloseTimeout.current) {
      clearTimeout(aboutCloseTimeout.current)
      aboutCloseTimeout.current = null
    }
  }

  const openAboutMenu = () => {
    clearAboutClose()
    setAboutOpen(true)
  }

  const scheduleCloseAbout = () => {
    clearAboutClose()
    aboutCloseTimeout.current = setTimeout(() => setAboutOpen(false), 140)
  }

  const handleNav = (to: string) => {
    setOpen(false)
    setAboutOpen(false)
    setMobileAboutOpen(false)

    if (to.includes('#')) {
      const [path, hash] = to.split('#')
      const targetPath = path === '' ? '/' : path || '/'
      navigate(targetPath)
      if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 50)
    } else {
      navigate(to)
    }
  }

  const isActive = (to: string) => {
    if (to.includes('#')) {
      const [path, hash] = to.split('#')
      const normalizedPath = path === '' ? '/' : path || '/'
      const normalizedHash = hash ? `#${hash}` : ''
      return location.pathname === normalizedPath && location.hash === normalizedHash
    }
    return location.pathname === to
  }

  const linkClass = (active: boolean) =>
    `relative text-sm font-medium transition-colors after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:rounded-full after:transition-opacity ${
      active
        ? 'text-[#23354A] after:bg-soft-accent0 after:opacity-100'
        : 'text-slate-500 hover:text-[#23354A] after:bg-cyan-400 after:opacity-0 hover:after:opacity-100'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-700">
          <img src="/favicon.svg" alt="Brand" className="h-6 w-6" />
          <span className="font-semibold tracking-tight">{site.NAME}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map(item => {
            if (item.type === 'link') {
              const active = isActive(item.to)
              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.to)}
                  className={linkClass(active)}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </button>
              )
            }

            const dropdownActive = item.items.some(child => isActive(child.to))

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={openAboutMenu}
                onMouseLeave={scheduleCloseAbout}
              >
                <button
                  onClick={() => {
                    clearAboutClose()
                    setAboutOpen(prev => !prev)
                  }}
                  onFocus={openAboutMenu}
                  className={`inline-flex items-center gap-1 rounded-lg px-1 py-1 text-sm font-medium transition-colors ${
                    dropdownActive ? 'text-[#23354A]' : 'text-slate-500 hover:text-[#23354A]'
                  }`}
                  aria-haspopup="menu"
                  aria-expanded={aboutOpen}
                >
                  {item.label}
                  <ChevronDown className={`h-4 w-4 transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
                </button>

                {aboutOpen && (
                  <div
                    className="absolute right-0 mt-3 min-w-[200px] overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_24px_60px_rgba(15,41,67,0.22)]"
                    onMouseEnter={openAboutMenu}
                    onMouseLeave={scheduleCloseAbout}
                  >
                    {item.items.map(option => {
                      const optionActive = isActive(option.to)
                      return (
                        <button
                          key={option.label}
                          onClick={() => handleNav(option.to)}
                          className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                            optionActive
                              ? 'bg-soft-accent text-[#23354A]'
                              : 'text-slate-500 hover:bg-soft-accent hover:text-[#23354A]'
                          }`}
                          aria-current={optionActive ? 'page' : undefined}
                        >
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <button
          aria-label="Toggle menu"
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 md:hidden"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200/80 bg-white/92 backdrop-blur md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 md:px-6 lg:px-8">
            {navItems.map(item => {
              if (item.type === 'link') {
                const active = isActive(item.to)
                return (
                  <li key={item.label}>
                    <button
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                        active ? 'bg-soft-accent text-[#23354A]' : 'text-slate-600 hover:bg-soft-accent'
                      }`}
                      onClick={() => handleNav(item.to)}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                    </button>
                  </li>
                )
              }

              const dropdownActive = item.items.some(child => isActive(child.to))

              return (
                <li key={item.label} className="flex flex-col gap-2">
                  <button
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                      dropdownActive ? 'bg-soft-accent text-[#23354A]' : 'text-slate-600 hover:bg-soft-accent'
                    }`}
                    onClick={() => setMobileAboutOpen(prev => !prev)}
                    aria-expanded={mobileAboutOpen}
                    aria-controls="about-mobile-menu"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileAboutOpen && (
                    <div id="about-mobile-menu" className="ml-3 flex flex-col gap-1 rounded-lg border border-slate-200 bg-white/95 p-2">
                      {item.items.map(option => {
                        const optionActive = isActive(option.to)
                        return (
                          <button
                            key={option.label}
                            className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
                              optionActive ? 'bg-soft-accent text-[#23354A]' : 'text-slate-600 hover:bg-soft-accent'
                            }`}
                            onClick={() => handleNav(option.to)}
                            aria-current={optionActive ? 'page' : undefined}
                          >
                            {option.label}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}
