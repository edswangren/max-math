interface Props {
  correct: boolean
  correctAnswer: string
  userAnswer: string
  onNext: () => void
}

export default function FeedbackBanner({ correct, correctAnswer, userAnswer, onNext }: Props) {
  return (
    <div
      className={`mt-4 p-4 rounded-lg border ${
        correct
          ? 'bg-green-50 border-green-300 text-green-800'
          : 'bg-red-50 border-red-300 text-red-800'
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          {correct ? (
            <p className="font-semibold text-lg">Correct!</p>
          ) : (
            <div>
              <p className="font-semibold text-lg">Not quite.</p>
              <p className="text-sm mt-1">
                You answered <strong>{userAnswer}</strong> — the correct answer is{' '}
                <strong>{correctAnswer}</strong>
              </p>
            </div>
          )}
        </div>
        <button
          onClick={onNext}
          autoFocus
          className="bg-white border border-current rounded-lg px-4 py-2 text-sm font-medium hover:opacity-80"
        >
          Next
        </button>
      </div>
    </div>
  )
}
