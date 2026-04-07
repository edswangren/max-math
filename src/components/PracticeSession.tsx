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
        <p className="text-smoke mb-6">Problems for this standard are coming soon. Patience, Max.</p>
        <Link to="/" className="text-neon hover:underline">Back to Home</Link>
      </div>
    )
  }

  if (problems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-smoke">No problems at this difficulty. Try another level.</p>
        <DifficultySelector value={difficulty} onChange={handleDifficultyChange} />
      </div>
    )
  }

  const perfectMessages = [
    "FLAWLESS VICTORY. You are literally him.",
    "10/10. The math didn't stand a chance.",
    "Max woke up dangerous today.",
    "Not a single miss. Are you cheating? (jk... unless?)",
  ]
  const goodMessages = [
    "Solid run, Max. Respect.",
    "Not bad at all. You're getting scary good.",
    "W session. A couple slipped but overall fire.",
  ]
  const midMessages = [
    "Decent. But we both know you can do better.",
    "Mid performance tbh. Run it back?",
    "The math got a few hits in. Time for revenge.",
  ]
  const roughMessages = [
    "Bro... we need to talk about this one.",
    "The math won this round. But it's best of 3, right?",
    "Down bad. But every legend has an origin story.",
    "That was rough. Let's pretend it didn't happen and try again.",
  ]

  if (finished) {
    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]
    const msg = score === TOTAL_PROBLEMS ? pick(perfectMessages)
      : score >= TOTAL_PROBLEMS * 0.8 ? pick(goodMessages)
      : score >= TOTAL_PROBLEMS * 0.6 ? pick(midMessages)
      : pick(roughMessages)

    const scoreColor = score === TOTAL_PROBLEMS ? 'text-neon'
      : score >= TOTAL_PROBLEMS * 0.8 ? 'text-neon'
      : score >= TOTAL_PROBLEMS * 0.6 ? 'text-yellow-400'
      : 'text-lava'

    return (
      <div className="text-center">
        <h1 className="text-2xl font-black mb-4">Session Complete</h1>
        <p className="text-sm text-smoke mb-2">TEKS {teksCode} &middot; {difficulty}</p>
        <div className="bg-void-light rounded-xl border border-void-lighter p-8 mb-6">
          <p className={`text-6xl font-black mb-3 ${scoreColor}`}>
            {score}/{TOTAL_PROBLEMS}
          </p>
          <p className="text-smoke text-lg">{msg}</p>
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={handleRestart}
            className="bg-neon text-void font-bold px-6 py-2 rounded-xl hover:bg-neon-dim transition-colors"
          >
            Run it back
          </button>
          <Link
            to="/"
            className="border border-void-lighter text-smoke px-6 py-2 rounded-xl hover:border-white/30 hover:text-white transition-colors"
          >
            Home
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

      <div className="flex justify-between items-center mb-2 text-sm text-smoke">
        <span>Score: <span className="text-neon font-bold">{score}</span>/{currentIndex + (feedback ? 1 : 0)}</span>
      </div>

      <ProblemDisplay
        questionText={current.questionText}
        questionLatex={current.questionLatex}
        problemNumber={currentIndex + 1}
        totalProblems={TOTAL_PROBLEMS}
        hint={current.hint}
      />

      {!feedback && <AnswerInput onSubmit={handleSubmit} answerFormat={current.answerFormat} />}

      {feedback && (
        <FeedbackBanner
          correct={feedback.correct}
          correctAnswer={current.correctAnswer}
          userAnswer={feedback.userAnswer}
          onNext={handleNext}
          checkWork={current.checkWork}
          checkWorkLatex={current.checkWorkLatex}
        />
      )}
    </div>
  )
}
