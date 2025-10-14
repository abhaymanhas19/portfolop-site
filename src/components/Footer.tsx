import { useNavigate } from 'react-router-dom'
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
  { label: 'Skills', to: '/skills' },
  { label: 'Projects', to: '/projects' },
  { label: 'What I Can Offer', to: '/what-i-can-build' },
  { label: 'Image Gallery', to: '/image-gallery' },
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
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 text-slate-600 md:flex-row md:justify-between md:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-slate-700">
          <img src="/favicon.svg" alt="Brand" className="h-7 w-7" />
          <span className="text-lg font-semibold">{site.NAME}</span>
        </div>

        <nav className="flex flex-wrap justify-center gap-4 text-sm">
          {footerLinks.map(link => (
            <button
              key={link.label}
              onClick={() => navigate(link.to)}
              className="rounded-full px-3 py-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {socials.map(handle => {
            const Icon = socialIcons[handle.icon] ?? Mail
            return (
              <a
                key={handle.id}
                href={handle.url}
                target="_blank"
                rel="noreferrer"
                aria-label={handle.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
              >
                <Icon className="h-4 w-4" />
              </a>
            )
          })}
          <button onClick={gotoContact} className="btn-primary gap-2 px-5 py-2.5 text-sm">
            <Mail className="h-4 w-4" /> Contact
          </button>
        </div>
      </div>

      <div className="relative border-t border-slate-200/70 bg-white/70 text-center text-xs text-slate-400 py-4">
        © {new Date().getFullYear()} {site.NAME}. All rights reserved.
      </div>
    </footer>
  )
}
