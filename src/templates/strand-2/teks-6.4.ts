import type { ProblemTemplate, GeneratedProblem } from '../types'
import { randInt } from '../../utils/math'

// 6.4A — Additive vs multiplicative relationships
// 6.4B — Ratios & rates reasoning
// 6.4C — Ratios as multiplicative comparisons
// 6.4D — Rates as quotients
// 6.4E — Represent percents with fractions/decimals
// 6.4F — Benchmark percents
// 6.4G — Equivalent forms of fractions/decimals/percents
// 6.4H — Unit conversions

function makeAdditiveVsMultiplicative(_difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const isMult = Math.random() > 0.5
  const k = randInt(2, 8)
  const b = randInt(2, 10)
  const xs = [1, 2, 3, 4]
  const ys = isMult ? xs.map((x) => k * x) : xs.map((x) => x + b)
  const table = xs.map((x, i) => `(${x},${ys[i]})`).join(', ')
  return {
    questionText: `Is this relationship additive or multiplicative? ${table}`,
    correctAnswer: isMult ? 'multiplicative' : 'additive',
    acceptableAnswers: isMult ? ['multiplicative', 'mult'] : ['additive', 'add'],
    answerFormat: 'multiple-choice',
    hint: 'Type: additive or multiplicative',
  }
}

function makeRatioReasoning(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const a = randInt(2, difficulty === 'easy' ? 5 : 10)
  const b = randInt(2, difficulty === 'easy' ? 5 : 10)
  const scale = randInt(2, difficulty === 'easy' ? 4 : 8)
  return {
    questionText: `If the ratio of cats to dogs is ${a}:${b}, and there are ${a * scale} cats, how many dogs are there?`,
    correctAnswer: String(b * scale),
    answerFormat: 'integer',
    checkWork: `Check the ratio: ${a * scale}:${b * scale} simplifies to ${a}:${b}`,
  }
}

function makeRateAsQuotient(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const miles = randInt(10, difficulty === 'easy' ? 50 : 200)
  const hours = randInt(1, difficulty === 'easy' ? 5 : 8)
  const total = miles * hours
  return {
    questionText: `A car travels ${total} miles in ${hours} hours. What is the unit rate in miles per hour?`,
    correctAnswer: String(miles),
    answerFormat: 'integer',
    checkWork: `Check: ${miles} miles/hr × ${hours} hrs = ${total} miles`,
  }
}

function makePercentToFraction(_difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const percents = [10, 20, 25, 50, 75, 5, 40, 60, 80]
  const pct = percents[Math.floor(Math.random() * percents.length)]
  const askDecimal = Math.random() > 0.5
  if (askDecimal) {
    const dec = (pct / 100).toString()
    return {
      questionText: `Convert ${pct}% to a decimal.`,
      correctAnswer: dec,
      acceptableAnswers: [dec, (pct / 100).toFixed(2)],
      answerFormat: 'decimal',
      checkWork: `Check: ${dec} × 100 = ${pct}%`,
    }
  } else {
    // simplified fraction
    const fractions: Record<number, string> = {
      10: '1/10', 20: '1/5', 25: '1/4', 50: '1/2', 75: '3/4',
      5: '1/20', 40: '2/5', 60: '3/5', 80: '4/5',
    }
    return {
      questionText: `Convert ${pct}% to a simplified fraction.`,
      correctAnswer: fractions[pct],
      answerFormat: 'fraction',
      checkWork: `Check: ${fractions[pct]} = ${pct} ÷ 100 = ${pct}%`,
    }
  }
}

function makeBenchmarkPercent(_difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const benchmarks = [
    { pct: 10, of: randInt(2, 20) * 10 },
    { pct: 25, of: randInt(1, 10) * 4 },
    { pct: 50, of: randInt(1, 20) * 2 },
    { pct: 1, of: randInt(1, 10) * 100 },
  ]
  const b = benchmarks[Math.floor(Math.random() * benchmarks.length)]
  const answer = (b.pct / 100) * b.of
  return {
    questionText: `What is ${b.pct}% of ${b.of}?`,
    correctAnswer: String(answer),
    answerFormat: Number.isInteger(answer) ? 'integer' : 'decimal',
    checkWork: `Check: ${b.pct}% means ${b.pct}/100 = ${b.pct / 100}. Then ${b.pct / 100} × ${b.of} = ${answer}`,
  }
}

