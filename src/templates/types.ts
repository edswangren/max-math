export type AnswerFormat =
  | 'integer'
  | 'decimal'
  | 'fraction'
  | 'expression'
  | 'coordinate'
  | 'inequality'
  | 'multiple-choice'
  | 'money'

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface GeneratedProblem {
  questionText: string
  questionLatex?: string
  correctAnswer: string
  acceptableAnswers?: string[]
  answerFormat: AnswerFormat
}

export interface ProblemTemplate {
  id: string
  teksCode: string
  strand: number
  title: string
  difficulty: Difficulty
  answerFormat: AnswerFormat
  generate: () => GeneratedProblem
}
