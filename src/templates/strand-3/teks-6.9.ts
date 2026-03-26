import type { ProblemTemplate, GeneratedProblem } from '../types'
import { randInt, randIntExcluding, formatTerm, formatConstant } from '../../utils/math'

// 6.9A — Write one-variable, one-step equations and inequalities
// 6.9B — Represent solutions on number lines (we test the solving part)
// 6.9C — Write real-world problems given equations (multiple-choice)

function makeOneStepAdd(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const ranges = { easy: [1, 10], medium: [-10, 20], hard: [-20, 30] } as const
  const [min, max] = ranges[difficulty]
  const y = randInt(min, max)
  const b = randIntExcluding(min, max, [0])
  const c = y + b
  return {
    questionText: `Solve for y: y + ${b} = ${c}`,
    questionLatex: `\\text{Solve for } y: \\quad y ${formatConstant(b, false)} = ${c}`,
    correctAnswer: String(y),
    answerFormat: 'integer',
  }
}

function makeOneStepMul(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const coeffRanges = { easy: [2, 5], medium: [2, 9], hard: [2, 12] } as const
  const ansRanges = { easy: [1, 10], medium: [-10, 10], hard: [-15, 15] } as const
  const [cMin, cMax] = coeffRanges[difficulty]
  const [aMin, aMax] = ansRanges[difficulty]
  const a = randInt(cMin, cMax)
  const y = randIntExcluding(aMin, aMax, [0])
  const c = a * y
  return {
    questionText: `Solve for y: ${a}y = ${c}`,
    questionLatex: `\\text{Solve for } y: \\quad ${a}y = ${c}`,
    correctAnswer: String(y),
    answerFormat: 'integer',
  }
}

function makeTwoStep(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const coeffRanges = { easy: [2, 5], medium: [2, 9], hard: [2, 12] } as const
  const ansRanges = { easy: [1, 10], medium: [-10, 10], hard: [-15, 15] } as const
  const [cMin, cMax] = coeffRanges[difficulty]
  const [aMin, aMax] = ansRanges[difficulty]
  const a = randInt(cMin, cMax)
  const y = randIntExcluding(aMin, aMax, [0])
  const b = randIntExcluding(-10, 10, [0])
  const c = a * y + b
  return {
    questionText: `Solve for y: ${a}y + ${b} = ${c}`,
    questionLatex: `\\text{Solve for } y: \\quad ${formatTerm(a, 'y', true)} ${formatConstant(b, false)} = ${c}`,
    correctAnswer: String(y),
    answerFormat: 'integer',
  }
}

function makeVarsBothSides(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const coeffRanges = { easy: [2, 5], medium: [2, 8], hard: [2, 12] } as const
  const ansRanges = { easy: [1, 8], medium: [-10, 10], hard: [-15, 15] } as const
  const [cMin, cMax] = coeffRanges[difficulty]
  const [aMin, aMax] = ansRanges[difficulty]

  const y = randIntExcluding(aMin, aMax, [0])
  const a = randInt(cMin, cMax)
  let b = randInt(cMin - 1, cMax - 1)
  if (b >= a) b = a - randInt(1, 3) // ensure a > b so we get a positive leading coeff
  if (b === 0) b = 1
  const c = randIntExcluding(-10, 10, [0])
  const d = (a - b) * y + c  // derived so that ay + c = by + d => y = (d-c)/(a-b)

  return {
    questionText: `Solve for y: ${a}y + ${c} = ${b}y + ${d}`,
    questionLatex: `\\text{Solve for } y: \\quad ${formatTerm(a, 'y', true)} ${formatConstant(c, false)} = ${formatTerm(b, 'y', true)} ${formatConstant(d, false)}`,
    correctAnswer: String(y),
    answerFormat: 'integer',
  }
}

function makeSolveForYInTermsOfX(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  // ay + b = cx + d → y = (cx + d - b) / a
  // We ensure clean division: pick a, c, d, b such that (d-b) is divisible by a and c is divisible by a
  const coeffRanges = { easy: [1, 3], medium: [2, 5], hard: [2, 8] } as const
  const [cMin, cMax] = coeffRanges[difficulty]
  const a = randInt(cMin, cMax) // coefficient of y
  const cOverA = randIntExcluding(1, 6, [0]) // this will be the x coefficient in the answer
  const c = a * cOverA // coefficient of x in the equation
  const bRaw = randIntExcluding(-8, 8, [0])
  const dMinusB = a * randInt(-5, 5) // ensure divisible
  const b = bRaw
  const d = b + dMinusB

  // y = cOverA * x + dMinusB/a
  const constTerm = dMinusB / a

  let answerText: string
  let answerLatex: string
  if (constTerm === 0) {
    answerText = `${cOverA}x`
    answerLatex = `${cOverA}x`
  } else if (cOverA === 1) {
    answerText = `x + ${constTerm}`
    answerLatex = `x ${formatConstant(constTerm, false)}`
  } else {
    answerText = `${cOverA}x + ${constTerm}`
    answerLatex = `${cOverA}x ${formatConstant(constTerm, false)}`
  }

  return {
    questionText: `Solve for y: ${a}y + ${b} = ${c}x + ${d}`,
    questionLatex: `\\text{Solve for } y: \\quad ${formatTerm(a, 'y', true)} ${formatConstant(b, false)} = ${formatTerm(c, 'x', true)} ${formatConstant(d, false)}`,
    correctAnswer: answerText.replace(/\s/g, '').replace(/\+\-/g, '-'),
    acceptableAnswers: [
      answerText.replace(/\s/g, ''),
      answerLatex.replace(/\s/g, ''),
    ],
    answerFormat: 'expression',
  }
}

export const teks69Templates: ProblemTemplate[] = [
  // 6.9A — one-step equations
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.9A-one-step-add-${d}`,
    teksCode: '6.9A',
    strand: 3,
    title: 'One-step addition/subtraction equations',
    difficulty: d,
    answerFormat: 'integer' as const,
    generate: () => makeOneStepAdd(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.9A-one-step-mul-${d}`,
    teksCode: '6.9A',
    strand: 3,
    title: 'One-step multiplication equations',
    difficulty: d,
    answerFormat: 'integer' as const,
    generate: () => makeOneStepMul(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.9A-two-step-${d}`,
    teksCode: '6.9A',
    strand: 3,
    title: 'Two-step equations',
    difficulty: d,
    answerFormat: 'integer' as const,
    generate: () => makeTwoStep(d),
  })),
  // 6.9B — Variables on both sides (single variable)
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.9B-vars-both-sides-${d}`,
    teksCode: '6.9B',
    strand: 3,
    title: 'Variables on both sides',
    difficulty: d,
    answerFormat: 'integer' as const,
    generate: () => makeVarsBothSides(d),
  })),
  // 6.9C — Solve for y in terms of x (literal equations)
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.9C-literal-eq-${d}`,
    teksCode: '6.9C',
    strand: 3,
    title: 'Solve for y in terms of x',
    difficulty: d,
    answerFormat: 'expression' as const,
    generate: () => makeSolveForYInTermsOfX(d),
  })),
]
