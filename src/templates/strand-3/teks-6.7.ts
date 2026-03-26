import type { ProblemTemplate, GeneratedProblem } from '../types'
import { randInt } from '../../utils/math'

// 6.7A — Order of operations, exponents, prime factorization
// 6.7B — Distinguish expressions vs equations
// 6.7C — Determine if two expressions are equivalent
// 6.7D — Generate equivalent expressions using properties

function makeOrderOfOps(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  if (difficulty === 'easy') {
    const a = randInt(2, 9), b = randInt(1, 9), c = randInt(1, 9)
    const answer = a * b + c
    return {
      questionText: `Evaluate: ${a} × ${b} + ${c}`,
      questionLatex: `\\text{Evaluate: } ${a} \\times ${b} + ${c}`,
      correctAnswer: String(answer), answerFormat: 'integer',
    }
  } else if (difficulty === 'medium') {
    const a = randInt(2, 6), b = randInt(1, 8), c = randInt(1, 5), d = randInt(1, 9)
    const answer = a * (b + c) - d
    return {
      questionText: `Evaluate: ${a}(${b} + ${c}) - ${d}`,
      questionLatex: `\\text{Evaluate: } ${a}(${b} + ${c}) - ${d}`,
      correctAnswer: String(answer), answerFormat: 'integer',
    }
  } else {
    const base = randInt(2, 5), exp = randInt(2, 3)
    const power = Math.pow(base, exp)
    const b = randInt(1, 10), c = randInt(1, 5)
    const answer = power + b * c
    return {
      questionText: `Evaluate: ${base}^${exp} + ${b} × ${c}`,
      questionLatex: `\\text{Evaluate: } ${base}^{${exp}} + ${b} \\times ${c}`,
      correctAnswer: String(answer), answerFormat: 'integer',
    }
  }
}

function makePrimeFactorization(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const composites: Record<string, { n: number; factors: string }[]> = {
    easy: [
      { n: 12, factors: '2x2x3' }, { n: 18, factors: '2x3x3' },
      { n: 20, factors: '2x2x5' }, { n: 24, factors: '2x2x2x3' },
      { n: 8, factors: '2x2x2' }, { n: 16, factors: '2x2x2x2' },
    ],
    medium: [
      { n: 36, factors: '2x2x3x3' }, { n: 48, factors: '2x2x2x2x3' },
      { n: 60, factors: '2x2x3x5' }, { n: 45, factors: '3x3x5' },
      { n: 72, factors: '2x2x2x3x3' }, { n: 50, factors: '2x5x5' },
    ],
    hard: [
      { n: 100, factors: '2x2x5x5' }, { n: 120, factors: '2x2x2x3x5' },
      { n: 84, factors: '2x2x3x7' }, { n: 90, factors: '2x3x3x5' },
      { n: 150, factors: '2x3x5x5' }, { n: 180, factors: '2x2x3x3x5' },
    ],
  }
  const pool = composites[difficulty]
  const choice = pool[Math.floor(Math.random() * pool.length)]
  return {
    questionText: `Find the prime factorization of ${choice.n}. (Write factors separated by x, like 2x2x3)`,
    correctAnswer: choice.factors,
    acceptableAnswers: [choice.factors, choice.factors.replace(/x/g, '*'), choice.factors.replace(/x/g, '×')],
    answerFormat: 'expression',
  }
}

function makeExpressionsVsEquations(_difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const isEquation = Math.random() > 0.5
  const a = randInt(2, 9), b = randInt(1, 10)
  let text: string
  if (isEquation) {
    const c = a * randInt(1, 5) + b
    text = `${a}x + ${b} = ${c}`
  } else {
    text = `${a}x + ${b}`
  }
  return {
    questionText: `Is "${text}" an expression or an equation? (Type: expression or equation)`,
    correctAnswer: isEquation ? 'equation' : 'expression',
    acceptableAnswers: isEquation ? ['equation', 'eq'] : ['expression', 'expr'],
    answerFormat: 'multiple-choice',
  }
}

