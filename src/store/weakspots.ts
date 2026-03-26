import { getSessions } from './sessions'

export interface WeakSpot {
  templateId: string
  teksCode: string
  errorCount: number
  totalSeen: number
  errorRate: number
}

export function getWeakSpots(limit = 10): WeakSpot[] {
  const sessions = getSessions()
  const errorMap = new Map<string, { teksCode: string; errors: number; total: number }>()

  for (const session of sessions) {
    for (const mistake of session.mistakes) {
      const key = mistake.templateId || session.teksCode
      const entry = errorMap.get(key) ?? { teksCode: session.teksCode, errors: 0, total: 0 }
      entry.errors++
      entry.total++
      errorMap.set(key, entry)
    }
    // also count correct answers toward total
    const correctCount = session.totalProblems - session.mistakes.length
    const teksKey = session.teksCode
    const entry = errorMap.get(teksKey) ?? { teksCode: session.teksCode, errors: 0, total: 0 }
    entry.total += correctCount
    errorMap.set(teksKey, entry)
  }

  return [...errorMap.entries()]
    .map(([templateId, data]) => ({
      templateId,
      teksCode: data.teksCode,
      errorCount: data.errors,
      totalSeen: data.total,
      errorRate: data.total > 0 ? data.errors / data.total : 0,
    }))
    .filter((w) => w.errorCount > 0)
    .sort((a, b) => b.errorRate - a.errorRate)
    .slice(0, limit)
}
