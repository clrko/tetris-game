import React from 'react'

/// Components
import Stage from './Stage'
import Display from './Dipslay'
import StartButton from './StartButton'

const Tetris = () => (
  <div>
    <Stage />
    <aside>
      <div>
        <Display text='Score' />
        <Display text='Rows' />
        <Display text='Level' />
      </div>
      <StartButton />
    </aside>
  </div>
)

export default Tetris
