import { useParams, Link } from 'react-router-dom'
import { getStrand } from '../data/teks-catalog'
import { hasTemplates } from '../templates/registry'
import { getAccuracy } from '../store/progress'

export default function TopicList() {
  const { strandId } = useParams()
  const strand = getStrand(Number(strandId))

  if (!strand) {
    return <p className="text-center text-smoke py-12">Strand not found.</p>
  }

  return (
    <div>
      <Link to="/" className="text-neon text-sm hover:underline mb-4 inline-block">&larr; All Strands</Link>
      <h1 className="text-2xl font-black mb-1">{strand.name}</h1>
      <p className="text-sm text-smoke mb-6">{strand.standards.length} standards</p>

      <div className="grid gap-3">
        {strand.standards.map((std) => {
          const ready = hasTemplates(std.code)
          const accuracy = getAccuracy(std.code)

          return (
            <div
              key={std.code}
              className="border border-void-lighter rounded-xl p-4 bg-void-light flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-neon">{std.code}</span>
                  <span className="text-sm text-white">{std.title}</span>
                </div>
                <p className="text-xs text-smoke mt-1 truncate">{std.description}</p>
              </div>
              <div className="flex items-center gap-3 ml-4 shrink-0">
                {accuracy !== null && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    accuracy >= 80 ? 'bg-neon/20 text-neon' :
                    accuracy >= 60 ? 'bg-yellow-400/20 text-yellow-400' :
                    'bg-lava/20 text-lava'
                  }`}>
                    {accuracy}%
                  </span>
                )}
                {ready ? (
                  <Link
                    to={`/practice/${std.code}`}
                    className="bg-neon text-void font-bold px-3 py-1 rounded-lg text-sm hover:bg-neon-dim transition-colors"
                  >
                    Go
                  </Link>
                ) : (
                  <span className="text-xs text-smoke/50 italic">Soon</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
