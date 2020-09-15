import React, { useState } from 'react'

import { createStage } from '../gameHelpers'

// Styled components
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris'

// Custom hooks
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'

// Components
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const [player, updatePlayerPos, resetPlayer] = usePlayer()
  const [stage, setStage] = useStage(player, resetPlayer)

  console.log('re-render')

  // dir --> direction to move the tetromino. This function takes care of the left and right position
  const movePlayer = dir => {
    updatePlayerPos({ x: dir, y: 0 })
  }

  const startGame = () => {
    // Reset everything (stage and the player). Function called when we click on the start button.
    setStage(createStage())
    resetPlayer()
  }

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false })
  }

  const dropPlayer = () => {
    drop()
  }

  const move = ({ keyCode }) => {
    if (!gameOver) {
      // keyCode 37 referes to the left arrow and -1 goes on the x axis
      if (keyCode === 37) {
        movePlayer(-1)
      // keyCode 39 referes to the right arrow and 1 goes one step ahead on the x axis
      } else if (keyCode === 39) {
        movePlayer(1)
      // keyCode 40 referes to down arrow
      } else if (keyCode === 40) {
        dropPlayer()
      }
    }
  }

  return (
    <StyledTetrisWrapper role='button' tabIndex='0' onKeyDown={e => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text='Game Over' />
          ) : (
            <div>
              <Display text='Score' />
              <Display text='Rows' />
              <Display text='Level' />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris
