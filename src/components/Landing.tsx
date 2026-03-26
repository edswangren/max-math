import { Link } from 'react-router-dom'
import { strands } from '../data/teks-catalog'
import { hasTemplates } from '../templates/registry'
import { getAllProgress } from '../store/progress'

export default function Landing() {
  const progress = getAllProgress()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Pick a Strand</h1>
      <div className="grid gap-6">
        {strands.map((s) => {
          const available = s.standards.filter((st) => hasTemplates(st.code))
          const practiced = s.standards.filter((st) => progress[st.code]?.attempted > 0)
          const total = s.standards.length

          return (
            <Link
              key={s.id}
              to={`/strand/${s.id}`}
              className={`border rounded-lg p-4 ${s.color} ${s.colorBorder} hover:shadow-md transition-shadow block`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg">{s.name}</h2>
                  <p className="text-sm text-gray-600">
                    {available.length}/{total} topics ready &middot; {practiced.length} practiced
                  </p>
                </div>
                <span className="text-indigo-600 text-sm font-medium">&rarr;</span>
              </div>
              {/* progress bar */}
              <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all"
                  style={{ width: `${total > 0 ? (practiced.length / total) * 100 : 0}%` }}
                />
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-8 flex gap-4 justify-center">
        <Link
          to="/history"
          className="text-sm text-indigo-600 hover:underline"
        >
          Session History
        </Link>
      </div>
    </div>
  )
}
