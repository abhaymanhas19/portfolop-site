import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Resume from './pages/Resume'
import Certifications from './pages/Certifications'
import NotFound from './pages/NotFound'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    <div className="min-h-screen flex flex-col relative bg-bg text-fg">
      <Navbar /><ScrollToHash />
      <AnimatePresence>{loading && (<motion.div className="fixed inset-0 z-[60] grid place-items-center bg-bg"
        initial={{opacity:1}} exit={{opacity:0}} transition={{duration:.35}}>
        <motion.div initial={{scale:.9,opacity:0}} animate={{scale:1,opacity:1}} className="text-2xl font-bold text-gradient">Loading…</motion.div>
      </motion.div>)}</AnimatePresence>
      <main className="flex-1"><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/resume" element={<Resume/>}/><Route path="/certifications" element={<Certifications/>}/><Route path="*" element={<NotFound/>}/></Routes></main>
      <Footer />
    </div>
  )
}
