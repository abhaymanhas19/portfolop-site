import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../data/site'
import { Link } from 'react-router-dom'
import Typing from './Typing'
import { ArrowRight, Download, Sparkles } from 'lucide-react'
import SplitText from './SplitText'
import LetterGlitch from './LetterGlitch'
import HyperspeedBackground, { type HyperspeedOptions } from './HyperspeedBackground'



export default function HeroSection() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-12 px-6 py-24 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex w-full flex-1 flex-col items-center justify-center gap-6 text-center text-white lg:items-start lg:text-left"
        >
          <div className="relative w-full max-w-3xl px-4 lg:max-w-none lg:px-0">
            <SplitText
              text={`Hi, I’m ${site.NAME}`}
              className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_0_35px_rgba(0,0,0,0.9)] md:text-6xl"
              delay={90}
              duration={0.8}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 28 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.05}
              rootMargin="-120px"
              tag="h1"
              textAlign="center"
            />
          </div>

          <div className="relative w-full max-w-2xl px-4 lg:max-w-none lg:px-0">
            <SplitText
              text="Python & AI/ML Engineer"
              className="mx-auto text-2xl font-semibold text-white md:text-3xl lg:mx-0"
              delay={120}
              duration={0.12}
              ease="power3.out"
              splitType="words, chars"
              from={{ opacity: 0, y: 22 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.05}
              rootMargin="-120px"
              tag="h2"
              textAlign="center"
              mutateSplit={(split) => {
                split.words?.forEach((word) => {
                  const content = word.textContent?.trim()
                  if (content === 'Python' || content === 'AI/ML') {
                    word.classList.add('text-[#FF6B35]')
                  }
                  if (content === 'Engineer') {
                    word.classList.add('text-white')
                  }
                })
                split.chars?.forEach((char) => {
                  if (char.textContent === '&') {
                    char.classList.add('text-white')
                  }
                })
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="max-w-xl text-base text-white/80 md:text-lg lg:text-left"
          >
            <Typing
              words={[site.TAGLINE, 'Python • Django • DRF • Realtime • RAG', 'Azure • OpenAI • Redis • Postgres']}
              speed={40}
              pause={1400}
            />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <Link
              to="/projects"
              className="inline-flex items-center justify-center rounded-full bg-[#FF6B35] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-black/40 transition-all hover:shadow-2xl hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-lg"
            >
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              to="/resume"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/80 px-6 py-3 text-base font-semibold text-white shadow-md shadow-black/30 transition-all hover:bg-white hover:text-black hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-lg"
            >
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </Link>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-surface/60 px-3 py-1 text-xs text-white/80 shadow-sm lg:self-start"
          >
            <Sparkles className="h-3.5 w-3.5" /> Open to opportunities
          </motion.span>
        </motion.div>

      </div>
    </section>
  )
}
