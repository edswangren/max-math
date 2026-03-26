import type { Difficulty } from '../templates/types'

export interface Mistake {
  templateId: string
  userAnswer: string
  correctAnswer: string
}

export interface Session {
  id: string
  date: string
  teksCode: string
  difficulty: Difficulty
  totalProblems: number
  correct: number
  mistakes: Mistake[]
}

interface SessionStore {
  version: 1
  sessions: Session[]
}

const STORAGE_KEY = 'teks-sessions'

function load(): SessionStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { version: 1, sessions: [] }
}

function save(store: SessionStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function saveSession(session: Omit<Session, 'id' | 'date'>): Session {
  const store = load()
  const full: Session = {
    ...session,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  }
  store.sessions.push(full)
  save(store)
  return full
}

export function getSessions(): Session[] {
  return load().sessions
}

export function getRecentSessions(count: number): Session[] {
  const all = load().sessions
  return all.slice(-count).reverse()
}

export function getSessionsForTeks(teksCode: string): Session[] {
  return load().sessions.filter((s) => s.teksCode === teksCode)
}
