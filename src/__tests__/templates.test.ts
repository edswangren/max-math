import { describe, it, expect } from 'vitest'
import { getAllTemplates, getAllTeksCodes, getTemplatesForTeks } from '../templates/registry'
import { checkAnswer } from '../templates/validator'
import { strands } from '../data/teks-catalog'

describe('Template Registry', () => {
  it('has templates registered', () => {
    const all = getAllTemplates()
    expect(all.length).toBeGreaterThan(0)
    console.log(`Total templates: ${all.length}`)
  })

  it('covers all 5 strands', () => {
    const all = getAllTemplates()
    const strandSet = new Set(all.map((t) => t.strand))
    expect(strandSet.size).toBe(5)
  })

  it('reports which TEKS codes have templates', () => {
    const codes = getAllTeksCodes()
    console.log(`TEKS codes with templates: ${codes.length}`)
    console.log(codes.sort().join(', '))

    // Check catalog coverage
    const allCatalogCodes = strands.flatMap((s) => s.standards.map((st) => st.code))
    const missing = allCatalogCodes.filter((c) => !codes.includes(c))
    console.log(`Missing from catalog (${missing.length}): ${missing.join(', ')}`)
  })
})

describe('Template Smoke Test — every template generates valid problems', () => {
  const allTemplates = getAllTemplates()

  for (const template of allTemplates) {
    it(`${template.id}: generates 50 valid problems without throwing`, () => {
      for (let i = 0; i < 50; i++) {
        const problem = template.generate()
        // Must have question text
        expect(problem.questionText).toBeTruthy()
        // Must have a correct answer
        expect(problem.correctAnswer).toBeTruthy()
        // Must have an answer format
        expect(problem.answerFormat).toBeTruthy()
        // Correct answer must validate against itself
        const selfCheck = checkAnswer(
          problem.correctAnswer,
          problem.correctAnswer,
          problem.answerFormat,
          problem.acceptableAnswers,
        )
        if (!selfCheck) {
          console.error(`Self-check failed for ${template.id}: answer="${problem.correctAnswer}", format=${problem.answerFormat}`)
          console.error(`  question: ${problem.questionText}`)
        }
        expect(selfCheck).toBe(true)
      }
    })
  }
})

describe('Template Difficulty Coverage', () => {
  const codes = getAllTeksCodes()

  for (const code of codes) {
    it(`${code}: has templates for at least easy difficulty`, () => {
      const easy = getTemplatesForTeks(code, 'easy')
      expect(easy.length).toBeGreaterThan(0)
    })
  }
})

describe('Validator', () => {
  it('integer: exact match', () => {
    expect(checkAnswer('7', '7', 'integer')).toBe(true)
    expect(checkAnswer(' 7 ', '7', 'integer')).toBe(true)
    expect(checkAnswer('8', '7', 'integer')).toBe(false)
    expect(checkAnswer('-3', '-3', 'integer')).toBe(true)
  })

  it('decimal: close enough', () => {
    expect(checkAnswer('3.14', '3.14', 'decimal')).toBe(true)
    expect(checkAnswer('3.1', '3.14', 'decimal')).toBe(false)
    expect(checkAnswer('0.5', '0.5', 'decimal')).toBe(true)
  })

  it('fraction: normalized', () => {
    expect(checkAnswer('1/2', '1/2', 'fraction')).toBe(true)
    expect(checkAnswer('2/4', '1/2', 'fraction')).toBe(true)
    expect(checkAnswer('0.5', '1/2', 'fraction')).toBe(true)
  })

  it('expression: normalized', () => {
    expect(checkAnswer('3x+2', '3x+2', 'expression')).toBe(true)
    expect(checkAnswer('3x + 2', '3x+2', 'expression')).toBe(true)
    expect(checkAnswer('3X+2', '3x+2', 'expression')).toBe(true)
  })

  it('multiple-choice: case insensitive', () => {
    expect(checkAnswer('Yes', 'yes', 'multiple-choice')).toBe(true)
    expect(checkAnswer('NO', 'no', 'multiple-choice')).toBe(true)
  })

  it('inequality: normalized', () => {
    expect(checkAnswer('y>5', 'y>5', 'inequality')).toBe(true)
    expect(checkAnswer('y > 5', 'y>5', 'inequality')).toBe(true)
    expect(checkAnswer('y>=3', 'y>=3', 'inequality')).toBe(true)
  })

  it('acceptableAnswers: checked first', () => {
    expect(checkAnswer('yes', 'y', 'multiple-choice', ['yes', 'true', 'y'])).toBe(true)
    expect(checkAnswer('true', 'y', 'multiple-choice', ['yes', 'true', 'y'])).toBe(true)
  })
})
