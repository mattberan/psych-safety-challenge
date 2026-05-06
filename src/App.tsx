import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore } from './store/gameStore'
import { SetupScreen } from './screens/SetupScreen'
import { RoundIntroScreen } from './screens/RoundIntroScreen'
import { BoardScreen } from './screens/BoardScreen'
import { FinalScreen } from './screens/FinalScreen'

export default function App() {
  const phase = useGameStore(s => s.phase)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phase}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {phase === 'setup' && <SetupScreen />}
        {phase === 'round-intro' && <RoundIntroScreen />}
        {phase === 'board' && <BoardScreen />}
        {phase === 'final' && <FinalScreen />}
      </motion.div>
    </AnimatePresence>
  )
}
