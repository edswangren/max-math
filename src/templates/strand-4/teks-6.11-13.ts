import type { ProblemTemplate, GeneratedProblem } from '../types'
import { randInt } from '../../utils/math'

// 6.11 — Coordinate plane (all four quadrants)
// 6.12A-D — Data representations, center/spread, categorical
// 6.13A-B — Interpret data, variability

function makeCoordinatePlane(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const range = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 20
  const x = randInt(-range, range)
  const y = randInt(-range, range)
  const quadrant = x > 0 && y > 0 ? 'I' : x < 0 && y > 0 ? 'II' : x < 0 && y < 0 ? 'III' : x > 0 && y < 0 ? 'IV' : 'axis'
  if (quadrant === 'axis') {
    return makeCoordinatePlane(difficulty) // retry if on axis
  }
  return {
    questionText: `In which quadrant is the point (${x}, ${y})? (Type I, II, III, or IV)`,
    correctAnswer: quadrant,
    acceptableAnswers: [quadrant, quadrant.toLowerCase(), String(['I','II','III','IV'].indexOf(quadrant) + 1)],
    answerFormat: 'multiple-choice',
  }
}

function makeMeanMedian(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const count = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 7 : 9
  const nums = Array.from({ length: count }, () => randInt(1, difficulty === 'easy' ? 20 : 50))
  const sorted = [...nums].sort((a, b) => a - b)
  const askMean = Math.random() > 0.5

  if (askMean) {
    const sum = nums.reduce((a, b) => a + b, 0)
    const mean = sum / count
    const isInt = Number.isInteger(mean)
    return {
      questionText: `Find the mean of: ${nums.join(', ')}${!isInt ? ' (round to 1 decimal)' : ''}`,
      correctAnswer: isInt ? String(mean) : mean.toFixed(1),
      answerFormat: isInt ? 'integer' : 'decimal',
    }
  } else {
    const median = sorted[Math.floor(count / 2)]
    return {
      questionText: `Find the median of: ${nums.join(', ')}`,
      correctAnswer: String(median),
      answerFormat: 'integer',
    }
  }
}

function makeRange(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const count = difficulty === 'easy' ? 5 : 7
  const nums = Array.from({ length: count }, () => randInt(1, difficulty === 'easy' ? 30 : 100))
  const range = Math.max(...nums) - Math.min(...nums)
  return {
    questionText: `Find the range of: ${nums.join(', ')}`,
    correctAnswer: String(range),
    answerFormat: 'integer',
  }
}

function makeIQR(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  // generate odd-count dataset for clean quartiles
  const sorted = Array.from({ length: 7 }, () => randInt(1, difficulty === 'easy' ? 20 : 50)).sort((a, b) => a - b)
  const q1 = sorted[1] // median of lower half [0,1,2]
  const q3 = sorted[5] // median of upper half [4,5,6]
  const iqr = q3 - q1
  return {
    questionText: `Find the IQR (interquartile range) of: ${sorted.join(', ')}`,
    correctAnswer: String(iqr),
    answerFormat: 'integer',
  }
}

function makeVariability(_difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const scenarios = [
    { q: 'How many students are in Mrs. Smith\'s class at 10:00 AM on Monday?', hasVar: false },
    { q: 'How many students are in Mrs. Smith\'s class each day this week?', hasVar: true },
    { q: 'What is the temperature at noon today?', hasVar: false },
    { q: 'What are the noon temperatures for the past 7 days?', hasVar: true },
    { q: 'How many pages are in this book?', hasVar: false },
    { q: 'How many pages did each student read last month?', hasVar: true },
  ]
  const s = scenarios[Math.floor(Math.random() * scenarios.length)]
  return {
    questionText: `Does this question yield data with variability? "${s.q}" (yes or no)`,
    correctAnswer: s.hasVar ? 'yes' : 'no',
    acceptableAnswers: s.hasVar ? ['yes', 'y'] : ['no', 'n'],
    answerFormat: 'multiple-choice',
  }
}

function makeCategoricalData(_difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const categories = ['red', 'blue', 'green', 'yellow']
  const counts = categories.map(() => randInt(2, 15))
  const total = counts.reduce((a, b) => a + b, 0)
  const askIdx = Math.floor(Math.random() * categories.length)
  const pct = Math.round((counts[askIdx] / total) * 100)
  const table = categories.map((c, i) => `${c}: ${counts[i]}`).join(', ')
  return {
    questionText: `Given the data: ${table}. What percent chose ${categories[askIdx]}? (Round to nearest whole number)`,
    correctAnswer: String(pct),
    acceptableAnswers: [String(pct), `${pct}%`],
    answerFormat: 'integer',
  }
}

export const teks611_13Templates: ProblemTemplate[] = [
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.11-quadrant-${d}`, teksCode: '6.11', strand: 4,
    title: 'Identify quadrant', difficulty: d, answerFormat: 'multiple-choice' as const,
    generate: () => makeCoordinatePlane(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.12A-data-rep-${d}`, teksCode: '6.12A', strand: 4,
    title: 'Data representations', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeMeanMedian(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.12B-center-spread-${d}`, teksCode: '6.12B', strand: 4,
    title: 'Center and spread', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeRange(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.12C-iqr-${d}`, teksCode: '6.12C', strand: 4,
    title: 'Mean, median, IQR', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeIQR(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.12D-categorical-${d}`, teksCode: '6.12D', strand: 4,
    title: 'Categorical data', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeCategoricalData(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.13A-interpret-${d}`, teksCode: '6.13A', strand: 4,
    title: 'Interpret data', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeMeanMedian(d), // reuses mean/median
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.13B-variability-${d}`, teksCode: '6.13B', strand: 4,
    title: 'Variability', difficulty: d, answerFormat: 'multiple-choice' as const,
    generate: () => makeVariability(d),
  })),
]
