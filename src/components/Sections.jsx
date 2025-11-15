import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Music2, Drama, Palette, Stars, MapPin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react'

function SectionShell({ id, title, subtitle, children }) {
  return (
    <section id={id} className="relative py-24 sm:py-32 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(40%_30%_at_70%_10%,rgba(168,85,247,0.15),transparent),radial-gradient(30%_20%_at_20%_70%,rgba(56,189,248,0.12),transparent)]" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-cyan-300 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">{title}</h2>
          {subtitle && <p className="mt-3 text-white/80">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

export function About() {
  const items = [
    { icon: Palette, label: 'Art' },
    { icon: Music2, label: 'Music' },
    { icon: Drama, label: 'Drama' },
    { icon: Stars, label: 'Dance' },
  ]
  return (
    <SectionShell id="about" title="About the Fest" subtitle="A celebration of art, music, dance and drama">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={label}
            whileInView={{ rotateY: [0, 360] }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 6, ease: 'linear' }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-[0_0_30px_rgba(56,189,248,0.15)]"
          >
            <Icon className="w-10 h-10 text-cyan-300" />
            <div className="mt-3 text-white font-semibold">{label}</div>
            <p className="text-white/70 text-sm mt-2">Immersive showcases, performances, and workshops.</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}

export function Events() {
  const events = [
    { key: 'dance', title: 'Dance Battle', color: 'from-fuchsia-500 to-cyan-400' },
    { key: 'music', title: 'Music Jam', color: 'from-cyan-400 to-amber-300' },
    { key: 'drama', title: 'Stage Play', color: 'from-purple-500 to-fuchsia-400' },
    { key: 'tech', title: 'Tech Carnival', color: 'from-indigo-500 to-cyan-400' },
  ]

  const [active, setActive] = useState(null)

  return (
    <SectionShell id="events" title="Events" subtitle="Tap a sphere to view details">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {events.map((e, idx) => (
          <motion.button
            key={e.key}
            whileHover={{ scale: 1.06 }}
            onClick={() => setActive(e)}
            className={`aspect-square rounded-full bg-gradient-to-br ${e.color} shadow-[0_0_40px_rgba(168,85,247,0.35)] border border-white/10 relative overflow-hidden`}
          >
            <span className="absolute inset-0 bg-white/20 blur-2xl opacity-40" />
            <span className="relative z-10 text-white font-semibold">{e.title}</span>
          </motion.button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-lg w-full bg-zinc-900/90 border border-white/10 rounded-3xl p-6">
            <div className="text-2xl font-bold text-white">{active.title}</div>
            <p className="text-white/80 mt-2">High-energy performances, knockout rounds, and prizes. Bring your A-game.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setActive(null)} className="px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20">Close</button>
              <a href="#register" className="px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white">Register</a>
            </div>
          </motion.div>
        </div>
      )}
    </SectionShell>
  )
}

export function Gallery() {
  const imgs = useMemo(() => [
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
  ], [])

  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % imgs.length), 3000)
    return () => clearInterval(t)
  }, [imgs.length])

  return (
    <SectionShell id="gallery" title="Gallery" subtitle="Moments from the stage">
      <div className="relative h-72 sm:h-96 overflow-hidden rounded-3xl border border-white/10">
        {imgs.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt="Cultura moment"
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            animate={{ x: `${(i - index) * 100}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        ))}
      </div>
    </SectionShell>
  )
}

export function Registration() {
  return (
    <SectionShell id="register" title="Register" subtitle="Secure your spot with a neon-glow form">
      <form onSubmit={(e) => e.preventDefault()} className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
        {['Name','Email','College','Event'].map((label) => (
          <div key={label} className="col-span-2 sm:col-span-1">
            <label className="block text-sm text-white/80 mb-2">{label}</label>
            <input required placeholder={label}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
          </div>
        ))}
        <div className="sm:col-span-2">
          <label className="block text-sm text-white/80 mb-2">Message</label>
          <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-400" placeholder="Tell us more" />
        </div>
        <div className="sm:col-span-2 flex justify-center">
          <button className="relative px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-fuchsia-500 via-purple-600 to-cyan-500 shadow-[0_0_30px_rgba(56,189,248,0.45)] hover:shadow-[0_0_50px_rgba(236,72,153,0.55)] transition">
            Submit
            <span className="absolute inset-0 rounded-full bg-white/20 blur opacity-0 hover:opacity-100 transition" />
          </button>
        </div>
      </form>
    </SectionShell>
  )
}

export function Contact() {
  return (
    <SectionShell id="contact" title="Contact" subtitle="Find us on campus and online">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-900 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="w-12 h-12 text-cyan-300 animate-bounce" />
          </div>
          <iframe title="map" className="w-full h-full opacity-60" src="https://www.openstreetmap.org/export/embed.html?bbox=77.58%2C12.96%2C77.62%2C12.98&layer=mapnik" />
        </div>
        <div className="flex items-center lg:items-start justify-center lg:justify-start gap-4">
          {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
            <a key={i} href="#" className="p-3 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 text-white">
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
