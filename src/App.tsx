import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore, type Team } from './store/gameStore'
import { useFacilitatorStore } from './store/facilitatorStore'
import { SetupScreen } from './screens/SetupScreen'
import { RoundIntroScreen } from './screens/RoundIntroScreen'
import { BoardScreen } from './screens/BoardScreen'
import { FinalScreen } from './screens/FinalScreen'
import { FacilitatorOptionsScreen } from './screens/FacilitatorOptionsScreen'

export default function App() {
  const phase = useGameStore(s => s.phase)
  const setTeams = useGameStore(s => s.setTeams)
  const startGame = useGameStore(s => s.startGame)
  const getActiveRounds = useFacilitatorStore(s => s.getActiveRounds)

  const [showFacilitator, setShowFacilitator] = useState(false)

  const handleStartGame = (teams: Team[]) => {
    setTeams(teams)
    startGame(getActiveRounds())
  }

  const handleStartFromFacilitator = () => {
    startGame(getActiveRounds())
    setShowFacilitator(false)
  }

  if (showFacilitator) {
    return (
      <FacilitatorOptionsScreen
        onBack={() => setShowFacilitator(false)}
        onStartGame={handleStartFromFacilitator}
      />
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phase}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {phase === 'setup' && (
          <SetupScreen
            onStartGame={handleStartGame}
            onFacilitatorOptions={() => setShowFacilitator(true)}
          />
        )}
        {phase === 'round-intro' && <RoundIntroScreen />}
        {phase === 'board' && <BoardScreen />}
        {phase === 'final' && <FinalScreen />}
      </motion.div>
    </AnimatePresence>
  )
}
