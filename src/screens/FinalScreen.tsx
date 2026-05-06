import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export function FinalScreen() {
  const teams = useGameStore(s => s.teams)
  const restartGame = useGameStore(s => s.restartGame)

  const sorted = [...teams].sort((a, b) => b.score - a.score)
  const winner = sorted[0]
  const isTie = sorted.length > 1 && sorted[0].score === sorted[1].score

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '40px 24px',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ maxWidth: '680px', width: '100%', textAlign: 'center' }}
      >
        {/* Winner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '12px', fontSize: '48px' }}
        >
          {isTie ? '🤝' : '🏆'}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '8px' }}
        >
          {isTie ? "It's a Tie!" : `${winner.name} Wins!`}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '17px', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}
        >
          {isTie
            ? 'Two teams who know what employees actually want to hear.'
            : `${winner.score.toLocaleString()} points — and a better read on what employees actually want to hear.`}
        </motion.p>

        {/* Final scores */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}
        >
          {sorted.map((team, i) => (
            <div key={team.id} style={{
              background: 'var(--surface)',
              border: `2px solid ${i === 0 && !isTie ? team.color : 'var(--border-hover)'}`,
              borderRadius: '14px', padding: '20px 32px',
              position: 'relative', minWidth: '140px',
            }}>
              {i === 0 && !isTie && (
                <div style={{
                  position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                  background: team.color, color: '#000',
                  fontSize: '10px', fontWeight: 800, letterSpacing: '0.08em',
                  textTransform: 'uppercase', borderRadius: '10px', padding: '3px 10px',
                }}>
                  Winner
                </div>
              )}
              <div style={{ fontSize: '12px', fontWeight: 700, color: team.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                {team.name}
              </div>
              <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-primary)' }}>
                {team.score.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>pts</div>
            </div>
          ))}
        </motion.div>

        {/* Key insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            background: 'var(--surface)', border: '1px solid var(--border-hover)',
            borderRadius: '14px', padding: '24px', marginBottom: '32px', textAlign: 'left',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
            The Big Takeaway
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              'Employees rank collaborative, forward-focused responses higher than validation or control.',
              'The most experienced managers are most likely to choose confident — but wrong — responses.',
              'Psychological safety isn\'t about being nice. It\'s about making people feel safe to contribute, fail, and be honest.',
            ].map((insight, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)', marginTop: '8px', flexShrink: 0 }} />
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{insight}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.97 }}
            onClick={restartGame}
            style={{
              background: 'var(--amber)', color: '#000',
              border: 'none', borderRadius: '10px',
              padding: '14px 32px', fontSize: '16px', fontWeight: 800,
            }}
          >
            Play Again →
          </motion.button>
          <a
            href="https://psych-safety-sim.vercel.app"
            target="_blank"
            rel="noreferrer"
            style={{
              background: 'var(--surface)', color: 'var(--text-secondary)',
              border: '1px solid var(--border-hover)', borderRadius: '10px',
              padding: '14px 28px', fontSize: '15px', fontWeight: 600,
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
            }}
          >
            Try the Solo Simulator →
          </a>
        </motion.div>

        <p style={{ marginTop: '24px', fontSize: '12px', color: 'var(--text-muted)' }}>
          Based on research by Amy Edmondson · Google Project Aristotle · Kim Scott
        </p>
      </motion.div>
    </div>
  )
}
