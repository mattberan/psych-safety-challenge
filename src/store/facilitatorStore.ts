import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { rounds as defaultRounds, type Round } from '../data/rounds'

const DEFAULT_ACTIVE_IDS = defaultRounds.map(r => r.id)

interface FacilitatorState {
  customRounds: Round[]
  activeRoundIds: string[]

  addCustomRound: (round: Omit<Round, 'id'>) => void
  updateCustomRound: (id: string, updates: Partial<Omit<Round, 'id'>>) => void
  deleteCustomRound: (id: string) => void
  duplicateRound: (id: string) => Round | null
  toggleRoundActive: (id: string) => void
  resetToDefaults: () => void

  getAllRounds: () => Round[]
  getActiveRounds: () => Round[]
}

export const useFacilitatorStore = create<FacilitatorState>()(
  persist(
    (set, get) => ({
      customRounds: [],
      activeRoundIds: [...DEFAULT_ACTIVE_IDS],

      getAllRounds: () => {
        return [...defaultRounds, ...get().customRounds]
      },

      getActiveRounds: () => {
        const all = get().getAllRounds()
        return get().activeRoundIds
          .map(id => all.find(r => r.id === id))
          .filter((r): r is Round => r !== undefined)
      },

      addCustomRound: (round) => {
        const id = `custom-${Date.now()}`
        const newRound: Round = { ...round, id }
        set(s => ({
          customRounds: [...s.customRounds, newRound],
          activeRoundIds: [...s.activeRoundIds, id],
        }))
      },

      updateCustomRound: (id, updates) => {
        set(s => ({
          customRounds: s.customRounds.map(r => r.id === id ? { ...r, ...updates } : r),
        }))
      },

      deleteCustomRound: (id) => {
        set(s => ({
          customRounds: s.customRounds.filter(r => r.id !== id),
          activeRoundIds: s.activeRoundIds.filter(rid => rid !== id),
        }))
      },

      duplicateRound: (id) => {
        const all = get().getAllRounds()
        const source = all.find(r => r.id === id)
        if (!source) return null
        const newId = `custom-${Date.now()}`
        const copy: Round = {
          ...source,
          id: newId,
          category: `${source.category} (copy)`,
        }
        set(s => ({
          customRounds: [...s.customRounds, copy],
          activeRoundIds: [...s.activeRoundIds, newId],
        }))
        return copy
      },

      toggleRoundActive: (id) => {
        set(s => {
          const active = s.activeRoundIds.includes(id)
          return {
            activeRoundIds: active
              ? s.activeRoundIds.filter(rid => rid !== id)
              : [...s.activeRoundIds, id],
          }
        })
      },

      resetToDefaults: () => {
        set({ customRounds: [], activeRoundIds: [...DEFAULT_ACTIVE_IDS] })
      },
    }),
    { name: 'psych-safety-facilitator' }
  )
)
