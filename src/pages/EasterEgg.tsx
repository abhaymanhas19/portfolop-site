import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import InteractiveParticleBackground from '../components/InteractiveParticleBackground'

export default function EasterEgg() {
  return (
    <div className="relative">
      <InteractiveParticleBackground />

      <Link
        to="/"
        className="fixed bottom-4 left-4 z-20 flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white/90 backdrop-blur-xl transition hover:bg-white/20"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  )
}
