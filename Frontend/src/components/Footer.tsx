import { useNavigate, Link } from 'react-router-dom'
import { Github, Linkedin, Instagram, Twitter, Mail, type LucideIcon } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortfolio'

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
  { label: 'Study Blogs', to: '/blogs' },
  { label: 'Achievements', to: '/certifications' },
  { label: 'About', to: '/about' },
  { label: 'Resume', to: '/resume' },
]

export default function Footer() {
  const navigate = useNavigate()
  const { branding, socials } = usePortfolio()

  const gotoContact = () => {
    navigate('/#contact')
    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  return (
    <footer className="relative mt-16 overflow-hidden bg-surface-container-low">
      <div className="relative mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <img src="/favicon.svg" alt="Brand" className="h-8 w-8" />
          <span className="font-display text-xl font-semibold text-[#2a3439]">{branding.name}</span>
        </div>

        {/* Navigation and Social Links Row */}
        <div className="flex flex-col md:flex-row md:justify-center md:gap-24 lg:gap-32">
          {/* Routes - Vertical */}
          <nav className="flex flex-col items-center md:items-start gap-3 mb-8 md:mb-0">
            <h4 className="font-display text-sm font-semibold text-[#2a3439] uppercase tracking-wider mb-2">Quick Links</h4>
            {footerLinks.map(link => (
              <button
                key={link.label}
                onClick={() => navigate(link.to)}
                className="text-[#565e74] transition hover:text-[#005bc4] hover:translate-x-1 text-sm"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social Icons - Vertical */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h4 className="font-display text-sm font-semibold text-[#2a3439] uppercase tracking-wider mb-2">Connect</h4>
            {socials.map(handle => {
              const Icon = socialIcons[handle.icon as keyof typeof socialIcons] ?? Mail
              return (
                <a
                  key={handle.id}
                  href={handle.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-[#565e74] transition hover:text-[#005bc4] hover:translate-x-1 text-sm group"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-surface-container-lowest text-[#565e74] transition group-hover:text-[#005bc4] shadow-ambient-sm">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>{handle.label}</span>
                </a>
              )
            })}
            <button onClick={gotoContact} className="flex items-center gap-3 text-[#565e74] transition hover:text-[#005bc4] hover:translate-x-1 text-sm group mt-1">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-surface-container-lowest text-[#565e74] transition group-hover:text-[#005bc4] shadow-ambient-sm">
                <Mail className="h-4 w-4" />
              </span>
              <span>Contact</span>
            </button>
          </div>
        </div>

        {/* Easter Egg Line */}
        <div className="mt-12 text-center">
          <p className="text-[#565e74] text-sm">
            Relieve some stress with{' '}
            <Link
              to="/easter-egg"
              className="text-[#005bc4] font-medium hover:text-[#004fad] transition"
            >
              this easter egg
            </Link>
            {' '}made for you
          </p>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="relative bg-surface-container-high text-center text-xs text-[#565e74] py-4">
        © {new Date().getFullYear()} {branding.name}. All rights reserved.
      </div>
    </footer>
  )
}
