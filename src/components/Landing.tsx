import { Link } from 'react-router-dom'
import { strands } from '../data/teks-catalog'
import { hasTemplates } from '../templates/registry'
import { getAllProgress } from '../store/progress'

const strandColors = [
  { bg: 'bg-void-light', border: 'border-lava/40', accent: 'text-lava' },
  { bg: 'bg-void-light', border: 'border-neon/40', accent: 'text-neon' },
  { bg: 'bg-void-light', border: 'border-purple-500/40', accent: 'text-purple-400' },
  { bg: 'bg-void-light', border: 'border-orange-500/40', accent: 'text-orange-400' },
  { bg: 'bg-void-light', border: 'border-yellow-500/40', accent: 'text-yellow-400' },
]

const greetings = [
  "Let's get it, Max!",
  "Math time, baby!",
  "Max vs. Math. Round 1. FIGHT.",
  "Welcome back, legend.",
  "The math isn't gonna do itself, Max.",
  "Max: 1, Homework: 0",
  "Bro woke up and chose math.",
]

export default function Landing() {
  const progress = getAllProgress()
  const greeting = greetings[Math.floor(Math.random() * greetings.length)]

  return (
    <div>
      <h1 className="text-3xl font-black mb-1">{greeting}</h1>
      <p className="text-smoke text-sm mb-8">Pick a strand and start grinding.</p>
      <div className="grid gap-5">
        {strands.map((s, idx) => {
          const colors = strandColors[idx]
          const available = s.standards.filter((st) => hasTemplates(st.code))
          const practiced = s.standards.filter((st) => progress[st.code]?.attempted > 0)
          const total = s.standards.length
          const pct = total > 0 ? (practiced.length / total) * 100 : 0

          return (
            <Link
              key={s.id}
              to={`/strand/${s.id}`}
              className={`border rounded-xl p-5 ${colors.bg} ${colors.border} hover:border-white/40 transition-all block group`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className={`font-bold text-lg ${colors.accent}`}>{s.name}</h2>
                  <p className="text-smoke text-sm">
                    {available.length}/{total} topics &middot; {practiced.length} practiced
                  </p>
                </div>
                <span className="text-smoke group-hover:text-white text-xl transition-colors">&rarr;</span>
              </div>
              <div className="mt-3 h-2 bg-void-lighter rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-lava to-neon rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-8 flex gap-6 justify-center">
        <Link to="/history" className="text-sm text-smoke hover:text-neon transition-colors">Session History</Link>
        <Link to="/weak-spots" className="text-sm text-smoke hover:text-lava transition-colors">Weak Spots</Link>
      </div>
    </div>
  )
}
