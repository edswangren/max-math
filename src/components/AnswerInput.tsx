import { useState, type FormEvent } from 'react'

interface Props {
  onSubmit: (answer: string) => void
  disabled?: boolean
}

export default function AnswerInput({ onSubmit, disabled }: Props) {
  const [value, setValue] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed && !disabled) {
      onSubmit(trimmed)
      setValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center mt-4">
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
  )
}
