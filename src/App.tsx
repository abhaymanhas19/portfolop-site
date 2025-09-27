import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import WhatICanBuild from './pages/WhatICanBuild'
import Resume from './pages/Resume'
import Achievements from './pages/Certifications'
import SkillsDetail from './pages/SkillsDetail'
import ProjectsDetail from './pages/ProjectsDetail'
import ImageGallery from './pages/ImageGallery'
import NotFound from './pages/NotFound'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SplitText from './components/SplitText'

function ScrollToHash() {
  const { hash, pathname } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [hash, pathname])
  return null
}

export default function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t) }, [])
  return (
    <div className="min-h-screen flex flex-col relative bg-background text-foreground">
      <Navbar /><ScrollToHash />
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center bg-surface/80 backdrop-blur-xl"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <span className="text-2xl md:text-3xl font-semibold text-[#FF6B35] text-center block">
                Loading portfolio...
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<SkillsDetail />} />
          <Route path="/projects" element={<ProjectsDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/what-i-can-build" element={<WhatICanBuild />} />
          <Route path="/image-gallery" element={<ImageGallery />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/certifications" element={<Achievements />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
