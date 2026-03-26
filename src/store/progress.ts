import type { Difficulty } from '../templates/types'

interface DifficultyStats {
  attempted: number
  correct: number
}

interface TeksProgress {
  attempted: number
  correct: number
  lastPracticed: string
  bestStreak: number
  byDifficulty: Partial<Record<Difficulty, DifficultyStats>>
}

interface ProgressStore {
  version: 1
  byTeks: Record<string, TeksProgress>
}

const STORAGE_KEY = 'teks-progress'

function load(): ProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { version: 1, byTeks: {} }
}

function save(store: ProgressStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function getProgress(teksCode: string): TeksProgress | undefined {
  return load().byTeks[teksCode]
}

export function getAllProgress(): Record<string, TeksProgress> {
  return load().byTeks
}

export function recordSession(
  teksCode: string,
  difficulty: Difficulty,
  attempted: number,
  correct: number,
) {
  const store = load()
  const existing = store.byTeks[teksCode] ?? {
    attempted: 0,
    correct: 0,
    lastPracticed: '',
    bestStreak: 0,
    byDifficulty: {},
  }

  existing.attempted += attempted
  existing.correct += correct
  existing.lastPracticed = new Date().toISOString()
  if (correct > existing.bestStreak) existing.bestStreak = correct

  const diffStats = existing.byDifficulty[difficulty] ?? { attempted: 0, correct: 0 }
  diffStats.attempted += attempted
  diffStats.correct += correct
  existing.byDifficulty[difficulty] = diffStats

  store.byTeks[teksCode] = existing
  save(store)
}

export function getAccuracy(teksCode: string): number | null {
  const p = getProgress(teksCode)
  if (!p || p.attempted === 0) return null
  return Math.round((p.correct / p.attempted) * 100)
}
