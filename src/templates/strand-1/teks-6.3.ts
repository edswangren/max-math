import type { ProblemTemplate, GeneratedProblem } from '../types'
import { randInt, randIntExcluding, gcd } from '../../utils/math'

// 6.3A — Dividing by rational = multiplying by reciprocal
// 6.3B — Does quantity increase/decrease when multiplied by fraction
// 6.3C — Integer operations with models (we test the computation)
// 6.3D — Integer arithmetic fluency
// 6.3E — Multiply/divide positive rational numbers

function makeReciprocal(_difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const num = randInt(1, 9)
  const den = randIntExcluding(2, 9, [num])
  return {
    questionText: `What is the reciprocal of ${num}/${den}?`,
    correctAnswer: `${den}/${num}`,
    acceptableAnswers: [`${den}/${num}`],
    answerFormat: 'fraction',
    checkWork: `Check: (${num}/${den}) × (${den}/${num}) = ${num * den}/${den * num} = 1`,
  }
}

function makeMultiplyByFraction(_difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const isGreaterThanOne = Math.random() > 0.5
  let num: number, den: number
  if (isGreaterThanOne) {
    den = randInt(2, 6)
    num = den + randInt(1, 4)
  } else {
    den = randInt(2, 8)
    num = randInt(1, den - 1)
  }
  return {
    questionText: `When you multiply a positive number by ${num}/${den}, does the result increase or decrease?`,
    correctAnswer: isGreaterThanOne ? 'increase' : 'decrease',
    acceptableAnswers: isGreaterThanOne ? ['increase', 'increases', 'bigger', 'larger'] : ['decrease', 'decreases', 'smaller'],
    answerFormat: 'multiple-choice',
    hint: 'Type: increase or decrease',
  }
}

function makeIntegerArithmetic(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const ops = ['+', '-', '*'] as const
  const op = ops[Math.floor(Math.random() * ops.length)]
  const range = difficulty === 'easy' ? 12 : difficulty === 'medium' ? 20 : 50
  const a = randInt(-range, range)
  const b = randIntExcluding(-range, range, [0])

  let answer: number
  let symbol: string
  let latex: string
  switch (op) {
    case '+': answer = a + b; symbol = '+'; latex = '+'; break
    case '-': answer = a - b; symbol = '-'; latex = '-'; break
    case '*': answer = a * b; symbol = '×'; latex = '\\times'; break
  }

  let checkWork: string
  switch (op) {
    case '+': checkWork = `Reverse: ${answer} - ${b < 0 ? `(${b})` : b} = ${a}`; break
    case '-': checkWork = `Reverse: ${answer} + ${b < 0 ? `(${b})` : b} = ${a}`; break
    case '*': checkWork = `Reverse: ${answer} ÷ ${b < 0 ? `(${b})` : b} = ${a}`; break
  }

  return {
    questionText: `Calculate: ${a} ${symbol} ${b}`,
    questionLatex: `\\text{Calculate: } ${a} ${latex} ${b < 0 ? `(${b})` : b}`,
    correctAnswer: String(answer),
    answerFormat: 'integer',
    checkWork,
  }
}

function makeIntegerDivision(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const divisor = randIntExcluding(2, difficulty === 'easy' ? 10 : 12, [0])
  const answer = randIntExcluding(-10, 10, [0])
  const dividend = divisor * answer
  return {
    questionText: `Calculate: ${dividend} ÷ ${divisor}`,
    questionLatex: `\\text{Calculate: } ${dividend} \\div ${divisor}`,
    correctAnswer: String(answer),
    answerFormat: 'integer',
    checkWork: `Reverse: ${answer} × ${divisor} = ${dividend}`,
  }
}

function makeRationalMultDiv(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const isMultiply = Math.random() > 0.5
  // generate fractions that multiply/divide to simple results
  const a_num = randInt(1, difficulty === 'easy' ? 5 : 9)
  const a_den = randInt(2, difficulty === 'easy' ? 6 : 9)
  const b_num = randInt(1, difficulty === 'easy' ? 5 : 9)
  const b_den = randInt(2, difficulty === 'easy' ? 6 : 9)

  let rNum: number, rDen: number
  if (isMultiply) {
    rNum = a_num * b_num
    rDen = a_den * b_den
  } else {
    rNum = a_num * b_den
    rDen = a_den * b_num
  }
  const g = gcd(Math.abs(rNum), Math.abs(rDen))
  rNum /= g
  rDen /= g
  if (rDen < 0) { rNum = -rNum; rDen = -rDen }

  const op = isMultiply ? '×' : '÷'
  const answer = rDen === 1 ? String(rNum) : `${rNum}/${rDen}`
  const checkWork = isMultiply
    ? `Check: (${a_num}×${b_num})/(${a_den}×${b_den}) = ${a_num * b_num}/${a_den * b_den}, simplified = ${answer}`
    : `Check: (${a_num}×${b_den})/(${a_den}×${b_num}) = ${a_num * b_den}/${a_den * b_num}, simplified = ${answer}`
  return {
    questionText: `Calculate: ${a_num}/${a_den} ${op} ${b_num}/${b_den}`,
    correctAnswer: answer,
    acceptableAnswers: rDen === 1 ? [String(rNum)] : [answer, `${rNum}/${rDen}`],
    answerFormat: rDen === 1 ? 'integer' : 'fraction',
    hint: 'Simplify your answer',
    checkWork,
  }
}

export const teks63Templates: ProblemTemplate[] = [
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.3A-reciprocal-${d}`, teksCode: '6.3A', strand: 1,
    title: 'Reciprocals', difficulty: d, answerFormat: 'fraction' as const,
    generate: () => makeReciprocal(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.3B-mult-fraction-${d}`, teksCode: '6.3B', strand: 1,
    title: 'Multiply by fraction: increase or decrease?', difficulty: d, answerFormat: 'multiple-choice' as const,
    generate: () => makeMultiplyByFraction(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.3C-int-ops-${d}`, teksCode: '6.3C', strand: 1,
    title: 'Integer operations', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeIntegerArithmetic(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.3D-int-div-${d}`, teksCode: '6.3D', strand: 1,
    title: 'Integer division', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeIntegerDivision(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.3E-rational-${d}`, teksCode: '6.3E', strand: 1,
    title: 'Multiply/divide rational numbers', difficulty: d, answerFormat: 'fraction' as const,
    generate: () => makeRationalMultDiv(d),
  })),
]
