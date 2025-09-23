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
  { type: 'link', label: 'Certifications', to: '/certifications' },
  {
    type: 'dropdown',
    label: 'About',
    items: [
      { label: 'About Me', to: '/about' },
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
    aboutCloseTimeout.current = setTimeout(() => setAboutOpen(false), 120)
  }


  const handleNav = (to: string) => {
    setOpen(false)
    setAboutOpen(false)
    setMobileAboutOpen(false)
    if (to.includes('#')) {
      const [path, hash] = to.split('#')
      const targetPath = path === '' ? '/' : path || '/'
      const target = hash ? `${targetPath}#${hash}` : targetPath
      navigate(target)
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


  return (
    <header className="sticky top-0 z-50 bg-black/50 supports-[backdrop-filter]:bg-black/35 backdrop-blur border-b border-white/10 text-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2">
          <img src="/favicon.svg" alt="Brand" className="h-6 w-6" />
          <span className="font-semibold tracking-tight">{site.NAME}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(item => {
            if (item.type === 'link') {
              const active = isActive(item.to)
              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.to)}
                  className={`text-sm font-medium px-1 py-1 rounded-lg focus-ring transition-colors ${active ? 'text-[#FF6B35]' : 'text-white/80 hover:text-[#FF6B35]'}`}
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
                  className={`inline-flex items-center gap-1 rounded-lg px-1 py-1 text-sm font-medium focus-ring transition-colors ${dropdownActive ? 'text-[#FF6B35]' : 'text-white/80 hover:text-[#FF6B35]'}`}
                  aria-haspopup="menu"
                  aria-expanded={aboutOpen}
                >
                  {item.label}
                  <ChevronDown className={`h-4 w-4 transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
                </button>

                {aboutOpen && (
                  <div
                    className="absolute right-0 mt-3 min-w-[180px] overflow-hidden rounded-2xl border border-white/10 bg-black/90 p-2 shadow-[0_20px_45px_rgba(0,0,0,0.55)]"
                    onMouseEnter={openAboutMenu}
                    onMouseLeave={scheduleCloseAbout}
                  >
                    {item.items.map(option => {
                      const optionActive = isActive(option.to)
                      return (
                        <button
                          key={option.label}
                          onClick={() => handleNav(option.to)}
                          className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${optionActive ? 'bg-white/10 text-[#FF6B35]' : 'text-white/80 hover:bg-white/10'}`}
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
        <button aria-label="Open menu" className="md:hidden p-2 rounded-lg focus-ring text-white" onClick={() => setOpen(v => !v)} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black/80 backdrop-blur border-b border-white/10">
          <ul className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-3 flex flex-col gap-2">
            {navItems.map(item => {
              if (item.type === 'link') {
                const active = isActive(item.to)
                return (
                  <li key={item.label}>
                    <button
                      className={`w-full text-left py-2 rounded-lg focus-ring transition ${active ? 'bg-white/10 text-[#FF6B35]' : 'hover:bg-white/10'}`}
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
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-left focus-ring transition ${dropdownActive ? 'bg-white/10 text-[#FF6B35]' : 'hover:bg-white/10'}`}
                    onClick={() => setMobileAboutOpen(prev => !prev)}
                    aria-expanded={mobileAboutOpen}
                    aria-controls="about-mobile-menu"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileAboutOpen && (
                    <div id="about-mobile-menu" className="ml-2 flex flex-col gap-1 rounded-lg border border-white/10 bg-white/5 p-2">
                      {item.items.map(option => {
                        const optionActive = isActive(option.to)
                        return (
                          <button
                            key={option.label}
                            className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${optionActive ? 'bg-white/10 text-[#FF6B35]' : 'hover:bg-white/10'}`}
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
