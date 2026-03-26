import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import ProblemDisplay from './ProblemDisplay'
import AnswerInput from './AnswerInput'
import FeedbackBanner from './FeedbackBanner'
import DifficultySelector from './DifficultySelector'
import { getTemplatesForTeks, hasTemplates } from '../templates/registry'
import { checkAnswer } from '../templates/validator'
import { recordSession } from '../store/progress'
import { saveSession, type Mistake } from '../store/sessions'
import { getStandardByCode } from '../data/teks-catalog'
import type { Difficulty, GeneratedProblem } from '../templates/types'

const TOTAL_PROBLEMS = 10

function generateProblems(teksCode: string, difficulty: Difficulty): GeneratedProblem[] {
  const templates = getTemplatesForTeks(teksCode, difficulty)
  if (templates.length === 0) return []
  return Array.from({ length: TOTAL_PROBLEMS }, () => {
    const template = templates[Math.floor(Math.random() * templates.length)]
    return template.generate()
  })
}

export default function PracticeSession() {
  const { teksCode = '' } = useParams()
  const [searchParams] = useSearchParams()
  const initialDifficulty = (searchParams.get('d') as Difficulty) || 'easy'

  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty)
  const [sessionKey, setSessionKey] = useState(0) // bump to regenerate

  const problems = useMemo(
    () => generateProblems(teksCode, difficulty),
    [teksCode, difficulty, sessionKey]
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [feedback, setFeedback] = useState<{
    correct: boolean
    userAnswer: string
  } | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const mistakesRef = useRef<Mistake[]>([])
  const savedRef = useRef(false)

  const current = problems[currentIndex]
  const standard = getStandardByCode(teksCode)

  // Save session when finished
  useEffect(() => {
    if (finished && !savedRef.current) {
      savedRef.current = true
      recordSession(teksCode, difficulty, TOTAL_PROBLEMS, score)
      saveSession({
        teksCode,
        difficulty,
        totalProblems: TOTAL_PROBLEMS,
        correct: score,
        mistakes: mistakesRef.current,
      })
    }
  }, [finished, teksCode, difficulty, score])

  const handleDifficultyChange = useCallback((d: Difficulty) => {
    setDifficulty(d)
    setCurrentIndex(0)
    setFeedback(null)
    setScore(0)
    setFinished(false)
    mistakesRef.current = []
    savedRef.current = false
    setSessionKey((k) => k + 1)
  }, [])

  const handleSubmit = useCallback(
    (answer: string) => {
      if (feedback || !current) return
      const correct = checkAnswer(answer, current.correctAnswer, current.answerFormat, current.acceptableAnswers)
      if (correct) {
        setScore((s) => s + 1)
      } else {
        mistakesRef.current.push({
          templateId: teksCode,
          userAnswer: answer,
          correctAnswer: current.correctAnswer,
        })
      }
      setFeedback({ correct, userAnswer: answer })
    },
    [current, feedback, teksCode]
  )

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= TOTAL_PROBLEMS) {
      setFinished(true)
    } else {
      setCurrentIndex((i) => i + 1)
      setFeedback(null)
    }
  }, [currentIndex])

  const handleRestart = useCallback(() => {
    setCurrentIndex(0)
    setFeedback(null)
    setScore(0)
    setFinished(false)
    mistakesRef.current = []
    savedRef.current = false
    setSessionKey((k) => k + 1)
  }, [])

  if (!hasTemplates(teksCode)) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">TEKS {teksCode}</h1>
        <p className="text-gray-500 mb-6">Problems for this standard are coming soon.</p>
        <Link to="/" className="text-indigo-600 hover:underline">Back to Home</Link>
      </div>
    )
  }

  if (problems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No problems available for this difficulty. Try another level.</p>
        <DifficultySelector value={difficulty} onChange={handleDifficultyChange} />
      </div>
    )
  }

  if (finished) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Session Complete</h1>
        <p className="text-lg mb-2">TEKS {teksCode} — {difficulty}</p>
        <div className="bg-white rounded-lg border p-8 mb-6">
          <p className="text-5xl font-bold text-indigo-600 mb-2">
            {score}/{TOTAL_PROBLEMS}
          </p>
          <p className="text-gray-500">
            {score === TOTAL_PROBLEMS
              ? 'Perfect score!'
              : score >= TOTAL_PROBLEMS * 0.8
                ? 'Great job!'
                : score >= TOTAL_PROBLEMS * 0.6
                  ? 'Keep practicing!'
                  : "Let's review this topic."}
          </p>
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={handleRestart}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Practice Again
          </button>
          <Link
            to="/"
            className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-xl font-bold">TEKS {teksCode}{standard ? ` — ${standard.title}` : ''}</h1>
        <DifficultySelector value={difficulty} onChange={handleDifficultyChange} />
      </div>

      <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
        <span>Score: {score}/{currentIndex + (feedback ? 1 : 0)}</span>
      </div>

      <ProblemDisplay
        questionText={current.questionText}
        questionLatex={current.questionLatex}
        problemNumber={currentIndex + 1}
        totalProblems={TOTAL_PROBLEMS}
      />

      {!feedback && <AnswerInput onSubmit={handleSubmit} />}

      {feedback && (
        <FeedbackBanner
          correct={feedback.correct}
          correctAnswer={current.correctAnswer}
          userAnswer={feedback.userAnswer}
          onNext={handleNext}
        />
      )}
    </div>
  )
}
