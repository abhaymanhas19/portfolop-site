import { site } from '../data/site'
import { Github, Linkedin, Instagram, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
const socials = { GitHub: Github, LinkedIn: Linkedin, Instagram: Instagram } as const
export default function Footer(){
  const navigate = useNavigate()
  const gotoContact=()=>{ navigate('/#contact'); setTimeout(()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}),50) }
  return (<footer className="mt-16 border-t border-border">
    <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3"><img src="/favicon.svg" alt="Brand" className="h-7 w-7"/><span className="font-semibold">{site.NAME}</span></div>
      <nav className="flex flex-wrap justify-center gap-4 text-sm text-[#FFFFFF] opacity-80">
        <Link to="/#skills" className="hover:opacity-100 hover:text-[#FF6B35]">Skills</Link>
        <Link to="/#projects" className="hover:opacity-100 hover:text-[#FF6B35]">Projects</Link>
        <Link to="/certifications" className="hover:opacity-100 hover:text-[#FF6B35]">Certifications</Link>
        <Link to="/about" className="hover:opacity-100 hover:text-[#FF6B35]">About</Link>
        <Link to="/resume" className="hover:opacity-100 hover:text-[#FF6B35]">Resume</Link>
      </nav>
      <div className="flex items-center gap-3">
        {site.SOCIAL.map((s)=>{ const Icon=(socials as any)[s.label]; return (<a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="p-2 rounded-lg hover:bg-[#222]">{Icon? <Icon className="h-5 w-5"/>:<span className='text-sm'>{s.label}</span>}</a>)})}
        <button onClick={gotoContact} className="inline-flex items-center gap-2 bg-gradient-brand text-[#1A1A1A] font-medium px-4 py-2 rounded-lg shadow-glow"><Mail className="h-4 w-4"/> Contact</button>
      </div>
    </div>
    <div className="text-center text-xs text-[#FFFFFF] opacity-60 py-4">© {new Date().getFullYear()} {site.NAME}. All rights reserved.</div>
  </footer>)
}
