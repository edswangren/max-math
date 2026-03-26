import { Link } from 'react-router-dom'
import { getWeakSpots } from '../store/weakspots'
import { getStandardByCode } from '../data/teks-catalog'

export default function WeakSpots() {
  const spots = getWeakSpots(10)

  return (
    <div>
      <Link to="/" className="text-neon text-sm hover:underline mb-4 inline-block">&larr; Home</Link>
      <h1 className="text-2xl font-black mb-2">Weak Spots</h1>
      <p className="text-sm text-smoke mb-6">Topics that keep catching you lacking. Time for revenge.</p>

      {spots.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-smoke text-lg">No weak spots yet.</p>
          <p className="text-smoke/50 text-sm mt-1">Either you haven't practiced or you're just built different.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {spots.map((s) => {
            const std = getStandardByCode(s.teksCode)
            const pct = Math.round(s.errorRate * 100)
            return (
              <div key={s.templateId} className="border border-lava/30 rounded-xl p-4 bg-lava/5 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-sm text-lava">{s.teksCode}</span>
                  <span className="text-sm text-white ml-2">{std?.title}</span>
                  <p className="text-xs text-smoke mt-1">
                    {s.errorCount} errors / {s.totalSeen} seen &middot; <span className="text-lava font-bold">{pct}% error rate</span>
                  </p>
                </div>
                <Link
                  to={`/practice/${s.teksCode}`}
                  className="bg-lava text-white font-bold px-3 py-1 rounded-lg text-sm hover:bg-lava-dim transition-colors shrink-0"
                >
                  Fix it
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