function makeEquivalentExpressions(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  // Generate two expressions, ask if equivalent
  const a = randInt(2, 6)
  const b = randInt(1, 8)
  const c = randInt(1, 8)

  if (difficulty === 'easy') {
    // a(x + b) vs ax + ab — always equivalent
    const equivalent = Math.random() > 0.3
    const right = equivalent ? `${a * 1}x + ${a * b}` : `${a}x + ${b}`
    const isEq = equivalent
    return {
      questionText: `Are these equivalent? ${a}(x + ${b}) and ${right}. (yes or no)`,
      correctAnswer: isEq ? 'yes' : 'no',
      acceptableAnswers: isEq ? ['yes', 'y', 'true'] : ['no', 'n', 'false'],
      answerFormat: 'multiple-choice',
    }
  } else {
    // distribute and simplify: a(x + b) + c
    const expanded = a * b + c
    return {
      questionText: `Simplify: ${a}(x + ${b}) + ${c}`,
      correctAnswer: `${a}x+${expanded}`,
      acceptableAnswers: [`${a}x+${expanded}`, `${a}x + ${expanded}`],
      answerFormat: 'expression',
    }
  }
}

function makeDistributiveProperty(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const a = randInt(2, difficulty === 'easy' ? 5 : 9)
  const b = randInt(1, difficulty === 'easy' ? 5 : 10)
  const c = randInt(1, difficulty === 'easy' ? 5 : 10)
  const sign = Math.random() > 0.5 ? '+' : '-'
  const inner = sign === '+' ? `x + ${b}` : `x - ${b}`
  const result_const = sign === '+' ? a * b + c : -(a * b) + c

  if (difficulty === 'hard') {
    // a(x + b) + c(x + d)
    const d = randInt(1, 8)
    const totalX = a + c
    const totalConst = a * b + c * d
    return {
      questionText: `Expand and simplify: ${a}(x + ${b}) + ${c}(x + ${d})`,
      correctAnswer: `${totalX}x+${totalConst}`,
      acceptableAnswers: [`${totalX}x+${totalConst}`, `${totalX}x + ${totalConst}`],
      answerFormat: 'expression',
    }
  }

  return {
    questionText: `Use the distributive property to expand: ${a}(${inner}) + ${c}`,
    correctAnswer: result_const >= 0 ? `${a}x+${result_const}` : `${a}x${result_const}`,
    acceptableAnswers: [
      `${a}x+${result_const}`, `${a}x + ${result_const}`,
      `${a}x${result_const}`, `${a}x ${result_const}`,
    ],
    answerFormat: 'expression',
  }
}

export const teks67Templates: ProblemTemplate[] = [
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.7A-order-ops-${d}`, teksCode: '6.7A', strand: 3,
    title: 'Order of operations',
    difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeOrderOfOps(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.7A-prime-factor-${d}`, teksCode: '6.7A', strand: 3,
    title: 'Prime factorization',
    difficulty: d, answerFormat: 'expression' as const,
    generate: () => makePrimeFactorization(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.7B-expr-vs-eq-${d}`, teksCode: '6.7B', strand: 3,
    title: 'Expression or equation?',
    difficulty: d, answerFormat: 'multiple-choice' as const,
    generate: () => makeExpressionsVsEquations(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.7C-equiv-expr-${d}`, teksCode: '6.7C', strand: 3,
    title: 'Equivalent expressions',
    difficulty: d, answerFormat: d === 'easy' ? 'multiple-choice' as const : 'expression' as const,
    generate: () => makeEquivalentExpressions(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.7D-distributive-${d}`, teksCode: '6.7D', strand: 3,
    title: 'Distributive property',
    difficulty: d, answerFormat: 'expression' as const,
    generate: () => makeDistributiveProperty(d),
  })),
]
