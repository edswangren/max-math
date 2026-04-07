import type { ProblemTemplate, GeneratedProblem } from '../types'
import { randInt } from '../../utils/math'

// 6.8A — Triangle properties (angle sum, triangle inequality)
// 6.8B — Model area formulas (conceptual — we test the computation)
// 6.8C — Write area/volume equations
// 6.8D — Solve area/volume problems

function makeTriangleAngle(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const a1 = randInt(20, difficulty === 'easy' ? 80 : 120)
  const a2 = randInt(20, Math.min(159 - a1, difficulty === 'easy' ? 80 : 120))
  const a3 = 180 - a1 - a2
  // Ask for one of the three
  const ask = Math.floor(Math.random() * 3)
  const known = ask === 0 ? [a2, a3] : ask === 1 ? [a1, a3] : [a1, a2]
  const answer = ask === 0 ? a1 : ask === 1 ? a2 : a3
  return {
    questionText: `A triangle has angles of ${known[0]}° and ${known[1]}°. What is the third angle?`,
    questionLatex: `\\text{A triangle has angles } ${known[0]}° \\text{ and } ${known[1]}°. \\text{ Find the third angle.}`,
    correctAnswer: String(answer),
    answerFormat: 'integer',
    checkWork: `Check: ${known[0]}° + ${known[1]}° + ${answer}° = ${known[0] + known[1] + answer}° = 180°`,
  }
}

function makeTriangleInequality(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const canForm = Math.random() > 0.4
  let a: number, b: number, c: number
  if (canForm) {
    a = randInt(3, difficulty === 'easy' ? 10 : 20)
    b = randInt(3, difficulty === 'easy' ? 10 : 20)
    c = randInt(Math.abs(a - b) + 1, a + b - 1)
  } else {
    a = randInt(2, 10)
    b = randInt(2, 10)
    c = a + b + randInt(1, 5)
  }
  const checkWork = canForm
    ? `Check all three: ${a}+${b}=${a + b} > ${c}, ${a}+${c}=${a + c} > ${b}, ${b}+${c}=${b + c} > ${a}. All pass!`
    : `Check: ${a}+${b}=${a + b}, but ${c} is not less than ${a + b}. Fails!`
  return {
    questionText: `Can sides of length ${a}, ${b}, and ${c} form a triangle?`,
    hint: 'yes or no',
    correctAnswer: canForm ? 'yes' : 'no',
    acceptableAnswers: canForm ? ['yes', 'y', 'true'] : ['no', 'n', 'false'],
    answerFormat: 'multiple-choice',
    checkWork,
  }
}

function makeAreaParallelogram(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const base = randInt(2, difficulty === 'easy' ? 10 : 20)
  const height = randInt(2, difficulty === 'easy' ? 10 : 15)
  const area = base * height
  return {
    questionText: `Find the area of a parallelogram with base ${base} and height ${height}.`,
    questionLatex: `\\text{Parallelogram: base} = ${base}, \\text{ height} = ${height}. \\text{ Area} = ?`,
    correctAnswer: String(area),
    answerFormat: 'integer',
    checkWork: `A = base × height = ${base} × ${height} = ${area}`,
  }
}

function makeAreaTriangle(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  // ensure integer area: base * height must be even
  let base = randInt(2, difficulty === 'easy' ? 10 : 20)
  let height = randInt(2, difficulty === 'easy' ? 10 : 15)
  if ((base * height) % 2 !== 0) base += 1
  const area = (base * height) / 2
  return {
    questionText: `Find the area of a triangle with base ${base} and height ${height}.`,
    questionLatex: `\\text{Triangle: base} = ${base}, \\text{ height} = ${height}. \\text{ Area} = ?`,
    correctAnswer: String(area),
    answerFormat: 'integer',
    checkWork: `A = ½ × base × height = ½ × ${base} × ${height} = ${area}`,
  }
}

function makeAreaTrapezoid(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  let b1 = randInt(3, difficulty === 'easy' ? 10 : 15)
  let b2 = randInt(3, difficulty === 'easy' ? 10 : 15)
  let h = randInt(2, difficulty === 'easy' ? 8 : 12)
  // ensure integer: (b1+b2)*h must be even
  if (((b1 + b2) * h) % 2 !== 0) h += 1
  const area = ((b1 + b2) * h) / 2
  return {
    questionText: `Find the area of a trapezoid with bases ${b1} and ${b2}, and height ${h}.`,
    questionLatex: `\\text{Trapezoid: } b_1=${b1}, b_2=${b2}, h=${h}. \\text{ Area} = ?`,
    correctAnswer: String(area),
    answerFormat: 'integer',
    checkWork: `A = ½(b₁ + b₂) × h = ½(${b1} + ${b2}) × ${h} = ½ × ${b1 + b2} × ${h} = ${area}`,
  }
}

function makeVolume(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const l = randInt(2, difficulty === 'easy' ? 8 : 12)
  const w = randInt(2, difficulty === 'easy' ? 8 : 10)
  const h = randInt(2, difficulty === 'easy' ? 8 : 10)
  const vol = l * w * h
  return {
    questionText: `Find the volume of a rectangular prism: length ${l}, width ${w}, height ${h}.`,
    questionLatex: `\\text{Rectangular prism: } l=${l}, w=${w}, h=${h}. \\text{ Volume} = ?`,
    correctAnswer: String(vol),
    answerFormat: 'integer',
    checkWork: `V = l × w × h = ${l} × ${w} × ${h} = ${vol}`,
  }
}

export const teks68Templates: ProblemTemplate[] = [
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.8A-triangle-angle-${d}`, teksCode: '6.8A', strand: 3,
    title: 'Find missing angle in triangle',
    difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeTriangleAngle(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.8A-triangle-ineq-${d}`, teksCode: '6.8A', strand: 3,
    title: 'Triangle inequality',
    difficulty: d, answerFormat: 'multiple-choice' as const,
    generate: () => makeTriangleInequality(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.8B-area-parallelogram-${d}`, teksCode: '6.8B', strand: 3,
    title: 'Area of parallelogram',
    difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeAreaParallelogram(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).flatMap((d) => [
    {
      id: `6.8C-area-triangle-${d}`, teksCode: '6.8C', strand: 3,
      title: 'Area of triangle',
      difficulty: d, answerFormat: 'integer' as const,
      generate: () => makeAreaTriangle(d),
    },
    {
      id: `6.8C-area-trapezoid-${d}`, teksCode: '6.8C', strand: 3,
      title: 'Area of trapezoid',
      difficulty: d, answerFormat: 'integer' as const,
      generate: () => makeAreaTrapezoid(d),
    },
  ]),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.8D-volume-${d}`, teksCode: '6.8D', strand: 3,
    title: 'Volume of rectangular prism',
    difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeVolume(d),
  })),
]
