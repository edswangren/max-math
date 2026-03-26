export function randInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1))
}

export function randIntExcluding(min: number, max: number, exclude: number[]): number {
  let n: number
  do {
    n = randInt(min, max)
  } while (exclude.includes(n))
  return n
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    [a, b] = [b, a % b]
  }
  return a
}

export function formatCoefficient(n: number, isFirst: boolean): string {
  if (isFirst) {
    if (n === 1) return ''
    if (n === -1) return '-'
    return String(n)
  }
  if (n === 1) return '+ '
  if (n === -1) return '- '
  if (n > 0) return `+ ${n}`
  return `- ${Math.abs(n)}`
}

export function formatConstant(n: number, isFirst: boolean): string {
  if (isFirst) return String(n)
  if (n > 0) return `+ ${n}`
  if (n < 0) return `- ${Math.abs(n)}`
  return ''
}

export function formatTerm(coeff: number, variable: string, isFirst: boolean): string {
  if (coeff === 0) return ''
  const c = formatCoefficient(coeff, isFirst)
  return `${c}${variable}`
}
