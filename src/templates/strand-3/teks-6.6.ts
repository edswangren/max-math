import type { ProblemTemplate, GeneratedProblem } from '../types'
import { randInt, randIntExcluding } from '../../utils/math'

// 6.6A — Identify independent and dependent quantities from tables
// 6.6B — Write an equation from a table
// 6.6C — Represent a situation using y=kx or y=x+b

function makeIdentifyQuantities(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const scenarios = [
    { ind: 'hours worked', dep: 'money earned', rate: randInt(8, 20) },
    { ind: 'miles driven', dep: 'gallons used', rate: difficulty === 'easy' ? 1 : randInt(2, 5) },
    { ind: 'days', dep: 'pages read', rate: randInt(10, 50) },
    { ind: 'number of items', dep: 'total cost', rate: randInt(2, 15) },
    { ind: 'hours', dep: 'distance traveled', rate: randInt(30, 70) },
  ]
  const s = scenarios[Math.floor(Math.random() * scenarios.length)]

  const indWord = s.ind.split(' ').slice(-1)[0]
  const depWord = s.dep.split(' ').slice(-1)[0]
  return {
    questionText: `In the relationship between "${s.ind}" and "${s.dep}", which is the independent variable?`,
    correctAnswer: indWord,
    acceptableAnswers: [s.ind, indWord, s.ind.toLowerCase()],
    answerFormat: 'multiple-choice',
    hint: `Type: ${indWord} or ${depWord}`,
  }
}

function makeWriteEquation(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const isMultiplicative = Math.random() > 0.4
  if (isMultiplicative) {
    const k = randInt(2, difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15)
    const xs = [1, 2, 3, 4, 5]
    const ys = xs.map((x) => k * x)
    const table = xs.map((x, i) => `x=${x}, y=${ys[i]}`).join(' | ')
    return {
      questionText: `Write the equation for this table: ${table}.`,
      correctAnswer: `y=${k}x`,
      acceptableAnswers: [`y=${k}x`, `y = ${k}x`, `y=${k}*x`],
      answerFormat: 'expression',
      hint: 'Use the form y=kx',
      checkWork: `Plug in x=2: y = ${k}(2) = ${k * 2}. Table confirms y=${ys[1]}`,
    }
  } else {
    const b = randIntExcluding(1, difficulty === 'easy' ? 10 : 20, [0])
    const xs = [1, 2, 3, 4, 5]
    const ys = xs.map((x) => x + b)
    const table = xs.map((x, i) => `x=${x}, y=${ys[i]}`).join(' | ')
    return {
      questionText: `Write the equation for this table: ${table}.`,
      correctAnswer: `y=x+${b}`,
      acceptableAnswers: [`y=x+${b}`, `y = x + ${b}`, `y=x+${b}`],
      answerFormat: 'expression',
      hint: 'Use the form y=x+b',
      checkWork: `Plug in x=2: y = 2 + ${b} = ${2 + b}. Table confirms y=${ys[1]}`,
    }
  }
}

function makeRepresentSituation(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const isMultiplicative = Math.random() > 0.5
  if (isMultiplicative) {
    const k = randInt(2, difficulty === 'easy' ? 5 : 12)
    const scenarios = [
      `A store sells pencils for $${k} each. Write an equation for total cost y in terms of number of pencils x.`,
      `A car travels ${k} miles per hour. Write an equation for distance y in terms of hours x.`,
      `A machine makes ${k} widgets per minute. Write an equation for total widgets y in terms of minutes x.`,
    ]
    return {
      questionText: scenarios[Math.floor(Math.random() * scenarios.length)],
      correctAnswer: `y=${k}x`,
      acceptableAnswers: [`y=${k}x`, `y = ${k}x`, `y=${k}*x`],
      answerFormat: 'expression',
      checkWork: `Plug in x=2: y = ${k}(2) = ${k * 2}`,
    }
  } else {
    const b = randInt(2, difficulty === 'easy' ? 10 : 20)
    const scenarios = [
      `You have ${b} stickers and get 1 more each day. Write an equation for total stickers y after x days.`,
      `A pool has ${b} gallons and gains 1 gallon per minute. Write an equation for total gallons y after x minutes.`,
    ]
    return {
      questionText: scenarios[Math.floor(Math.random() * scenarios.length)],
      correctAnswer: `y=x+${b}`,
      acceptableAnswers: [`y=x+${b}`, `y = x + ${b}`],
      answerFormat: 'expression',
      checkWork: `After x=1 day: y = 1 + ${b} = ${1 + b}`,
    }
  }
}

export const teks66Templates: ProblemTemplate[] = [
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.6A-identify-${d}`, teksCode: '6.6A', strand: 3,
    title: 'Identify independent & dependent quantities',
    difficulty: d, answerFormat: 'multiple-choice' as const,
    generate: () => makeIdentifyQuantities(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.6B-write-eq-${d}`, teksCode: '6.6B', strand: 3,
    title: 'Write equation from table',
    difficulty: d, answerFormat: 'expression' as const,
    generate: () => makeWriteEquation(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.6C-represent-${d}`, teksCode: '6.6C', strand: 3,
    title: 'Represent situation as equation',
    difficulty: d, answerFormat: 'expression' as const,
    generate: () => makeRepresentSituation(d),
  })),
]
