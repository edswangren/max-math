import type { ProblemTemplate, GeneratedProblem } from '../types'
import { randInt } from '../../utils/math'

// 6.2A — Classify numbers (whole, integer, rational) using Venn diagram
// 6.2B — Number, opposite, absolute value
// 6.2C — Locate, compare, order on number line
// 6.2D — Order rational numbers
// 6.2E — Fraction as division

function makeClassifyNumber(_difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const types = [
    { val: String(randInt(0, 50)), sets: 'whole, integer, rational' },
    { val: String(-randInt(1, 20)), sets: 'integer, rational' },
    { val: `${randInt(1, 9)}/${randInt(2, 9)}`, sets: 'rational' },
    { val: `-${randInt(1, 9)}/${randInt(2, 9)}`, sets: 'rational' },
    { val: '0', sets: 'whole, integer, rational' },
    { val: String(randInt(1, 100)), sets: 'whole, integer, rational' },
  ]
  const choice = types[Math.floor(Math.random() * types.length)]
  return {
    questionText: `Classify ${choice.val}: Is it a whole number, integer, or rational number?`,
    correctAnswer: choice.sets,
    acceptableAnswers: [choice.sets, choice.sets.replace(/, /g, ',')],
    answerFormat: 'multiple-choice',
    hint: 'List all that apply, separated by commas',
  }
}

function makeOppositeAbsValue(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const n = randInt(1, difficulty === 'easy' ? 20 : 50)
  const neg = Math.random() > 0.5
  const num = neg ? -n : n
  const askOpposite = Math.random() > 0.5
  if (askOpposite) {
    return {
      questionText: `What is the opposite of ${num}?`,
      correctAnswer: String(-num),
      answerFormat: 'integer',
      checkWork: `The opposite of ${num} is ${-num}. Flip the sign!`,
    }
  } else {
    return {
      questionText: `What is |${num}| (the absolute value of ${num})?`,
      questionLatex: `\\text{What is } |${num}|?`,
      correctAnswer: String(Math.abs(num)),
      answerFormat: 'integer',
      checkWork: `|${num}| = ${Math.abs(num)} — absolute value is always the distance from 0`,
    }
  }
}

function makeCompareOrder(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const range = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 50
  const a = randInt(-range, range)
  let b = randInt(-range, range)
  while (b === a) b = randInt(-range, range)
  const answer = a < b ? '<' : '>'
  return {
    questionText: `Compare: ${a} ___ ${b}.`,
    correctAnswer: answer,
    answerFormat: 'multiple-choice',
    hint: 'Type < or >',
  }
}

function makeOrderSet(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const count = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5
  const range = difficulty === 'easy' ? 10 : 20
  const nums: number[] = []
  while (nums.length < count) {
    const n = randInt(-range, range)
    if (!nums.includes(n)) nums.push(n)
  }
  const sorted = [...nums].sort((a, b) => a - b)
  return {
    questionText: `Order from least to greatest: ${nums.join(', ')}`,
    correctAnswer: sorted.join(','),
    acceptableAnswers: [sorted.join(','), sorted.join(', ')],
    answerFormat: 'expression',
    checkWork: `Check: ${sorted.join(' < ')}`,
  }
}

function makeFractionAsDivision(_difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const a = randInt(1, 20)
  const b = randInt(2, 10)
  const askFraction = Math.random() > 0.5
  if (askFraction) {
    return {
      questionText: `Write ${a} ÷ ${b} as a fraction.`,
      correctAnswer: `${a}/${b}`,
      acceptableAnswers: [`${a}/${b}`],
      answerFormat: 'fraction',
      checkWork: `${a} ÷ ${b} can be written as ${a}/${b}`,
    }
  } else {
    return {
      questionText: `Write ${a}/${b} as a division expression. What is the dividend?`,
      correctAnswer: String(a),
      answerFormat: 'integer',
      checkWork: `In ${a}/${b}, the top number (${a}) is the dividend`,
    }
  }
}

export const teks62Templates: ProblemTemplate[] = [
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.2A-classify-${d}`, teksCode: '6.2A', strand: 1,
    title: 'Classify numbers', difficulty: d, answerFormat: 'multiple-choice' as const,
    generate: () => makeClassifyNumber(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.2B-opposite-abs-${d}`, teksCode: '6.2B', strand: 1,
    title: 'Opposite & absolute value', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeOppositeAbsValue(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.2C-compare-${d}`, teksCode: '6.2C', strand: 1,
    title: 'Compare integers', difficulty: d, answerFormat: 'multiple-choice' as const,
    generate: () => makeCompareOrder(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.2D-order-${d}`, teksCode: '6.2D', strand: 1,
    title: 'Order rational numbers', difficulty: d, answerFormat: 'expression' as const,
    generate: () => makeOrderSet(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.2E-fraction-div-${d}`, teksCode: '6.2E', strand: 1,
    title: 'Fraction as division', difficulty: d, answerFormat: 'fraction' as const,
    generate: () => makeFractionAsDivision(d),
  })),
]
