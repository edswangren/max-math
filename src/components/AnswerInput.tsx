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
        placeholder="Type your answer..."
        autoFocus
        className="border border-gray-300 rounded-lg px-4 py-2 text-lg flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-indigo-700 disabled:opacity-40"
      >
        Check
      </button>
    </form>
  )
}
