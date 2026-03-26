import { useParams, Link } from 'react-router-dom'
import { getStrand } from '../data/teks-catalog'
import { hasTemplates } from '../templates/registry'
import { getAccuracy } from '../store/progress'

export default function TopicList() {
  const { strandId } = useParams()
  const strand = getStrand(Number(strandId))

  if (!strand) {
    return <p className="text-center text-gray-500 py-12">Strand not found.</p>
  }

  return (
    <div>
      <Link to="/" className="text-indigo-600 text-sm hover:underline mb-4 inline-block">&larr; All Strands</Link>
      <h1 className="text-2xl font-bold mb-1">{strand.name}</h1>
      <p className="text-sm text-gray-500 mb-6">{strand.standards.length} standards</p>

      <div className="grid gap-3">
        {strand.standards.map((std) => {
          const ready = hasTemplates(std.code)
          const accuracy = getAccuracy(std.code)

          return (
            <div
              key={std.code}
              className={`border rounded-lg p-4 flex items-center justify-between ${strand.color} ${strand.colorBorder}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-sm">{std.code}</span>
                  <span className="text-sm text-gray-700">{std.title}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">{std.description}</p>
              </div>
              <div className="flex items-center gap-3 ml-4 shrink-0">
                {accuracy !== null && (
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    accuracy >= 80 ? 'bg-green-200 text-green-800' :
                    accuracy >= 60 ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {accuracy}%
                  </span>
                )}
                {ready ? (
                  <Link
                    to={`/practice/${std.code}`}
                    className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
                  >
                    Practice
                  </Link>
                ) : (
                  <span className="text-xs text-gray-400 italic">Soon</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
