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
    <div className="bg-void-light rounded-xl border border-void-lighter p-6">
      <p className="text-sm text-smoke mb-3">
        <span className="text-neon font-bold">{problemNumber}</span>
        <span className="text-void-lighter"> / </span>
        <span>{totalProblems}</span>
      </p>
      {html ? (
        <div
          className="text-2xl text-white"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <p className="text-2xl font-mono text-white">{questionText}</p>
      )}
    </div>
  )
}
