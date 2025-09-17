import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../data/site'
import { Link } from 'react-router-dom'
import Typing from './Typing'
import { ArrowRight, Download, Sparkles } from 'lucide-react'

export default function HeroSection() {
  const [ready, setReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setReady(true), 150); return () => clearTimeout(t) }, [])

  return (
    // Exact-fit height: viewport minus ~64px sticky navbar (adjust if your navbar is taller/shorter)
    <section className="relative bg-black overflow-hidden min-h-[calc(100vh-64px)]">
      {/* RIGHT background photo */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[52%] sm:w-1/2 lg:w-[56%]">
        <div className="h-full w-full rounded-l-3xl lg:rounded-l-[36px] overflow-hidden ring-1 ring-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
          <img src="/display.png" alt="Portrait / showcase" className="h-full w-full object-cover object-center" />
        </div>
      </div>

      {/* LEFT overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/80 to-transparent" aria-hidden />

      {/* Content aligned with Navbar container; vertically centered */}
      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 min-h-[calc(100vh-64px)] flex items-center">
          <div className="grid md:grid-cols-12 items-center gap-10 w-full">
            {/* LEFT column: text */}
            <div className="relative z-10 md:col-span-7">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white drop-shadow-xl"
              >
                Hi, I’m {site.NAME}
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mt-2 text-2xl md:text-3xl text-white/85 font-semibold"
              >
                <span className="text-[#ff5a1c]">Python</span> & <span className="text-[#ff5a1c]">AI/ML</span> Engineer
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-white/90 max-w-xl"
              >
                <Typing words={[site.TAGLINE, 'Python • Django • DRF • Realtime • RAG', 'Azure • OpenAI • Redis • Postgres']} speed={40} pause={1400} />
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-8 flex flex-col sm:flex-row items-center gap-3"
              >
                <Link
                  to="/#projects"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base sm:text-lg font-semibold bg-[#FF6B35] text-white shadow-lg shadow-black/40 hover:shadow-2xl hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all"
                >
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <Link
                  to="/resume"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base sm:text-lg font-semibold border-2 border-white/80 text-white hover:bg-white hover:text-black shadow-md shadow-black/30 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all"
                >
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Link>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: -6 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45 }}
                className="mt-6 inline-flex items-center gap-2 text-xs bg-[#222] border border-white/10 px-3 py-1 rounded-full shadow-sm text-white/80"
              >
                <Sparkles className="h-3.5 w-3.5" /> Open to opportunities
              </motion.span>
            </div>

            {/* RIGHT spacer column */}
            <div className="md:col-span-5" />
          </div>
        </div>
      </div>
    </section>
  )
}
