import { create } from 'zustand'
import { rounds, type Round } from '../data/rounds'

export type GamePhase =
  | 'setup'
  | 'round-intro'
  | 'board'
  | 'scoreboard'
  | 'final'

export interface Team {
  id: string
  name: string
  score: number
  color: string
}

export interface RevealedAnswer {
  index: number
  teamId: string
}

interface GameState {
  phase: GamePhase
  teams: Team[]
  roundIndex: number
  activeTeamId: string | null
  revealedAnswers: RevealedAnswer[]
  strikes: Record<string, number> // teamId -> strike count
  roundScores: Record<string, number[]> // teamId -> score per round

  // Setup actions
  setTeams: (teams: Team[]) => void
  startGame: () => void

  // Board actions
  setActiveTeam: (teamId: string | null) => void
  revealAnswer: (answerIndex: number) => void
  addStrike: (teamId: string) => void

  // Navigation
  nextRound: () => void
  restartGame: () => void

  currentRound: () => Round
}

const TEAM_COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#EC4899']

export const useGameStore = create<GameState>((set, get) => ({
  phase: 'setup',
  teams: [
    { id: 't1', name: 'Team 1', score: 0, color: TEAM_COLORS[0] },
    { id: 't2', name: 'Team 2', score: 0, color: TEAM_COLORS[1] },
  ],
  roundIndex: 0,
  activeTeamId: null,
  revealedAnswers: [],
  strikes: {},
  roundScores: {},

  setTeams: (teams) => set({ teams }),

  startGame: () => set({ phase: 'round-intro', roundIndex: 0, revealedAnswers: [], strikes: {}, roundScores: {} }),

  setActiveTeam: (teamId) => set({ activeTeamId: teamId }),

  revealAnswer: (answerIndex) => {
    const { activeTeamId, revealedAnswers, teams, roundIndex, roundScores } = get()
    if (!activeTeamId) return
    if (revealedAnswers.some(r => r.index === answerIndex)) return

    const round = get().currentRound()
    const answer = round.answers[answerIndex]
    const points = answer.points

    const newRevealed = [...revealedAnswers, { index: answerIndex, teamId: activeTeamId }]

    const updatedTeams = teams.map(t =>
      t.id === activeTeamId ? { ...t, score: t.score + points } : t
    )

    const existing = roundScores[activeTeamId] ?? []
    const updatedRoundScores = {
      ...roundScores,
      [activeTeamId]: [...existing.slice(0, roundIndex), (existing[roundIndex] ?? 0) + points],
    }

    set({ revealedAnswers: newRevealed, teams: updatedTeams, roundScores: updatedRoundScores })
  },

  addStrike: (teamId) => {
    const { strikes } = get()
    set({ strikes: { ...strikes, [teamId]: (strikes[teamId] ?? 0) + 1 } })
  },

  nextRound: () => {
    const { roundIndex } = get()
    const next = roundIndex + 1
    if (next >= rounds.length) {
      set({ phase: 'final' })
    } else {
      set({ phase: 'round-intro', roundIndex: next, revealedAnswers: [], activeTeamId: null, strikes: {} })
    }
  },

  restartGame: () =>
    set({
      phase: 'setup',
      roundIndex: 0,
      activeTeamId: null,
      revealedAnswers: [],
      strikes: {},
      roundScores: {},
      teams: [
        { id: 't1', name: 'Team 1', score: 0, color: TEAM_COLORS[0] },
        { id: 't2', name: 'Team 2', score: 0, color: TEAM_COLORS[1] },
      ],
    }),

  currentRound: () => rounds[get().roundIndex],
}))
