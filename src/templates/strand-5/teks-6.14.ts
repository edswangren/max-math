import type { ProblemTemplate, GeneratedProblem } from '../types'
import { randInt } from '../../utils/math'

// 6.14A-H — Personal Financial Literacy (mostly conceptual, multiple-choice)

function makeCheckingVsDebit(_difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const questions = [
    { q: 'Which typically has a monthly maintenance fee — a checking account or a debit card?', a: 'checking account', alts: ['checking', 'checking account'] },
    { q: 'Which allows you to spend money directly from your bank account — a debit card or a credit card?', a: 'debit card', alts: ['debit', 'debit card'] },
    { q: 'A debit card withdraws money from your ___. (Type: bank account or credit line)', a: 'bank account', alts: ['bank account', 'bank', 'account'] },
  ]
  const q = questions[Math.floor(Math.random() * questions.length)]
  return { questionText: q.q, correctAnswer: q.a, acceptableAnswers: q.alts, answerFormat: 'multiple-choice' }
}

function makeDebitVsCredit(_difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const isDebit = Math.random() > 0.5
  const features = isDebit
    ? ['Uses money already in your account', 'No interest charges', 'Cannot spend more than your balance']
    : ['Borrows money that must be repaid', 'Charges interest if balance not paid', 'Can spend beyond current cash']
  const feature = features[Math.floor(Math.random() * features.length)]
  return {
    questionText: `"${feature}" — Is this a feature of a debit card or credit card?`,
    correctAnswer: isDebit ? 'debit' : 'credit',
    acceptableAnswers: isDebit ? ['debit', 'debit card'] : ['credit', 'credit card'],
    answerFormat: 'multiple-choice',
  }
}

function makeCheckRegister(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  let balance = randInt(100, 500)
  const steps = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4
  const transactions: string[] = []
  for (let i = 0; i < steps; i++) {
    const isDeposit = Math.random() > 0.5
    const amount = randInt(10, 100)
    if (isDeposit) {
      balance += amount
      transactions.push(`deposit $${amount}`)
    } else {
      balance -= amount
      transactions.push(`withdrawal $${amount}`)
    }
  }
  return {
    questionText: `Starting balance: $${balance - transactions.reduce((sum, t) => {
      const amt = parseInt(t.match(/\d+/)![0])
      return t.startsWith('d') ? sum + amt : sum - amt
    }, 0)}. Transactions: ${transactions.join(', ')}. What is the final balance?`,
    correctAnswer: String(balance),
    answerFormat: 'integer',
  }
}

function makeCreditHistory(_difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const questions = [
    { q: 'Does paying bills on time help or hurt your credit history?', a: 'help', alts: ['help', 'helps', 'good'] },
    { q: 'Does missing credit card payments help or hurt your credit history?', a: 'hurt', alts: ['hurt', 'hurts', 'bad'] },
    { q: 'Is a positive credit history important for getting a loan? (yes or no)', a: 'yes', alts: ['yes', 'y'] },
    { q: 'How many years can negative information stay on a credit report? (answer: 7)', a: '7', alts: ['7', 'seven'] },
  ]
  const q = questions[Math.floor(Math.random() * questions.length)]
  return { questionText: q.q, correctAnswer: q.a, acceptableAnswers: q.alts, answerFormat: 'multiple-choice' }
}

function makeFinancialResponsibility(_difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const scenarios = [
    { q: 'Spending more than you earn each month is an example of financial ___ (responsibility or irresponsibility)', a: 'irresponsibility', alts: ['irresponsibility', 'irresponsible'] },
    { q: 'Creating and following a budget is an example of financial ___ (responsibility or irresponsibility)', a: 'responsibility', alts: ['responsibility', 'responsible'] },
    { q: 'Saving part of each paycheck is financially ___ (responsible or irresponsible)', a: 'responsible', alts: ['responsible', 'responsibility'] },
  ]
  const s = scenarios[Math.floor(Math.random() * scenarios.length)]
  return { questionText: s.q, correctAnswer: s.a, acceptableAnswers: s.alts, answerFormat: 'multiple-choice' }
}

function makeBudgetProblem(difficulty: 'easy' | 'medium' | 'hard'): GeneratedProblem {
  const tuitionPerYear = randInt(5, difficulty === 'easy' ? 15 : 30) * 1000
  const years = Math.random() > 0.5 ? 2 : 4
  const total = tuitionPerYear * years
  return {
    questionText: `If college tuition is $${tuitionPerYear.toLocaleString()} per year, estimate the total cost for ${years} years.`,
    correctAnswer: String(total),
    acceptableAnswers: [String(total), `$${total.toLocaleString()}`],
    answerFormat: 'integer',
  }
}

export const teks614Templates: ProblemTemplate[] = [
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.14A-checking-${d}`, teksCode: '6.14A', strand: 5,
    title: 'Checking accounts & debit cards', difficulty: d, answerFormat: 'multiple-choice' as const,
    generate: () => makeCheckingVsDebit(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.14B-debit-credit-${d}`, teksCode: '6.14B', strand: 5,
    title: 'Debit vs credit cards', difficulty: d, answerFormat: 'multiple-choice' as const,
    generate: () => makeDebitVsCredit(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.14C-register-${d}`, teksCode: '6.14C', strand: 5,
    title: 'Check register', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeCheckRegister(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.14D-credit-hist-${d}`, teksCode: '6.14D', strand: 5,
    title: 'Credit history', difficulty: d, answerFormat: 'multiple-choice' as const,
    generate: () => makeCreditHistory(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.14E-credit-report-${d}`, teksCode: '6.14E', strand: 5,
    title: 'Credit reports', difficulty: d, answerFormat: 'multiple-choice' as const,
    generate: () => makeCreditHistory(d), // reuses
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.14F-responsibility-${d}`, teksCode: '6.14F', strand: 5,
    title: 'Financial responsibility', difficulty: d, answerFormat: 'multiple-choice' as const,
    generate: () => makeFinancialResponsibility(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.14G-budget-${d}`, teksCode: '6.14G', strand: 5,
    title: 'College cost estimation', difficulty: d, answerFormat: 'integer' as const,
    generate: () => makeBudgetProblem(d),
  })),
  ...(['easy', 'medium', 'hard'] as const).map((d) => ({
    id: `6.14H-savings-${d}`, teksCode: '6.14H', strand: 5,
    title: 'Savings options', difficulty: d, answerFormat: 'multiple-choice' as const,
    generate: () => makeFinancialResponsibility(d), // reuses conceptual questions
  })),
]
