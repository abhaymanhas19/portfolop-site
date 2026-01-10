import { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { site } from '../data/site'

type MegaSection = {
  title: string
  description?: string
  items: Array<{ label: string; to: string; description?: string }>
}

type NavItem =
  | { type: 'link'; label: string; to: string }
  | { type: 'mega'; label: string; sections: MegaSection[] }

const navItems: NavItem[] = [
  { type: 'link', label: 'Home', to: '/' },
  { type: 'link', to: '/projects', label: 'Projects' },
  {
    type: 'mega',
    label: 'Skills & Achievements',
    sections: [
      {
        title: 'Capabilities',
        description: 'How I design, build, and automate resilient products.',
        items: [
          { label: 'Skills Overview', to: '/skills', description: 'Backend, AI/ML, and automation specializations.' },
        ],
      },
      {
        title: 'Portfolio & Proof',
        description: 'Explore problem spaces I have solved end-to-end.',
        items: [
          {
            label: 'Achievements',
            to: '/certifications',
            description: 'Certifications and recognitions that back the work.',
          },
        ],
      },
      {
        title: 'Visual Library',
        description: 'Immersive snapshots from builds, workshops, and launches.',
        items: [{ label: 'Project Visuals', to: '/image-gallery', description: 'Visual highlights from deployments.' }],
      },
      {
        title: 'Resources',
        description: 'Quick access to assets you can share with stakeholders.',
        items: [{ label: 'Resume', to: '/resume', description: 'Download the latest resume PDF.' }],
      },
    ],
  },
  { type: 'link', label: 'About', to: '/about' },
  { type: 'link', label: 'Contact', to: '/#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileMegaOpen, setMobileMegaOpen] = useState(false)
  const megaCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const clearMegaClose = () => {
    if (megaCloseTimeout.current) {
      clearTimeout(megaCloseTimeout.current)
      megaCloseTimeout.current = null
    }
  }

  const openMegaMenu = () => {
    clearMegaClose()
    setMegaOpen(true)
  }

  const scheduleCloseMega = () => {
    clearMegaClose()
    megaCloseTimeout.current = setTimeout(() => setMegaOpen(false), 140)
  }

  const handleNav = (to: string) => {
    setOpen(false)
    setMegaOpen(false)
    setMobileMegaOpen(false)

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
    <header className="relative sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
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

            const dropdownActive = item.sections.some(section =>
              section.items.some(child => isActive(child.to)),
            )

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={openMegaMenu}
                onMouseLeave={scheduleCloseMega}
              >
                <button
                  onClick={() => {
                    if (megaOpen) {
                      setMegaOpen(false)
                    } else {
                      openMegaMenu()
                    }
                  }}
                  onFocus={openMegaMenu}
                  className={`inline-flex items-center gap-1 rounded-lg px-1 py-1 text-sm font-medium transition-colors ${
                    dropdownActive ? 'text-[#23354A]' : 'text-slate-500 hover:text-[#23354A]'
                  }`}
                  aria-haspopup="menu"
                  aria-expanded={megaOpen}
                >
                  {item.label}
                  <ChevronDown className={`h-4 w-4 transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
                </button>

                {megaOpen && (
                  <div
                    className="absolute right-0 top-full z-40 mt-6 hidden w-[min(100vw-3rem,900px)] md:block"
                    onMouseEnter={openMegaMenu}
                    onMouseLeave={scheduleCloseMega}
                  >
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-[0_40px_120px_rgba(15,41,67,0.22)] backdrop-blur">
                      <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
                        {item.sections.map(section => (
                          <div key={section.title} className="space-y-4">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#23354A]/80">
                                {section.title}
                              </p>
                              {section.description && (
                                <p className="mt-2 text-sm text-slate-500">{section.description}</p>
                              )}
                            </div>
                            <div className="space-y-2">
                              {section.items.map(option => {
                                const optionActive = isActive(option.to)
                                return (
                                  <button
                                    key={option.label}
                                    onClick={() => handleNav(option.to)}
                                    className={`group w-full rounded-2xl border border-transparent px-4 py-3 text-left transition-all ${
                                      optionActive
                                        ? 'border-emerald-200 bg-emerald-50 text-[#23354A]'
                                        : 'text-slate-600 hover:-translate-y-[2px] hover:border-emerald-200/80 hover:bg-emerald-50/60 hover:text-[#23354A]'
                                    }`}
                                    aria-current={optionActive ? 'page' : undefined}
                                  >
                                    <span className="flex items-center justify-between text-sm font-semibold">
                                      {option.label}
                                      <span className="text-xs text-emerald-500 transition group-hover:translate-x-1">
                                        →
                                      </span>
                                    </span>
                                    {option.description && (
                                      <span className="mt-1 block text-xs text-slate-500">
                                        {option.description}
                                      </span>
                                    )}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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

              const dropdownActive = item.sections.some(section =>
                section.items.some(child => isActive(child.to)),
              )

              return (
                <li key={item.label} className="flex flex-col gap-2">
                  <button
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                      dropdownActive ? 'bg-soft-accent text-[#23354A]' : 'text-slate-600 hover:bg-soft-accent'
                    }`}
                    onClick={() => setMobileMegaOpen(prev => !prev)}
                    aria-expanded={mobileMegaOpen}
                    aria-controls="mega-mobile-menu"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileMegaOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileMegaOpen && (
                    <div id="mega-mobile-menu" className="ml-3 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white/95 p-3">
                      {item.sections.map(section => (
                        <div key={section.title} className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                            {section.title}
                          </p>
                          {section.items.map(option => {
                            const optionActive = isActive(option.to)
                            return (
                              <button
                                key={option.label}
                                className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
                                  optionActive
                                    ? 'bg-soft-accent text-[#23354A]'
                                    : 'text-slate-600 hover:bg-soft-accent'
                                }`}
                                onClick={() => handleNav(option.to)}
                                aria-current={optionActive ? 'page' : undefined}
                              >
                                <span className="font-medium">{option.label}</span>
                                {option.description && (
                                  <span className="mt-0.5 block text-xs text-slate-500">
                                    {option.description}
                                  </span>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      ))}
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
