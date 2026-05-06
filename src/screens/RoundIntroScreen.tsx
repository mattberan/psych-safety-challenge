import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { rounds } from '../data/rounds'

export function RoundIntroScreen() {
  const roundIndex = useGameStore(s => s.roundIndex)
  const teams = useGameStore(s => s.teams)
  const round = rounds[roundIndex]

  const goToBoard = () => useGameStore.setState({ phase: 'board' })

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '40px 24px',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ maxWidth: '720px', width: '100%', textAlign: 'center' }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
            borderRadius: '20px', padding: '6px 16px', marginBottom: '24px',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Round {roundIndex + 1} of {rounds.length}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '16px' }}
        >
          {round.category}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '20px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}
        >
          {round.scenario}
        </motion.p>

        {/* Scoreboard strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}
        >
          {teams.map(team => (
            <div key={team.id} style={{
              background: 'var(--surface)', border: `1px solid ${team.color}44`,
              borderRadius: '12px', padding: '16px 28px', minWidth: '140px',
            }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: team.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                {team.name}
              </div>
              <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)' }}>
                {team.score.toLocaleString()}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ filter: 'brightness(1.1)' }}
          whileTap={{ scale: 0.98 }}
          onClick={goToBoard}
          style={{
            background: 'var(--amber)', color: '#000',
            border: 'none', borderRadius: '12px',
            padding: '16px 40px', fontSize: '17px', fontWeight: 900,
          }}
        >
          Show the Board →
        </motion.button>
      </motion.div>
    </div>
  )
}
