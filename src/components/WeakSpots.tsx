import { Link } from 'react-router-dom'
import { getWeakSpots } from '../store/weakspots'
import { getStandardByCode } from '../data/teks-catalog'

export default function WeakSpots() {
  const spots = getWeakSpots(10)

  return (
    <div>
      <Link to="/" className="text-indigo-600 text-sm hover:underline mb-4 inline-block">&larr; Home</Link>
      <h1 className="text-2xl font-bold mb-6">Weak Spots</h1>
      <p className="text-sm text-gray-500 mb-4">Topics where you make the most mistakes. Practice these!</p>

      {spots.length === 0 ? (
        <p className="text-gray-400 text-center py-12">
          No data yet. Complete some practice sessions first!
        </p>
      ) : (
        <div className="grid gap-3">
          {spots.map((s) => {
            const std = getStandardByCode(s.teksCode)
            const pct = Math.round(s.errorRate * 100)
            return (
              <div key={s.templateId} className="border rounded-lg p-4 bg-red-50 border-red-200 flex items-center justify-between">
                <div>
                  <span className="font-mono font-semibold text-sm">{s.teksCode}</span>
                  <span className="text-sm text-gray-600 ml-2">{std?.title}</span>
                  <p className="text-xs text-gray-500 mt-1">
                    {s.errorCount} errors out of {s.totalSeen} &middot; {pct}% error rate
                  </p>
                </div>
                <Link
                  to={`/practice/${s.teksCode}`}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 shrink-0"
                >
                  Practice
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
