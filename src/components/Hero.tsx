import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../data/site'
import { Link } from 'react-router-dom'
import Typing from './Typing'
import { ArrowRight, Download, Sparkles } from 'lucide-react'
import SplitText from './SplitText'
import LetterGlitch from './LetterGlitch'

export default function HeroSection() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      <LetterGlitch
        glitchSpeed={42}
        centerVignette
        outerVignette
        smooth
        className="min-h-screen w-full"
        overlayClassName="flex items-center justify-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-6 text-center text-white"
        >
          <div className="relative mx-auto w-full max-w-4xl px-4">
            <SplitText
              text={`Hi, I’m ${site.NAME}`}
              className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_0_35px_rgba(0,0,0,0.9)] md:text-6xl"
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

          <div className="relative mx-auto w-full max-w-2xl px-4">
            <SplitText
              text="Python & AI/ML Engineer"
              className="mx-auto text-2xl font-semibold text-white md:text-3xl"
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
                  const content = word.textContent?.trim();
                  if (content === 'Python' || content === 'AI/ML') {
                    word.classList.add('text-[#FF6B35]');
                  }
                  if (content === 'Engineer') {
                    word.classList.add('text-white');
                  }
                });
                split.chars?.forEach((char) => {
                  if (char.textContent === '&') {
                    char.classList.add('text-white');
                  }
                });
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mx-auto max-w-xl text-base text-white/80 md:text-lg"
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
            className="flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              to="/projects"
              className="inline-flex items-center justify-center rounded-full bg-[#FF6B35] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-black/40 transition-all hover:shadow-2xl hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-lg"
            >
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              to="/resume"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/80 px-6 py-3 text-base font-semibold text-white shadow-md shadow-black/30 transition-all hover:bg-white hover:text-black hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-lg"
            >
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </Link>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs text-white/80 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5" /> Open to opportunities
          </motion.span>
        </motion.div>
      </LetterGlitch>
    </section>
  )
}
