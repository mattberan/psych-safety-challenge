import { create } from 'zustand'
import { type Round } from '../data/rounds'

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
  gameRounds: Round[]
  roundIndex: number
  activeTeamId: string | null
  revealedAnswers: RevealedAnswer[]
  strikes: Record<string, number>
  roundScores: Record<string, number[]>

  setTeams: (teams: Team[]) => void
  startGame: (rounds: Round[]) => void
  setActiveTeam: (teamId: string | null) => void
  revealAnswer: (answerIndex: number) => void
  addStrike: (teamId: string) => void
  nextRound: () => void
  restartGame: () => void
  currentRound: () => Round | undefined
}

const TEAM_COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#EC4899']

export const useGameStore = create<GameState>((set, get) => ({
  phase: 'setup',
  teams: [
    { id: 't1', name: 'Team 1', score: 0, color: TEAM_COLORS[0] },
    { id: 't2', name: 'Team 2', score: 0, color: TEAM_COLORS[1] },
  ],
  gameRounds: [],
  roundIndex: 0,
  activeTeamId: null,
  revealedAnswers: [],
  strikes: {},
  roundScores: {},

  setTeams: (teams) => set({ teams }),

  startGame: (rounds) => set({
    phase: 'round-intro',
    gameRounds: rounds,
    roundIndex: 0,
    revealedAnswers: [],
    strikes: {},
    roundScores: {},
  }),

  setActiveTeam: (teamId) => set({ activeTeamId: teamId }),

  revealAnswer: (answerIndex) => {
    const { activeTeamId, revealedAnswers, teams, roundIndex, roundScores } = get()
    if (!activeTeamId) return
    if (revealedAnswers.some(r => r.index === answerIndex)) return

    const round = get().currentRound()
    if (!round) return
    const points = round.answers[answerIndex].points

    const updatedTeams = teams.map(t =>
      t.id === activeTeamId ? { ...t, score: t.score + points } : t
    )
    const existing = roundScores[activeTeamId] ?? []
    const updatedRoundScores = {
      ...roundScores,
      [activeTeamId]: [...existing.slice(0, roundIndex), (existing[roundIndex] ?? 0) + points],
    }

    set({
      revealedAnswers: [...revealedAnswers, { index: answerIndex, teamId: activeTeamId }],
      teams: updatedTeams,
      roundScores: updatedRoundScores,
    })
  },

  addStrike: (teamId) => {
    const { strikes } = get()
    set({ strikes: { ...strikes, [teamId]: (strikes[teamId] ?? 0) + 1 } })
  },

  nextRound: () => {
    const { roundIndex, gameRounds } = get()
    const next = roundIndex + 1
    if (next >= gameRounds.length) {
      set({ phase: 'final' })
    } else {
      set({ phase: 'round-intro', roundIndex: next, revealedAnswers: [], activeTeamId: null, strikes: {} })
    }
  },

  restartGame: () =>
    set({
      phase: 'setup',
      gameRounds: [],
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

  currentRound: () => get().gameRounds[get().roundIndex],
}))
