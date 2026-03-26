interface Props {
  correct: boolean
  correctAnswer: string
  userAnswer: string
  onNext: () => void
}

const correctQuips = [
  "SHEEEESH. Nailed it.",
  "Too easy for you, Max.",
  "Big brain energy right there.",
  "You're kinda cracked at this ngl.",
  "W.",
  "That's what I thought.",
  "Math just got bodied.",
  "Bro didn't even flinch.",
  "Clean.",
  "No calculator needed, apparently.",
]

const wrongQuips = [
  "Oof. We'll get the next one.",
  "That ain't it, chief.",
  "L. But a learning L.",
  "The math fought back this time.",
  "Close... kinda... not really.",
  "Even LeBron misses free throws sometimes.",
  "Cap answer detected.",
  "Your brain lagged for a sec.",
]

function pickQuip(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function FeedbackBanner({ correct, correctAnswer, userAnswer, onNext }: Props) {
  return (
    <div
      className={`mt-4 p-4 rounded-xl border ${
        correct
          ? 'bg-neon/10 border-neon/40 text-neon'
          : 'bg-lava/10 border-lava/40 text-lava'
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          {correct ? (
            <p className="font-bold text-lg">{pickQuip(correctQuips)}</p>
          ) : (
            <div>
              <p className="font-bold text-lg">{pickQuip(wrongQuips)}</p>
              <p className="text-sm mt-1 text-smoke">
                You said <strong className="text-white">{userAnswer}</strong> — answer was{' '}
                <strong className="text-white">{correctAnswer}</strong>
              </p>
            </div>
          )}
        </div>
        <button
          onClick={onNext}
          autoFocus
          className={`border rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
            correct
              ? 'border-neon text-neon hover:bg-neon/20'
              : 'border-lava text-lava hover:bg-lava/20'
          }`}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  )
}
