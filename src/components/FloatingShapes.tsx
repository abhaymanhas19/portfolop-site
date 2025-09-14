
import { motion } from 'framer-motion'

export default function FloatingShapes(){
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* Blurred orange blobs */}
      <motion.div initial={{opacity:0, y:10}} animate={{opacity:.5, y:0}} transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute top-20 left-[-60px] w-[220px] h-[220px] rounded-full bg-gradient-brand shape-blur" />
      <motion.div initial={{opacity:0, y:10}} animate={{opacity:.5, y:0}} transition={{ duration: 1.2, delay: .2, ease: 'easeOut' }}
        className="absolute bottom-10 right-[-80px] w-[280px] h-[280px] rounded-full bg-gradient-brand shape-blur" />
      {/* Outline triangle */}
      <motion.svg width="160" height="160" viewBox="0 0 160 160" className="absolute right-[20%] top-[10%] opacity-60"
        animate={{ rotate: [0, 10, 0], y: [0, -10, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}>
        <polygon points="80,10 150,150 10,150" fill="none" stroke="url(#g)" strokeWidth="2"/>
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF6B35"/><stop offset="1" stopColor="#FF9D71"/>
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  )
}
