import type { ProblemTemplate, Difficulty } from './types'
import { teks62Templates } from './strand-1/teks-6.2'
import { teks63Templates } from './strand-1/teks-6.3'
import { teks64Templates } from './strand-2/teks-6.4'
import { teks65Templates } from './strand-2/teks-6.5'
import { teks66Templates } from './strand-3/teks-6.6'
import { teks67Templates } from './strand-3/teks-6.7'
import { teks68Templates } from './strand-3/teks-6.8'
import { teks69Templates } from './strand-3/teks-6.9'
import { teks610Templates } from './strand-3/teks-6.10'
import { teks611_13Templates } from './strand-4/teks-6.11-13'
import { teks614Templates } from './strand-5/teks-6.14'

const allTemplates: ProblemTemplate[] = [
  ...teks62Templates,
  ...teks63Templates,
  ...teks64Templates,
  ...teks65Templates,
  ...teks66Templates,
  ...teks67Templates,
  ...teks68Templates,
  ...teks69Templates,
  ...teks610Templates,
  ...teks611_13Templates,
  ...teks614Templates,
]

const byTeks = new Map<string, ProblemTemplate[]>()
for (const t of allTemplates) {
  const existing = byTeks.get(t.teksCode) ?? []
  existing.push(t)
  byTeks.set(t.teksCode, existing)
}

export function getTemplatesForTeks(teksCode: string, difficulty?: Difficulty): ProblemTemplate[] {
  const templates = byTeks.get(teksCode) ?? []
  if (difficulty) return templates.filter((t) => t.difficulty === difficulty)
  return templates
}

export function hasTemplates(teksCode: string): boolean {
  return byTeks.has(teksCode) && (byTeks.get(teksCode)!.length > 0)
}

export function getAllTeksCodes(): string[] {
  return [...byTeks.keys()]
}

export function getAllTemplates(): ProblemTemplate[] {
  return allTemplates
}
