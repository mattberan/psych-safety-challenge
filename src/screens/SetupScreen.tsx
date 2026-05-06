import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore, type Team } from '../store/gameStore'

const COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#EC4899']

export function SetupScreen() {
  const { teams, setTeams, startGame } = useGameStore()
  const [names, setNames] = useState(teams.map(t => t.name))

  const updateName = (i: number, val: string) => {
    const n = [...names]
    n[i] = val
    setNames(n)
  }

  const addTeam = () => {
    if (names.length >= 4) return
    setNames([...names, `Team ${names.length + 1}`])
  }

  const removeTeam = (i: number) => {
    if (names.length <= 2) return
    setNames(names.filter((_, idx) => idx !== i))
  }

  const handleStart = () => {
    const updatedTeams: Team[] = names.map((name, i) => ({
      id: `t${i + 1}`,
      name: name.trim() || `Team ${i + 1}`,
      score: 0,
      color: COLORS[i],
    }))
    setTeams(updatedTeams)
    startGame()
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '520px', width: '100%' }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
            borderRadius: '20px', padding: '6px 16px', marginBottom: '20px',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Meeting Room Game
            </span>
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '12px' }}>
            Psych Safety<br />
            <span style={{ color: 'var(--amber)' }}>Challenge</span>
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            8 rounds. Real scenarios. Compete to find what employees actually want to hear.
          </p>
        </div>

        {/* Team setup */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border-hover)',
          borderRadius: '16px', padding: '28px', marginBottom: '20px',
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>
            Teams
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {names.map((name, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <div style={{
                  width: '12px', height: '12px', borderRadius: '50%',
                  background: COLORS[i], flexShrink: 0,
                }} />
                <input
                  value={name}
                  onChange={e => updateName(i, e.target.value)}
                  placeholder={`Team ${i + 1}`}
                  style={{
                    flex: 1, background: 'var(--surface2)',
                    border: '1px solid var(--border-hover)',
                    borderRadius: '8px', padding: '10px 14px',
                    fontSize: '15px', color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                />
                {names.length > 2 && (
                  <button
                    onClick={() => removeTeam(i)}
                    style={{
                      background: 'none', border: 'none',
                      color: 'var(--text-muted)', fontSize: '18px',
                      lineHeight: 1, padding: '4px',
                    }}
                  >×</button>
                )}
              </motion.div>
            ))}
          </div>

          {names.length < 4 && (
            <button
              onClick={addTeam}
              style={{
                marginTop: '16px', background: 'none',
                border: '1px dashed var(--border-hover)',
                borderRadius: '8px', padding: '10px',
                width: '100%', fontSize: '14px',
                color: 'var(--text-muted)',
              }}
            >
              + Add team
            </button>
          )}
        </div>

        <motion.button
          whileHover={{ filter: 'brightness(1.1)' }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStart}
          style={{
            width: '100%', background: 'var(--amber)', color: '#000',
            border: 'none', borderRadius: '12px',
            padding: '16px', fontSize: '17px', fontWeight: 900,
          }}
        >
          Start Game →
        </motion.button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '16px' }}>
          Facilitator controls everything from this screen — no phones needed
        </p>
      </motion.div>
    </div>
  )
}
