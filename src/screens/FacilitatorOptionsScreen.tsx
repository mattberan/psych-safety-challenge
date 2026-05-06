import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFacilitatorStore } from '../store/facilitatorStore'
import { rounds as defaultRounds, type Round } from '../data/rounds'
import { ScenarioEditorModal } from './ScenarioEditorModal'
import { generateGuide } from '../utils/generateGuide'

interface Props {
  onBack: () => void
  onStartGame: () => void
}

export function FacilitatorOptionsScreen({ onBack, onStartGame }: Props) {
  const {
    activeRoundIds,
    getAllRounds, getActiveRounds,
    addCustomRound, updateCustomRound, deleteCustomRound,
    duplicateRound, toggleRoundActive, resetToDefaults,
  } = useFacilitatorStore()

  const [editingRound, setEditingRound] = useState<Round | null>(null)
  const [showNewEditor, setShowNewEditor] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const allRounds = getAllRounds()
  const activeCount = activeRoundIds.length
  const defaultIds = defaultRounds.map(r => r.id)
  const isDefault = (id: string) => defaultIds.includes(id)

  const handleDuplicate = (id: string) => {
    duplicateRound(id)
  }

  const handleSaveNew = (round: Omit<Round, 'id'>) => {
    addCustomRound(round)
    setShowNewEditor(false)
  }

  const handleSaveEdit = (round: Omit<Round, 'id'>) => {
    if (editingRound) {
      updateCustomRound(editingRound.id, round)
      setEditingRound(null)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '24px', maxWidth: '760px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <button
          onClick={onBack}
          style={{
            background: 'var(--surface)', border: '1px solid var(--border-hover)',
            borderRadius: '8px', padding: '8px 16px',
            fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)',
          }}
        >
          ← Back
        </button>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Facilitator Options
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {activeCount} round{activeCount !== 1 ? 's' : ''} active · Toggle, duplicate to edit, or add your own
          </p>
        </div>
      </div>

      {/* Round list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {allRounds.map((round) => {
          const active = activeRoundIds.includes(round.id)
          const custom = !isDefault(round.id)

          return (
            <motion.div
              key={round.id}
              layout
              style={{
                background: active ? 'var(--surface)' : 'var(--bg)',
                border: `1px solid ${active ? 'var(--border-hover)' : 'var(--border)'}`,
                borderRadius: '12px', padding: '14px 16px',
                opacity: active ? 1 : 0.5,
                transition: 'opacity 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Toggle */}
                <button
                  onClick={() => toggleRoundActive(round.id)}
                  style={{
                    width: '36px', height: '20px', borderRadius: '10px', flexShrink: 0,
                    background: active ? 'var(--amber)' : 'var(--surface2)',
                    border: 'none', position: 'relative', cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: '3px',
                    left: active ? '19px' : '3px',
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: '#fff',
                    transition: 'left 0.15s',
                  }} />
                </button>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {round.category}
                    </span>
                    {custom && (
                      <span style={{
                        fontSize: '10px', fontWeight: 700, color: 'var(--amber)',
                        background: 'rgba(245,158,11,0.12)', borderRadius: '4px',
                        padding: '2px 6px', textTransform: 'uppercase', letterSpacing: '0.06em',
                      }}>Custom</span>
                    )}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {round.scenario}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  {custom ? (
                    <>
                      <button
                        onClick={() => setEditingRound(round)}
                        style={{
                          background: 'var(--surface2)', border: '1px solid var(--border-hover)',
                          borderRadius: '6px', padding: '5px 12px',
                          fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)',
                        }}
                      >Edit</button>
                      <button
                        onClick={() => deleteCustomRound(round.id)}
                        style={{
                          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                          borderRadius: '6px', padding: '5px 10px',
                          fontSize: '12px', fontWeight: 600, color: 'var(--red)',
                        }}
                      >Delete</button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleDuplicate(round.id)}
                      style={{
                        background: 'var(--surface2)', border: '1px solid var(--border-hover)',
                        borderRadius: '6px', padding: '5px 12px',
                        fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)',
                      }}
                    >Duplicate to Edit</button>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Add custom scenario */}
      <motion.button
        whileHover={{ borderColor: 'rgba(245,158,11,0.4)', color: 'var(--amber)' }}
        onClick={() => setShowNewEditor(true)}
        style={{
          marginTop: '12px',
          background: 'none', border: '1px dashed var(--border-hover)',
          borderRadius: '12px', padding: '14px',
          width: '100%', fontSize: '14px', fontWeight: 600,
          color: 'var(--text-muted)', transition: 'all 0.15s',
        }}
      >
        + Add Custom Scenario
      </motion.button>

      {/* Bottom actions */}
      <div style={{ marginTop: '24px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => setShowResetConfirm(true)}
          style={{
            background: 'none', border: '1px solid var(--border-hover)',
            borderRadius: '8px', padding: '10px 16px',
            fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)',
          }}
        >
          Reset to Defaults
        </button>

        <motion.button
          whileHover={{ filter: 'brightness(1.1)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => generateGuide(getActiveRounds())}
          style={{
            background: 'var(--surface2)', border: '1px solid var(--border-hover)',
            borderRadius: '8px', padding: '10px 20px',
            fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)',
          }}
        >
          Download Facilitator Guide ↗
        </motion.button>

        <div style={{ flex: 1 }} />

        <motion.button
          whileHover={activeCount > 0 ? { filter: 'brightness(1.1)' } : {}}
          whileTap={activeCount > 0 ? { scale: 0.97 } : {}}
          onClick={activeCount > 0 ? onStartGame : undefined}
          disabled={activeCount === 0}
          style={{
            background: activeCount > 0 ? 'var(--amber)' : 'var(--surface2)',
            color: activeCount > 0 ? '#000' : 'var(--text-muted)',
            border: 'none', borderRadius: '10px',
            padding: '13px 28px', fontSize: '15px', fontWeight: 900,
          }}
        >
          Start Game ({activeCount} rounds) →
        </motion.button>
      </div>

      {/* Reset confirm */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResetConfirm(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(4px)', zIndex: 100,
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--surface)', border: '1px solid var(--border-hover)',
                borderRadius: '14px', padding: '28px', maxWidth: '380px', width: '100%',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>Reset to defaults?</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                This will delete all custom scenarios and restore the original 8 rounds. This can't be undone.
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setShowResetConfirm(false)} style={{
                  flex: 1, background: 'var(--surface2)', border: '1px solid var(--border-hover)',
                  borderRadius: '8px', padding: '11px', fontSize: '14px', fontWeight: 600,
                  color: 'var(--text-secondary)',
                }}>Cancel</button>
                <button onClick={() => { resetToDefaults(); setShowResetConfirm(false) }} style={{
                  flex: 1, background: 'var(--red)', border: 'none',
                  borderRadius: '8px', padding: '11px', fontSize: '14px', fontWeight: 800, color: '#fff',
                }}>Reset</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editors */}
      <AnimatePresence>
        {showNewEditor && (
          <ScenarioEditorModal
            onSave={handleSaveNew}
            onClose={() => setShowNewEditor(false)}
          />
        )}
        {editingRound && (
          <ScenarioEditorModal
            initial={editingRound}
            onSave={handleSaveEdit}
            onClose={() => setEditingRound(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
