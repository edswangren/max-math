import type { Difficulty } from '../templates/types'

interface Props {
  value: Difficulty
  onChange: (d: Difficulty) => void
}

const levels: { key: Difficulty; label: string; active: string }[] = [
  { key: 'easy', label: 'Chill', active: 'bg-neon/20 border-neon text-neon ring-neon/30' },
  { key: 'medium', label: 'Mid', active: 'bg-yellow-500/20 border-yellow-400 text-yellow-400 ring-yellow-400/30' },
  { key: 'hard', label: 'Demon', active: 'bg-lava/20 border-lava text-lava ring-lava/30' },
]

export default function DifficultySelector({ value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {levels.map((l) => (
        <button
          key={l.key}
          onClick={() => onChange(l.key)}
          className={`px-3 py-1 rounded-full border text-sm font-bold transition-all ${
            value === l.key
              ? `${l.active} ring-2 ring-offset-1 ring-offset-void`
              : 'bg-void-lighter border-void-lighter text-smoke hover:text-white hover:border-white/30'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
