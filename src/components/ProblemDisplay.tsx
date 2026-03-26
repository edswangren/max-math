import katex from 'katex'

interface Props {
  questionText: string
  questionLatex?: string
  problemNumber: number
  totalProblems: number
}

export default function ProblemDisplay({ questionText, questionLatex, problemNumber, totalProblems }: Props) {
  const html = questionLatex
    ? katex.renderToString(questionLatex, { throwOnError: false, displayMode: true })
    : null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <p className="text-sm text-gray-400 mb-3">
        Problem {problemNumber} of {totalProblems}
      </p>
      {html ? (
        <div
          className="text-2xl"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <p className="text-2xl font-mono">{questionText}</p>
      )}
    </div>
  )
}
