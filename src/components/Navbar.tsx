import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { site } from '../data/site'
const navItems = [{label:'Home',to:'/'},{label:'Skills',to:'/#skills'},{label:'Projects',to:'/#projects'},{label:'Certifications',to:'/certifications'},{label:'About',to:'/about'},{label:'Resume',to:'/resume'},{label:'Contact',to:'/#contact'}]
export default function Navbar(){
  const [open,setOpen]=useState(false); const navigate=useNavigate()
  const handleNav=(to:string)=>{ setOpen(false); if(to.includes('#')){ const [path,hash]=to.split('#'); if(path===''||path==='/'){ navigate('/',{replace:false}); setTimeout(()=>document.getElementById(hash)?.scrollIntoView({behavior:'smooth'}),50)} else { navigate(path+'#'+hash)} } else { navigate(to)} }
  return (<header className="sticky top-0 z-50 bg-[rgba(0,0,0,0.35)] backdrop-blur border-b border-border">
    <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
      <Link to="/" className="inline-flex items-center gap-2"><img src="/favicon.svg" alt="Brand" className="h-6 w-6"/><span className="font-semibold">{site.NAME}</span></Link>
      <nav className="hidden md:flex items-center gap-6">{navItems.map(n=>(<button key={n.label} onClick={()=>handleNav(n.to)} className="text-sm text-[#FFFFFF] opacity-80 hover:opacity-100 hover:text-[#FF6B35] focus-ring px-1 py-1 rounded-lg">{n.label}</button>))}</nav>
      <button aria-label="Open menu" className="md:hidden p-2 rounded-lg focus-ring text-fg" onClick={()=>setOpen(v=>!v)} aria-expanded={open}>{open?<X/>:<Menu/>}</button>
    </div>
    {open && (<div className="md:hidden bg-bg border-b border-border"><ul className="px-4 py-3 flex flex-col gap-2">{navItems.map(n=>(<li key={n.label}><button className="w-full text-left py-2 rounded-lg hover:bg-[#222] focus-ring" onClick={()=>handleNav(n.to)}>{n.label}</button></li>))}</ul></div>)}
  </header>)
}
