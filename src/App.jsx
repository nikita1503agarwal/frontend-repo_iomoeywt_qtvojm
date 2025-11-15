import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import { About, Events, Gallery, Registration, Contact } from './components/Sections'
import { useEffect } from 'react'

function App() {
  // Countdown to a fixed fest date
  useEffect(() => {
    const festDate = new Date('2025-02-20T18:00:00')
    const update = () => {
      const now = new Date()
      const diff = Math.max(0, festDate - now)
      const d = Math.floor(diff / (1000 * 60 * 60 * 24))
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const m = Math.floor((diff / (1000 * 60)) % 60)
      const s = Math.floor((diff / 1000) % 60)
      const pad = (n) => String(n).padStart(2, '0')
      const map = { days: d, hours: h, mins: m, secs: s }
      Object.entries(map).forEach(([k, v]) => {
        const el = document.getElementById(`count-${k}`)
        if (el) el.textContent = pad(v)
      })
    }
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white selection:bg-fuchsia-500/40 selection:text-white">
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Events />
      <Gallery />
      <Registration />
      <Contact />
      <footer className="py-8 text-center text-white/60">© 2025 Cultura Fest — Where Creativity Meets Infinity</footer>
    </div>
  )
}

export default App
