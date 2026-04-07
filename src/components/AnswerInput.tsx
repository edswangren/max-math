import { useState, type FormEvent } from 'react'
import type { AnswerFormat } from '../templates/types'

const formatLabels: Partial<Record<AnswerFormat, string>> = {
  integer: 'whole number',
  decimal: 'decimal (e.g., 3.5)',
  fraction: 'fraction (e.g., 3/4)',
  expression: 'expression (e.g., 2x+3)',
  coordinate: 'coordinate (x, y)',
  inequality: 'inequality (e.g., y > 5)',
  money: 'dollar amount (e.g., 12.50)',
}

interface Props {
  onSubmit: (answer: string) => void
  disabled?: boolean
  answerFormat?: AnswerFormat
}

export default function AnswerInput({ onSubmit, disabled, answerFormat }: Props) {
  const [value, setValue] = useState('')
  const formatLabel = answerFormat ? formatLabels[answerFormat] : undefined

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed && !disabled) {
      onSubmit(trimmed)
      setValue('')
    }
  }

  return (
    <div className="mt-4">
      {formatLabel && (
        <p className="text-xs text-smoke/60 mb-1.5 ml-1">Answer as a {formatLabel}</p>
      )}
      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          placeholder="Drop your answer here..."
          autoFocus
          className="bg-void-lighter border border-void-lighter rounded-xl px-4 py-2 text-lg text-white flex-1 placeholder-smoke/50 focus:outline-none focus:ring-2 focus:ring-neon focus:border-neon disabled:opacity-40"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="bg-neon text-void font-bold px-6 py-2 rounded-xl text-lg hover:bg-neon-dim disabled:opacity-30 transition-colors"
        >
          Send it
        </button>
      </form>
    </div>
  )
}
