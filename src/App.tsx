import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CapabilityTicker from './components/CapabilityTicker'
import Home from './pages/Home'
import About from './pages/About'
import Resume from './pages/Resume'
import Achievements from './pages/Certifications'
import SkillsDetail from './pages/SkillsDetail'
import ProjectsDetail from './pages/ProjectsDetail'
import ImageGallery from './pages/ImageGallery'
import NotFound from './pages/NotFound'
import EasterEgg from './pages/EasterEgg'
import { useEffect, useState } from 'react'

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
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className="relative flex min-h-screen flex-col bg-white text-slate-700">
      <Navbar />
      <CapabilityTicker />
      <ScrollToHash />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<SkillsDetail />} />
          <Route path="/projects" element={<ProjectsDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/image-gallery" element={<ImageGallery />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/certifications" element={<Achievements />} />
          <Route path="/easter-egg" element={<EasterEgg />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
