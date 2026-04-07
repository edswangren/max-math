import type { ProblemTemplate, GeneratedProblem } from '../types'
import { randInt, randIntExcluding, formatTerm, formatConstant } from '../../utils/math'

// 6.10A — Model and solve one-variable, one-step equations and inequalities
// 6.10B — Determine if given values make equations or inequalities true

function makeOneStepEquation(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const ops = ['+', '-', '*'] as const
  const op = ops[Math.floor(Math.random() * ops.length)]
  const ansRanges = { easy: [1, 10], medium: [-10, 15], hard: [-20, 20] } as const
  const [aMin, aMax] = ansRanges[difficulty]
  const y = randIntExcluding(aMin, aMax, [0])

  let questionText: string
  let questionLatex: string
  let correctAnswer: string
  let checkWork: string

  if (op === '+') {
    const b = randIntExcluding(-10, 10, [0])
    const c = y + b
    questionText = `Solve for y: y + ${b} = ${c}`
    questionLatex = `\\text{Solve for } y: \\quad y ${formatConstant(b, false)} = ${c}`
    correctAnswer = String(y)
    checkWork = `Plug y = ${y} back in: ${y} ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${c}`
  } else if (op === '-') {
    const b = randIntExcluding(1, 15, [0])
    const c = y - b
    questionText = `Solve for y: y - ${b} = ${c}`
    questionLatex = `\\text{Solve for } y: \\quad y - ${b} = ${c}`
    correctAnswer = String(y)
    checkWork = `Plug y = ${y} back in: ${y} - ${b} = ${c}`
  } else {
    const a = randInt(2, difficulty === 'easy' ? 5 : difficulty === 'medium' ? 9 : 12)
    const c = a * y
    questionText = `Solve for y: ${a}y = ${c}`
    questionLatex = `\\text{Solve for } y: \\quad ${a}y = ${c}`
    correctAnswer = String(y)
    checkWork = `Plug y = ${y} back in: ${a}(${y}) = ${c}`
  }

  return { questionText, questionLatex, correctAnswer, answerFormat: 'integer', checkWork }
}

function makeInequality(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const ansRanges = { easy: [1, 10], medium: [-10, 15], hard: [-20, 20] } as const
  const [aMin, aMax] = ansRanges[difficulty]
  const boundary = randInt(aMin, aMax)
  const a = difficulty === 'easy' ? 1 : randInt(2, difficulty === 'medium' ? 5 : 9)
  const b = randIntExcluding(-10, 10, [0])
  const c = a * boundary + b
  const ops = ['>', '<', '>=', '<='] as const
  const op = ops[Math.floor(Math.random() * ops.length)]

  const opLatex = op === '>=' ? '\\geq' : op === '<=' ? '\\leq' : op
  const opText = op === '>=' ? '>=' : op === '<=' ? '<=' : op

  const questionText = a === 1
    ? `Solve the inequality: y + ${b} ${opText} ${c}`
    : `Solve the inequality: ${a}y + ${b} ${opText} ${c}`
  const questionLatex = a === 1
    ? `\\text{Solve: } \\quad y ${formatConstant(b, false)} ${opLatex} ${c}`
    : `\\text{Solve: } \\quad ${formatTerm(a, 'y', true)} ${formatConstant(b, false)} ${opLatex} ${c}`

  // answer is: y [op] boundary
  const correctAnswer = `y${opText}${boundary}`

  const lhs = a === 1 ? `${boundary}` : `${a}(${boundary})`
  const lhsVal = a * boundary
  return {
    questionText,
    questionLatex,
    correctAnswer,
    acceptableAnswers: [
      `y ${opText} ${boundary}`,
      `y${opText}${boundary}`,
    ],
    answerFormat: 'inequality',
    checkWork: `Plug y = ${boundary} back in: ${lhs} ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${lhsVal} ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${c}. At the boundary, both sides equal ${c}.`,
  }
}

function makeTrueOrFalse(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const a = randInt(2, difficulty === 'easy' ? 5 : 9)
  const b = randIntExcluding(-10, 10, [0])
  const trueY = randInt(1, 10)
  const c = a * trueY + b

  // Sometimes give the correct value, sometimes not
  const giveCorrect = Math.random() > 0.4
  const testY = giveCorrect ? trueY : trueY + randIntExcluding(-3, 3, [0])
  const isTrue = testY === trueY

  return {
    questionText: `Does y = ${testY} make this equation true? ${a}y + ${b} = ${c}`,
    questionLatex: `\\text{Does } y = ${testY} \\text{ make } ${formatTerm(a, 'y', true)} ${formatConstant(b, false)} = ${c} \\text{ true?}`,
    correctAnswer: isTrue ? 'yes' : 'no',
    acceptableAnswers: isTrue ? ['yes', 'true', 'y'] : ['no', 'false', 'n'],
    answerFormat: 'multiple-choice',
    hint: 'Answer: yes or no',
  }
}

export const teks610Templates: ProblemTemplate[] = [
  // 6.10A — Solve equations
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.10A-one-step-eq-${d}`,
    teksCode: '6.10A',
    strand: 3,
    title: 'One-step equations',
    difficulty: d,
    answerFormat: 'integer' as const,
    generate: () => makeOneStepEquation(d),
  })),
  // 6.10A — Solve inequalities
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.10A-inequality-${d}`,
    teksCode: '6.10A',
    strand: 3,
    title: 'One-step inequalities',
    difficulty: d,
    answerFormat: 'inequality' as const,
    generate: () => makeInequality(d),
  })),
  // 6.10B — Determine if values satisfy equations
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.10B-true-false-${d}`,
    teksCode: '6.10B',
    strand: 3,
    title: 'Does this value satisfy the equation?',
    difficulty: d,
    answerFormat: 'multiple-choice' as const,
    generate: () => makeTrueOrFalse(d),
  })),
]
