import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import { ExternalLink, Github, Image as ImageIcon } from 'lucide-react'
import TiltCard from './TiltCard'
export default function Projects(){
  return (<section id="projects" className="mx-auto max-w-6xl px-4 py-16">
    <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5}} className="text-2xl md:text-3xl font-semibold mb-6">Projects</motion.h2>
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((p,i)=>(<motion.article key={p.title} initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.05}}>
        <TiltCard className="rounded-2xl bg-card border border-border overflow-hidden gradient-border">
          <div className="relative group">{p.image? (<img src={p.image} alt={`${p.title} screenshot`} className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-[1.05]"/>) : (<div className="w-full aspect-[16/9] grid place-items-center bg-[#222] text-[#FFFFFF]"><ImageIcon className="h-8 w-8"/></div>)}</div>
          <div className="p-6"><div className="flex items-start justify-between gap-4"><h3 className="text-lg font-semibold text-fg">{p.title}</h3></div>
            <p className="mt-2 text-[#FFFFFF]">{p.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">{p.tags.map(t=>(<span key={t} className="text-xs px-2 py-1 rounded-full bg-[#222] text-[#FFFFFF] opacity-85 border border-border">{t}</span>))}</div>
            <div className="mt-4 flex gap-3">{p.demo && (<a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-fg hover:underline"><ExternalLink className="h-4 w-4"/> Live Demo</a>)}{p.repo && (<a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-fg hover:underline"><Github className="h-4 w-4"/> Source</a>)}</div>
          </div>
        </TiltCard>
      </motion.article>))}
    </div>
  </section>)
}
