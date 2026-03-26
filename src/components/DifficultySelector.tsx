import type { Difficulty } from '../templates/types'

interface Props {
  value: Difficulty
  onChange: (d: Difficulty) => void
}

const levels: { key: Difficulty; label: string; color: string }[] = [
  { key: 'easy', label: 'Easy', color: 'bg-green-100 border-green-400 text-green-800' },
  { key: 'medium', label: 'Medium', color: 'bg-yellow-100 border-yellow-400 text-yellow-800' },
  { key: 'hard', label: 'Hard', color: 'bg-red-100 border-red-400 text-red-800' },
]

export default function DifficultySelector({ value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {levels.map((l) => (
        <button
          key={l.key}
          onClick={() => onChange(l.key)}
          className={`px-3 py-1 rounded-full border text-sm font-medium transition-all ${
            value === l.key
              ? `${l.color} ring-2 ring-offset-1`
              : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
