import type { AnswerFormat } from './types'
import { gcd } from '../utils/math'

function normalizeFraction(s: string): string {
  const match = s.match(/^(-?\d+)\s*\/\s*(-?\d+)$/)
  if (!match) return s.trim()
  let num = parseInt(match[1], 10)
  let den = parseInt(match[2], 10)
  if (den < 0) { num = -num; den = -den }
  const g = gcd(Math.abs(num), den)
  return `${num / g}/${den / g}`
}

function normalizeExpression(s: string): string {
  return s.replace(/\s+/g, '').replace(/\+-/g, '-').replace(/-\+/g, '-').toLowerCase()
}

function parseMoney(s: string): number {
  return parseFloat(s.replace(/[$,]/g, ''))
}

export function checkAnswer(userInput: string, expected: string, format: AnswerFormat, acceptableAnswers?: string[]): boolean {
  // check acceptable answers first (exact match after trimming)
  if (acceptableAnswers) {
    const cleaned = userInput.trim().toLowerCase()
    if (acceptableAnswers.some((a) => a.toLowerCase().replace(/\s+/g, '') === cleaned.replace(/\s+/g, ''))) {
      return true
    }
  }
  const cleaned = userInput.trim()

  switch (format) {
    case 'integer':
      return parseInt(cleaned, 10) === parseInt(expected, 10)

    case 'decimal':
      return Math.abs(parseFloat(cleaned) - parseFloat(expected)) < 0.01

    case 'fraction': {
      const nUser = normalizeFraction(cleaned)
      const nExpected = normalizeFraction(expected)
      if (nUser === nExpected) return true
      const parseFrac = (s: string) => {
        const m = s.match(/^(-?\d+)\s*\/\s*(-?\d+)$/)
        if (m) return parseInt(m[1], 10) / parseInt(m[2], 10)
        return parseFloat(s)
      }
      return Math.abs(parseFrac(cleaned) - parseFrac(expected)) < 0.001
    }

    case 'expression':
      return normalizeExpression(cleaned) === normalizeExpression(expected)

    case 'coordinate': {
      const normalize = (s: string) => s.replace(/\s+/g, '').replace(/[()]/g, '')
      return normalize(cleaned) === normalize(expected)
    }

    case 'inequality':
      return normalizeExpression(cleaned) === normalizeExpression(expected)

    case 'multiple-choice':
      return cleaned.toLowerCase() === expected.toLowerCase()

    case 'money':
      return Math.abs(parseMoney(cleaned) - parseMoney(expected)) < 0.005

    default:
      return cleaned === expected
  }
}
