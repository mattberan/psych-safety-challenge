import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

const POINT_COLORS: Record<number, string> = {
  500: '#F59E0B',
  400: '#F59E0B',
  300: '#3B82F6',
  200: '#6B7280',
  100: '#4B5563',
}

export function BoardScreen() {
  const roundIndex = useGameStore(s => s.roundIndex)
  const teams = useGameStore(s => s.teams)
  const activeTeamId = useGameStore(s => s.activeTeamId)
  const revealedAnswers = useGameStore(s => s.revealedAnswers)
  const strikes = useGameStore(s => s.strikes)
  const { setActiveTeam, revealAnswer, addStrike, nextRound } = useGameStore()
  const round = useGameStore(s => s.currentRound())
  if (!round) return null

  const [showJudgePanel, setShowJudgePanel] = useState(false)
  const [showFacilitatorNote, setShowFacilitatorNote] = useState(false)

  const isRevealed = (i: number) => revealedAnswers.some(r => r.index === i)
  const revealedCount = revealedAnswers.length
  const allRevealed = revealedCount === round.answers.length
  const activeTeam = teams.find(t => t.id === activeTeamId)

  const handleAward = (i: number) => {
    if (isRevealed(i)) return
    revealAnswer(i)
    setShowJudgePanel(false)
  }

  const handleStrike = () => {
    if (activeTeamId) addStrike(activeTeamId)
    setShowJudgePanel(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '24px' }}>

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Round {roundIndex + 1} · {round.category}
        </div>

        {/* Team score buttons — click to set active team */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {teams.map(team => (
            <motion.button
              key={team.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTeam(activeTeamId === team.id ? null : team.id)}
              style={{
                background: activeTeamId === team.id ? `${team.color}22` : 'var(--surface)',
                border: `2px solid ${activeTeamId === team.id ? team.color : 'var(--border-hover)'}`,
                borderRadius: '10px', padding: '8px 18px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 700, color: team.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {team.name}
              </span>
              <span style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                {team.score.toLocaleString()}
              </span>
              {strikes[team.id] ? (
                <span style={{ fontSize: '13px', color: 'var(--red)', letterSpacing: '0.1em' }}>
                  {'✕'.repeat(strikes[team.id])}
                </span>
              ) : null}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Scenario */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border-hover)',
        borderRadius: '12px', padding: '20px 24px', marginBottom: '20px',
      }}>
        <p style={{ fontSize: '17px', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '8px' }}>
          {round.scenario}
        </p>
        <p style={{ fontSize: '13px', color: 'var(--amber)', fontWeight: 600 }}>
          {round.context}
        </p>
      </div>

      {/* Answer board — covered tiles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {round.answers.map((answer, i) => {
          const revealed = isRevealed(i)
          const revealedBy = revealedAnswers.find(r => r.index === i)
          const revealedTeam = teams.find(t => t.id === revealedBy?.teamId)

          return (
            <motion.div
              key={i}
              layout
              style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                background: revealed
                  ? `linear-gradient(135deg, ${POINT_COLORS[answer.points]}18, ${POINT_COLORS[answer.points]}08)`
                  : 'var(--surface)',
                border: `1px solid ${revealed ? POINT_COLORS[answer.points] + '55' : 'var(--border-hover)'}`,
                borderRadius: '12px', padding: '16px 20px',
              }}
            >
              {/* Rank circle */}
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                background: revealed ? POINT_COLORS[answer.points] : 'var(--surface2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '15px', fontWeight: 900,
                color: revealed ? '#000' : 'var(--text-muted)',
              }}>
                {revealed ? i + 1 : '?'}
              </div>

              {/* Content */}
              <div style={{ flex: 1, textAlign: 'left' }}>
                {revealed ? (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    <div style={{ fontSize: '16px', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '2px' }}>
                      {answer.text}
                    </div>
                    {revealedTeam && (
                      <div style={{ fontSize: '12px', color: revealedTeam.color, fontWeight: 600 }}>
                        {revealedTeam.name}
                      </div>
                    )}
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
                      {answer.insight}
                    </div>
                  </motion.div>
                ) : (
                  <div style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
                    Covered
                  </div>
                )}
              </div>

              {/* Points */}
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ fontSize: '24px', fontWeight: 900, color: POINT_COLORS[answer.points], flexShrink: 0 }}
                >
                  +{answer.points}
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Controls */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <motion.button
          whileHover={{ filter: 'brightness(1.1)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowJudgePanel(true)}
          disabled={!activeTeamId}
          style={{
            background: activeTeamId ? 'rgba(245,158,11,0.15)' : 'var(--surface2)',
            border: `1px solid ${activeTeamId ? 'rgba(245,158,11,0.4)' : 'var(--border-hover)'}`,
            borderRadius: '8px', padding: '10px 20px',
            fontSize: '14px', fontWeight: 700,
            color: activeTeamId ? 'var(--amber)' : 'var(--text-muted)',
          }}
        >
          Judge Answer {activeTeam ? `— ${activeTeam.name}` : '(select a team first)'}
        </motion.button>

        <button
          onClick={() => setShowFacilitatorNote(!showFacilitatorNote)}
          style={{
            background: 'var(--surface2)', border: '1px solid var(--border-hover)',
            borderRadius: '8px', padding: '10px 20px',
            fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)',
          }}
        >
          Facilitator Note
        </button>

        <div style={{ flex: 1 }} />

        <motion.button
          whileHover={{ filter: 'brightness(1.1)' }}
          whileTap={{ scale: 0.97 }}
          onClick={nextRound}
          style={{
            background: allRevealed ? 'var(--amber)' : 'var(--surface2)',
            color: allRevealed ? '#000' : 'var(--text-muted)',
            border: 'none', borderRadius: '10px',
            padding: '12px 28px', fontSize: '15px', fontWeight: 800,
          }}
        >
          {allRevealed ? 'Next Round →' : `Next Round (${revealedCount}/${round.answers.length} revealed)`}
        </motion.button>
      </div>

      {/* Facilitator note */}
      <AnimatePresence>
        {showFacilitatorNote && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              marginTop: '16px',
              background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)',
              borderRadius: '10px', padding: '16px 20px',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Facilitator Note
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {round.facilitatorNote}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Judge Panel — host-only overlay */}
      <AnimatePresence>
        {showJudgePanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowJudgePanel(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(6px)',
              zIndex: 100, display: 'flex',
              alignItems: 'flex-end', justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--surface)', border: '1px solid var(--border-hover)',
                borderRadius: '16px', padding: '28px',
                width: '100%', maxWidth: '680px',
                maxHeight: '80vh', overflowY: 'auto',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                    Judge Panel · Host Only
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Judging for: <span style={{ color: activeTeam?.color }}>{activeTeam?.name}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowJudgePanel(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '22px', lineHeight: 1 }}
                >×</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {round.answers.map((answer, i) => {
                  const alreadyRevealed = isRevealed(i)
                  return (
                    <div
                      key={i}
                      style={{
                        background: alreadyRevealed ? 'var(--surface2)' : 'var(--bg)',
                        border: `1px solid ${alreadyRevealed ? 'var(--border)' : 'var(--border-hover)'}`,
                        borderRadius: '10px', padding: '14px 16px',
                        opacity: alreadyRevealed ? 0.5 : 1,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{
                          width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                          background: POINT_COLORS[answer.points],
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '12px', fontWeight: 900, color: '#000',
                        }}>
                          {i + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                            {answer.text}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                            {answer.insight}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontSize: '18px', fontWeight: 900, color: POINT_COLORS[answer.points], marginBottom: '6px' }}>
                            {answer.points}pts
                          </div>
                          {!alreadyRevealed && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAward(i)}
                              style={{
                                background: POINT_COLORS[answer.points],
                                color: '#000', border: 'none',
                                borderRadius: '6px', padding: '6px 14px',
                                fontSize: '12px', fontWeight: 800,
                              }}
                            >
                              Award →
                            </motion.button>
                          )}
                          {alreadyRevealed && (
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Already revealed</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Strike / no match */}
              <button
                onClick={handleStrike}
                style={{
                  width: '100%',
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: '8px', padding: '12px',
                  fontSize: '14px', fontWeight: 700, color: 'var(--red)',
                }}
              >
                ✕ No match — Strike {activeTeam?.name}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
