import { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  const audioRef = useRef(null)

  useEffect(() => {
    // Attempt autoplay quietly; browsers may block until user interacts
    const a = audioRef.current
    if (a) {
      a.volume = 0.25
      const play = () => a.play().catch(() => {})
      play()
      const onInteract = () => play()
      window.addEventListener('click', onInteract, { once: true })
      return () => window.removeEventListener('click', onInteract)
    }
  }, [])

  return (
    <section id="home" className="relative h-[100svh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/YMbQm4jphL7pTceL/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient glow overlay for vibe; don't block Spline interactions */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(56,189,248,0.15),transparent_60%)]" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-br from-cyan-300 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(168,85,247,0.35)]"
        >
          Cultura 2025
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="max-w-2xl mt-4 text-cyan-100/90"
        >
          Where Creativity Meets Infinity
        </motion.p>

        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
          onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
          className="relative mt-10 px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-fuchsia-500 via-purple-600 to-cyan-500 shadow-[0_0_30px_rgba(56,189,248,0.45)] hover:shadow-[0_0_50px_rgba(236,72,153,0.55)] transition focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          <span className="relative z-10">Join the Celebration</span>
          <span className="absolute inset-0 rounded-full bg-white/20 blur opacity-0 hover:opacity-100 transition" />
        </motion.button>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 grid grid-cols-4 gap-4 text-cyan-100/90"
        >
          {['Days','Hours','Mins','Secs'].map((l, i) => (
            <div key={l} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 min-w-20">
              <div id={`count-${l.toLowerCase()}`} className="text-2xl sm:text-3xl font-bold">00</div>
              <div className="text-xs mt-1 uppercase tracking-widest text-white/70">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Ambient audio */}
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/10/10/audio_8a3cb5b4d8.mp3?filename=future-technology-ambient-124331.mp3" />
    </section>
  )
}
