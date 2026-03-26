import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useMemo } from 'react'
import katex from 'katex'
import { getTemplatesForTeks, hasTemplates } from '../templates/registry'
import { getStandardByCode } from '../data/teks-catalog'
import type { Difficulty } from '../templates/types'

export default function PrintWorksheet() {
  const { teksCode = '' } = useParams()
  const [searchParams] = useSearchParams()
  const difficulty = (searchParams.get('d') as Difficulty) || 'easy'
  const count = parseInt(searchParams.get('n') || '20', 10)
  const standard = getStandardByCode(teksCode)

  const problems = useMemo(() => {
    const templates = getTemplatesForTeks(teksCode, difficulty)
    if (templates.length === 0) return []
    return Array.from({ length: count }, (_, i) => {
      const t = templates[Math.floor(Math.random() * templates.length)]
      const p = t.generate()
      return { ...p, num: i + 1 }
    })
  }, [teksCode, difficulty, count])

  if (!hasTemplates(teksCode)) {
    return <p className="text-center py-12 text-gray-500">No problems available for {teksCode}.</p>
  }

  return (
    <div>
      <div className="no-print mb-4 flex gap-4 items-center">
        <Link to={`/practice/${teksCode}`} className="text-indigo-600 text-sm hover:underline">&larr; Back to Practice</Link>
        <button
          onClick={() => window.print()}
          className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
        >
          Print
        </button>
      </div>

      {/* Worksheet */}
      <div className="bg-white p-8 border rounded-lg print:border-none print:p-0">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold">TEKS {teksCode}: {standard?.title ?? ''}</h1>
          <p className="text-sm text-gray-500 capitalize">{difficulty} &middot; {count} problems</p>
          <div className="mt-2 flex justify-between text-sm">
            <span>Name: _________________________</span>
            <span>Date: _____________</span>
          </div>
        </div>

        <div className="space-y-6">
          {problems.map((p) => {
            const html = p.questionLatex
              ? katex.renderToString(p.questionLatex, { throwOnError: false, displayMode: false })
              : null
            return (
              <div key={p.num} className="border-b border-gray-100 pb-4">
                <div className="flex gap-3">
                  <span className="font-bold text-gray-400 w-8 shrink-0">{p.num}.</span>
                  {html ? (
                    <span dangerouslySetInnerHTML={{ __html: html }} />
                  ) : (
                    <span>{p.questionText}</span>
                  )}
                </div>
                <div className="h-16" /> {/* work space */}
              </div>
            )
          })}
        </div>
      </div>

      {/* Answer Key — page break */}
      <div className="mt-8 print:break-before-page bg-white p-8 border rounded-lg print:border-none print:p-0">
        <h2 className="text-lg font-bold mb-4 text-center">Answer Key</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {problems.map((p) => (
            <div key={p.num} className="flex gap-2">
              <span className="font-bold text-gray-400 w-8">{p.num}.</span>
              <span className="font-mono">{p.correctAnswer}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