function makeEquivalentForms(_difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const forms: { frac: string; dec: string; pct: string }[] = [
    { frac: '1/4', dec: '0.25', pct: '25%' },
    { frac: '1/2', dec: '0.5', pct: '50%' },
    { frac: '3/4', dec: '0.75', pct: '75%' },
    { frac: '1/5', dec: '0.2', pct: '20%' },
    { frac: '2/5', dec: '0.4', pct: '40%' },
    { frac: '3/10', dec: '0.3', pct: '30%' },
    { frac: '1/8', dec: '0.125', pct: '12.5%' },
  ]
  const f = forms[Math.floor(Math.random() * forms.length)]
  const askType = Math.floor(Math.random() * 3)
  if (askType === 0) {
    return {
      questionText: `Convert ${f.frac} to a percent.`,
      correctAnswer: f.pct.replace('%', ''),
      acceptableAnswers: [f.pct, f.pct.replace('%', '')],
      answerFormat: 'multiple-choice',
    }
  } else if (askType === 1) {
    return {
      questionText: `Convert ${f.dec} to a fraction (simplify).`,
      correctAnswer: f.frac,
      answerFormat: 'fraction',
    }
  } else {
    return {
      questionText: `Convert ${f.pct} to a decimal.`,
      correctAnswer: f.dec,
      answerFormat: 'decimal',
    }
  }
}

function makeUnitConversion(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const conversions = [
    { from: 'feet', to: 'inches', factor: 12, range: [1, difficulty === 'easy' ? 5 : 10] },
    { from: 'yards', to: 'feet', factor: 3, range: [1, difficulty === 'easy' ? 10 : 20] },
    { from: 'cups', to: 'pints', factor: 0.5, range: [2, difficulty === 'easy' ? 8 : 16] },
    { from: 'meters', to: 'centimeters', factor: 100, range: [1, difficulty === 'easy' ? 5 : 10] },
    { from: 'kilograms', to: 'grams', factor: 1000, range: [1, 5] },
  ]
  const c = conversions[Math.floor(Math.random() * conversions.length)]
  const amount = randInt(c.range[0] as number, c.range[1] as number)
  const answer = amount * c.factor
  return {
    questionText: `Convert ${amount} ${c.from} to ${c.to}.`,
    correctAnswer: String(answer),
    answerFormat: Number.isInteger(answer) ? 'integer' : 'decimal',
    checkWork: `Check: ${answer} ${c.to} ÷ ${c.factor} = ${amount} ${c.from}`,
  }
}

export const teks64Templates: ProblemTemplate[] = [
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.4A-add-mult-${d}`, teksCode: '6.4A', strand: 2,
    title: 'Additive vs multiplicative', difficulty: d, answerFormat: 'multiple-choice' as const,
    generate: () => makeAdditiveVsMultiplicative(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.4B-ratio-${d}`, teksCode: '6.4B', strand: 2,
    title: 'Ratio reasoning', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeRatioReasoning(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.4C-ratio-compare-${d}`, teksCode: '6.4C', strand: 2,
    title: 'Ratios as comparisons', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeRatioReasoning(d), // reuses ratio reasoning pattern
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.4D-rate-${d}`, teksCode: '6.4D', strand: 2,
    title: 'Unit rates', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeRateAsQuotient(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.4E-pct-${d}`, teksCode: '6.4E', strand: 2,
    title: 'Percents as fractions/decimals', difficulty: d, answerFormat: 'fraction' as const,
    generate: () => makePercentToFraction(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.4F-benchmark-${d}`, teksCode: '6.4F', strand: 2,
    title: 'Benchmark percents', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeBenchmarkPercent(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.4G-equiv-${d}`, teksCode: '6.4G', strand: 2,
    title: 'Equivalent forms', difficulty: d, answerFormat: 'multiple-choice' as const,
    generate: () => makeEquivalentForms(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.4H-convert-${d}`, teksCode: '6.4H', strand: 2,
    title: 'Unit conversions', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeUnitConversion(d),
  })),
]
