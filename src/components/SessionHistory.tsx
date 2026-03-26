import { Link } from 'react-router-dom'
import { getSessions } from '../store/sessions'

export default function SessionHistory() {
  const sessions = getSessions().slice().reverse()

  return (
    <div>
      <Link to="/" className="text-indigo-600 text-sm hover:underline mb-4 inline-block">&larr; Home</Link>
      <h1 className="text-2xl font-bold mb-6">Session History</h1>

      {sessions.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          No sessions yet. <Link to="/" className="text-indigo-600 hover:underline">Start practicing!</Link>
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="pb-2 pr-4">Date</th>
                <th className="pb-2 pr-4">Topic</th>
                <th className="pb-2 pr-4">Difficulty</th>
                <th className="pb-2 pr-4 text-right">Score</th>
                <th className="pb-2 text-right">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => {
                const pct = Math.round((s.correct / s.totalProblems) * 100)
                const date = new Date(s.date)
                return (
                  <tr key={s.id} className="border-b border-gray-100">
                    <td className="py-2 pr-4 text-gray-600">
                      {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-2 pr-4">
                      <Link to={`/practice/${s.teksCode}`} className="font-mono text-indigo-600 hover:underline">
                        {s.teksCode}
                      </Link>
                    </td>
                    <td className="py-2 pr-4 capitalize">{s.difficulty}</td>
                    <td className="py-2 pr-4 text-right font-mono">{s.correct}/{s.totalProblems}</td>
                    <td className="py-2 text-right">
                      <span className={`font-medium ${
                        pct >= 80 ? 'text-green-600' : pct >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {pct}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
