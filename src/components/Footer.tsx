import { useNavigate, Link } from 'react-router-dom'
import { Github, Linkedin, Instagram, Twitter, Mail, type LucideIcon } from 'lucide-react'
import { site } from '../data/site'
import { socials } from '../data/content'

const socialIcons: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Instagram,
  Twitter,
}

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Skills', to: '/skills' },
  { label: 'Projects', to: '/projects' },
  { label: 'Project Visuals', to: '/image-gallery' },
  { label: 'Achievements', to: '/certifications' },
  { label: 'About', to: '/about' },
  { label: 'Resume', to: '/resume' },
]

export default function Footer() {
  const navigate = useNavigate()

  const gotoContact = () => {
    navigate('/#contact')
    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  return (
    <footer className="relative mt-16 overflow-hidden border-t border-slate-200/80 bg-white/90">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent" />

      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-3 text-slate-700 mb-10">
          <img src="/favicon.svg" alt="Brand" className="h-8 w-8" />
          <span className="text-xl font-semibold">{site.NAME}</span>
        </div>

        {/* Navigation and Social Links Row */}
        <div className="flex flex-col md:flex-row md:justify-center md:gap-24 lg:gap-32">
          {/* Routes - Vertical */}
          <nav className="flex flex-col items-center md:items-start gap-3 mb-8 md:mb-0">
            <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-2">Quick Links</h4>
            {footerLinks.map(link => (
              <button
                key={link.label}
                onClick={() => navigate(link.to)}
                className="text-slate-500 transition hover:text-slate-900 hover:translate-x-1 text-sm"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social Icons - Vertical */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-2">Connect</h4>
            {socials.map(handle => {
              const Icon = socialIcons[handle.icon] ?? Mail
              return (
                <a
                  key={handle.id}
                  href={handle.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-slate-500 transition hover:text-slate-900 hover:translate-x-1 text-sm group"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition group-hover:border-slate-300 group-hover:bg-slate-100 group-hover:text-slate-900">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>{handle.label}</span>
                </a>
              )
            })}
            <button onClick={gotoContact} className="flex items-center gap-3 text-slate-500 transition hover:text-slate-900 hover:translate-x-1 text-sm group mt-1">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition group-hover:border-slate-300 group-hover:bg-slate-100 group-hover:text-slate-900">
                <Mail className="h-4 w-4" />
              </span>
              <span>Contact</span>
            </button>
          </div>
        </div>

        {/* Easter Egg Line */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            Relieve some stress with{' '}
            <Link
              to="/easter-egg"
              className="text-emerald-500 font-medium hover:text-emerald-600 transition underline decoration-emerald-300 underline-offset-2 hover:decoration-emerald-500"
            >
              this easter egg
            </Link>
            {' '}made for you
          </p>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="relative border-t border-slate-200/70 bg-white/70 text-center text-xs text-slate-400 py-4">
        © {new Date().getFullYear()} {site.NAME}. All rights reserved.
      </div>
    </footer>
  )
}
