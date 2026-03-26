import { Link } from 'react-router-dom'
import { getSessions } from '../store/sessions'

export default function SessionHistory() {
  const sessions = getSessions().slice().reverse()

  return (
    <div>
      <Link to="/" className="text-neon text-sm hover:underline mb-4 inline-block">&larr; Home</Link>
      <h1 className="text-2xl font-black mb-6">Session History</h1>

      {sessions.length === 0 ? (
        <p className="text-smoke text-center py-12">
          No sessions yet. <Link to="/" className="text-neon hover:underline">Go practice!</Link>
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-void-lighter text-left text-smoke">
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
                  <tr key={s.id} className="border-b border-void-lighter/50">
                    <td className="py-2 pr-4 text-smoke">
                      {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-2 pr-4">
                      <Link to={`/practice/${s.teksCode}`} className="font-mono text-neon hover:underline">
                        {s.teksCode}
                      </Link>
                    </td>
                    <td className="py-2 pr-4 capitalize text-smoke">{s.difficulty}</td>
                    <td className="py-2 pr-4 text-right font-mono text-white">{s.correct}/{s.totalProblems}</td>
                    <td className="py-2 text-right">
                      <span className={`font-bold ${
                        pct >= 80 ? 'text-neon' : pct >= 60 ? 'text-yellow-400' : 'text-lava'
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
