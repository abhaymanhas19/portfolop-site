import { motion } from 'framer-motion'
import { site } from '../data/site'
import { ArrowRight, Download, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import FlowTextRing from './FlowTextRing'
import SpaceEarth from './SpaceEarth'
import ParticleField from './ParticleField'
import FloatingShapes from './FloatingShapes'
import Typing from './Typing'
import { useEffect, useState } from 'react'

export default function Hero(){
  const [imgLoaded,setImgLoaded]=useState(false); const [ready,setReady]=useState(false)
  useEffect(()=>{ const t=setTimeout(()=>setReady(true),150); return ()=>clearTimeout(t)},[])
  return (<section className="relative overflow-hidden">\n    <SpaceEarth />\n    <ParticleField />\n    <FloatingShapes />\n    <SpaceEarth />
    <div className="hero-aurora z-10"/><div className="grid-floor z-10"/>
    <FlowTextRing text="Python • AI/ML • RAG • Realtime • Azure • Django • " radius={360} size={64} speedSec={30} tiltDeg={36} yPercent={42}/>
    <FlowTextRing text="OpenAI • Gemini • DRF • Redis • Postgres • WebSockets • " radius={260} size={52} speedSec={22} tiltDeg={36} yPercent={55}/>
    <div className="mx-auto max-w-6xl px-4 py-24 md:py-28 relative z-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="relative z-10">
          <motion.h1 initial={{opacity:0,y:20}} animate={ready?{opacity:1,y:0}:{}} transition={{duration:.6}} className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"><span className="text-gradient">{site.NAME}</span></motion.h1>
          <motion.h2 initial={{opacity:0,y:20}} animate={ready?{opacity:1,y:0}:{}} transition={{duration:.6,delay:.05}} className="mt-2 text-2xl md:text-3xl text-[#FFFFFF] opacity-80 font-semibold">{site.ROLE}</motion.h2>
          <motion.p initial={{opacity:0,y:10}} animate={ready?{opacity:1,y:0}:{}} transition={{duration:.5,delay:.1}} className="mt-4 text-[#FFFFFF] max-w-xl"><Typing words={[site.TAGLINE, "Python • Django • DRF • Realtime • RAG", "Azure • OpenAI • Redis • Postgres"]} speed={40} pause={1400} /></motion.p>
          <motion.div initial={{opacity:0,y:10}} animate={ready?{opacity:1,y:0}:{}} transition={{duration:.5,delay:.15}} className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <a href="/#projects" className="inline-flex items-center gap-2 bg-gradient-brand text-[#1A1A1A] font-medium px-5 py-3 rounded-xl shadow-glow hover:translate-y-[-1px] transition focus-ring orange-glow">View Projects <ArrowRight className="h-4 w-4"/></a>
            <Link to="/resume" className="inline-flex items-center gap-2 bg-transparent border border-border text-fg px-5 py-3 rounded-xl hover:bg-[#222] transition focus-ring"><Download className="h-4 w-4"/> Download Resume</Link>
          </motion.div>
          <motion.span initial={{opacity:0,y:-6}} animate={ready?{opacity:1,y:0}:{}} transition={{delay:.45}} className="mt-6 inline-flex items-center gap-2 text-xs bg-[#222] border border-border px-3 py-1 rounded-full shadow-soft text-[#FFFFFF] opacity-80"><Sparkles className="h-3.5 w-3.5"/> Open to opportunities</motion.span>
        </div>
        <div className="relative z-10">{!imgLoaded && <div className="w-full aspect-[8/5] rounded-2xl skeleton"/>}<img src="/display.png" alt="Demo of projects" className="w-full aspect-[8/5] rounded-2xl border border-border shadow-[0_30px_80px_rgba(0,0,0,0.45)] object-cover" onLoad={()=>setImgLoaded(true)} style={{display: imgLoaded? 'block':'none'}}/></div>
      </div>
    </div>
  </section>)
}
