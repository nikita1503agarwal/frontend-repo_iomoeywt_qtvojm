import { useEffect, useRef } from 'react'

export default function Ticker() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const content = el.innerHTML
    el.innerHTML = content + content // duplicate for seamless loop
  }, [])
  return (
    <div className="relative w-full overflow-hidden bg-black/60 border-y border-white/10">
      <div ref={ref} className="whitespace-nowrap animate-[ticker_20s_linear_infinite] text-cyan-200 py-2">
        <span className="mx-8">Live Update: Registrations now open!</span>
        <span className="mx-8">New: Tech Carnival with AR/VR zone</span>
        <span className="mx-8">Headliner: Midnight DJ Neon Rush</span>
        <span className="mx-8">Workshops: Filmmaking, Street Art, Beatboxing</span>
      </div>
      <style>{`@keyframes ticker {0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
