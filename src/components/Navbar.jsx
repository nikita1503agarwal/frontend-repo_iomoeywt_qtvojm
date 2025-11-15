import { useState, useEffect } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#events', label: 'Events' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#register', label: 'Register' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'backdrop-blur-md bg-black/40 shadow-[0_0_40px_rgba(0,255,255,0.15)]' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <Sparkles className="text-cyan-300" />
          <span className="font-semibold tracking-wide text-white">Cultura 2025</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/80 hover:text-white transition relative">
              {l.label}
              <span className="absolute -bottom-2 left-0 h-[2px] w-0 group-hover:w-full transition-all bg-gradient-to-r from-fuchsia-400 to-cyan-300"></span>
            </a>
          ))}
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm md:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="absolute right-0 top-0 h-full w-80 bg-zinc-900/90 border-l border-white/10 p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-white font-semibold">Cultura 2025</span>
                <button className="text-white" onClick={() => setOpen(false)} aria-label="Close menu">
                  <X />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {links.map((l) => (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-lg text-white/90 hover:text-white">
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
