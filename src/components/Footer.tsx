import { site } from '../data/site'
import { Github, Linkedin, Instagram, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const socials = { GitHub: Github, LinkedIn: Linkedin, Instagram: Instagram } as const

export default function Footer(){
  const navigate = useNavigate()
  const gotoContact = () => {
    navigate('/#contact')
    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' }), 50)
  }

  return (
    <footer className="mt-16 border-t border-white/10 bg-gradient-to-r from-black via-neutral-950 to-black relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="Brand" className="h-7 w-7"/>
          <span className="font-semibold text-white">{site.NAME}</span>
        </div>

        {/* Nav */}
        <nav className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
          <Link to="/skills" className="hover:opacity-100 hover:text-[#ff5a1c] transition">Skills</Link>
          <Link to="/projects" className="hover:opacity-100 hover:text-[#ff5a1c] transition">Projects</Link>
          <Link to="/certifications" className="hover:opacity-100 hover:text-[#ff5a1c] transition">Certifications</Link>
          <Link to="/about" className="hover:opacity-100 hover:text-[#ff5a1c] transition">About</Link>
          <Link to="/resume" className="hover:opacity-100 hover:text-[#ff5a1c] transition">Resume</Link>
        </nav>

        {/* Socials + Contact */}
        <div className="flex items-center gap-3">
          {site.SOCIAL.map((s) => {
            const Icon = (socials as any)[s.label]
            return (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="p-2 rounded-lg text-white/80 hover:text-[#ff5a1c] hover:bg-white/10 transition"
              >
                {Icon ? <Icon className="h-5 w-5" /> : <span className="text-sm">{s.label}</span>}
              </a>
            )
          })}
          <button
            onClick={gotoContact}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2
                       bg-[#ff5a1c] text-black font-medium
                       shadow-[0_8px_24px_rgba(255,90,28,0.35)]
                       hover:shadow-[0_12px_36px_rgba(255,90,28,0.5)]
                       hover:-translate-y-0.5 transition
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <Mail className="h-4 w-4" /> Contact
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-white/60 py-4">
        © {new Date().getFullYear()} {site.NAME}. All rights reserved.
      </div>
    </footer>
  )
}
