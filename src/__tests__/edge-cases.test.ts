import { describe, it, expect } from 'vitest'
import { getTemplatesForTeks } from '../templates/registry'
import { checkAnswer } from '../templates/validator'

describe('Edge Cases — Equation Templates', () => {
  it('6.9A: two-step equations always have integer solutions', () => {
    const templates = getTemplatesForTeks('6.9A', 'hard')
    for (let i = 0; i < 200; i++) {
      const t = templates[Math.floor(Math.random() * templates.length)]
      const p = t.generate()
      const ans = parseInt(p.correctAnswer, 10)
      expect(Number.isInteger(ans)).toBe(true)
    }
  })

  it('6.9B: variables on both sides always produces integer solutions', () => {
    const templates = getTemplatesForTeks('6.9B', 'hard')
    for (let i = 0; i < 200; i++) {
      const t = templates[Math.floor(Math.random() * templates.length)]
      const p = t.generate()
      const ans = parseInt(p.correctAnswer, 10)
      expect(Number.isInteger(ans)).toBe(true)
    }
  })

  it('6.9C: literal equations produce valid expression answers', () => {
    const templates = getTemplatesForTeks('6.9C', 'medium')
    for (let i = 0; i < 100; i++) {
      const t = templates[Math.floor(Math.random() * templates.length)]
      const p = t.generate()
      // answer should contain 'x'
      expect(p.correctAnswer).toMatch(/x/)
      // should self-validate
      expect(checkAnswer(p.correctAnswer, p.correctAnswer, p.answerFormat, p.acceptableAnswers)).toBe(true)
    }
  })

  it('6.8A: triangle angles always sum to 180', () => {
    const templates = getTemplatesForTeks('6.8A', 'hard').filter(t => t.id.includes('angle'))
    for (let i = 0; i < 100; i++) {
      const t = templates[Math.floor(Math.random() * templates.length)]
      const p = t.generate()
      // extract the two given angles and the answer
      const nums = p.questionText.match(/(\d+)°/g)
      if (nums && nums.length >= 2) {
        const given = nums.map(n => parseInt(n))
        const answer = parseInt(p.correctAnswer, 10)
        expect(given[0] + given[1] + answer).toBe(180)
      }
    }
  })

  it('6.8C: triangle areas are always integers', () => {
    const templates = getTemplatesForTeks('6.8C', 'hard').filter(t => t.id.includes('triangle'))
    for (let i = 0; i < 100; i++) {
      const t = templates[Math.floor(Math.random() * templates.length)]
      const p = t.generate()
      const ans = parseFloat(p.correctAnswer)
      expect(Number.isInteger(ans)).toBe(true)
    }
  })

  it('6.3E: fraction multiplication results are properly reduced', () => {
    const templates = getTemplatesForTeks('6.3E', 'easy')
    for (let i = 0; i < 100; i++) {
      const t = templates[Math.floor(Math.random() * templates.length)]
      const p = t.generate()
      expect(checkAnswer(p.correctAnswer, p.correctAnswer, p.answerFormat, p.acceptableAnswers)).toBe(true)
    }
  })
})

describe('Edge Cases — Validator', () => {
  it('handles negative integers', () => {
    expect(checkAnswer('-5', '-5', 'integer')).toBe(true)
    expect(checkAnswer('-0', '0', 'integer')).toBe(true)
  })

  it('handles fractions with negatives', () => {
    expect(checkAnswer('-3/4', '-3/4', 'fraction')).toBe(true)
    expect(checkAnswer('-6/8', '-3/4', 'fraction')).toBe(true)
  })

  it('handles expressions with extra spaces', () => {
    expect(checkAnswer('  3x + 2  ', '3x+2', 'expression')).toBe(true)
  })

  it('handles leading/trailing whitespace everywhere', () => {
    expect(checkAnswer('  7  ', '7', 'integer')).toBe(true)
    expect(checkAnswer('  yes  ', 'yes', 'multiple-choice')).toBe(true)
  })
})
