import katex from 'katex'

interface Props {
  correct: boolean
  correctAnswer: string
  userAnswer: string
  onNext: () => void
  checkWork?: string
  checkWorkLatex?: string
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

export default function FeedbackBanner({ correct, correctAnswer, userAnswer, onNext, checkWork, checkWorkLatex }: Props) {
  const checkHtml = checkWorkLatex
    ? katex.renderToString(checkWorkLatex, { throwOnError: false, displayMode: false })
    : null

  return (
    <div
      className={`mt-4 rounded-xl border ${
        correct
          ? 'bg-neon/10 border-neon/40 text-neon'
          : 'bg-lava/10 border-lava/40 text-lava'
      }`}
    >
      <div className="flex justify-between items-center p-4">
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
          className={`border rounded-lg px-4 py-2 text-sm font-bold transition-colors shrink-0 ${
            correct
              ? 'border-neon text-neon hover:bg-neon/20'
              : 'border-lava text-lava hover:bg-lava/20'
          }`}
        >
          Next &rarr;
        </button>
      </div>
      {(checkWork || checkHtml) && (
        <div className="border-t border-white/10 px-4 py-3 bg-white/5 rounded-b-xl">
          <p className="text-xs font-bold text-smoke/80 uppercase tracking-wide mb-1">Check your work</p>
          {checkHtml ? (
            <div className="text-sm text-smoke" dangerouslySetInnerHTML={{ __html: checkHtml }} />
          ) : (
            <p className="text-sm text-smoke font-mono">{checkWork}</p>
          )}
        </div>
      )}
    </div>
  )
}
