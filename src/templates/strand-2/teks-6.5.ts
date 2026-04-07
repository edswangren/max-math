import type { ProblemTemplate, GeneratedProblem } from '../types'
import { randInt } from '../../utils/math'

// 6.5A — Proportional relationships (scale factors, tables, proportions)
// 6.5B — Percent problems (find whole, part, or percent)
// 6.5C — Equivalent fractions/decimals/percents for same whole

function makeProportional(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const a = randInt(2, difficulty === 'easy' ? 5 : 10)
  const b = randInt(2, difficulty === 'easy' ? 5 : 10)
  const scale = randInt(2, difficulty === 'easy' ? 5 : 10)
  return {
    questionText: `If ${a} items cost $${b * a}, how much do ${a * scale} items cost?`,
    correctAnswer: String(b * a * scale),
    answerFormat: 'integer',
    checkWork: `Unit price: $${b * a} ÷ ${a} = $${b} per item. Then $${b} × ${a * scale} = $${b * a * scale}`,
  }
}

function makePercentProblem(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const type = Math.floor(Math.random() * 3)
  if (type === 0) {
    // Find the part given whole and percent
    const whole = randInt(10, difficulty === 'easy' ? 100 : 500)
    const pct = [10, 20, 25, 50, 75][Math.floor(Math.random() * 5)]
    const part = (pct / 100) * whole
    return {
      questionText: `What is ${pct}% of ${whole}?`,
      correctAnswer: String(part),
      answerFormat: Number.isInteger(part) ? 'integer' : 'decimal',
      checkWork: `Check: ${pct}/100 × ${whole} = ${part}`,
    }
  } else if (type === 1) {
    // Find the whole given part and percent
    const pct = [10, 20, 25, 50][Math.floor(Math.random() * 4)]
    const whole = randInt(20, difficulty === 'easy' ? 100 : 400)
    const part = (pct / 100) * whole
    return {
      questionText: `${part} is ${pct}% of what number?`,
      correctAnswer: String(whole),
      answerFormat: 'integer',
      checkWork: `Check: ${pct}% of ${whole} = ${pct}/100 × ${whole} = ${part}`,
    }
  } else {
    // Find the percent given part and whole
    const whole = randInt(10, difficulty === 'easy' ? 50 : 200)
    const pctOptions = [10, 20, 25, 30, 40, 50, 60, 75, 80]
    const pct = pctOptions[Math.floor(Math.random() * pctOptions.length)]
    const part = (pct / 100) * whole
    return {
      questionText: `${part} is what percent of ${whole}?`,
      correctAnswer: String(pct),
      acceptableAnswers: [String(pct), `${pct}%`],
      answerFormat: 'integer',
      checkWork: `Check: ${part} ÷ ${whole} = ${part / whole}, × 100 = ${pct}%`,
    }
  }
}

function makeEquivalentParts(_difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const items = [
    { frac: '1/4', dec: '0.25', pct: '25' },
    { frac: '1/2', dec: '0.5', pct: '50' },
    { frac: '3/4', dec: '0.75', pct: '75' },
    { frac: '1/5', dec: '0.2', pct: '20' },
    { frac: '3/5', dec: '0.6', pct: '60' },
    { frac: '1/10', dec: '0.1', pct: '10' },
  ]
  const item = items[Math.floor(Math.random() * items.length)]
  const whole = randInt(20, 100)
  const part = parseFloat(item.dec) * whole
  return {
    questionText: `If a whole is ${whole}, what value represents ${item.frac} of it?`,
    correctAnswer: String(part),
    answerFormat: Number.isInteger(part) ? 'integer' : 'decimal',
    checkWork: `Check: ${item.dec} × ${whole} = ${part}`,
  }
}

export const teks65Templates: ProblemTemplate[] = [
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.5A-proportion-${d}`, teksCode: '6.5A', strand: 2,
    title: 'Proportional relationships', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeProportional(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.5B-percent-${d}`, teksCode: '6.5B', strand: 2,
    title: 'Percent problems', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makePercentProblem(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.5C-equiv-parts-${d}`, teksCode: '6.5C', strand: 2,
    title: 'Equivalent parts of a whole', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeEquivalentParts(d),
  })),
]
