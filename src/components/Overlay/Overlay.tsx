import { useContext, Dispatch, SetStateAction } from 'react'

import GameContext from '@/common/GameContext/GameContext'
import classNames from 'classnames'

type props = {
  setTopic : Dispatch<SetStateAction<string | null>>
}

const Overlay = ( { setTopic }: props ) => {
  const { bingo, reset, continuePlaying } = useContext( GameContext )

  const restart = () => {
    reset()
    setTopic( null )
  }

  return (
    <div className={ classNames( {
      bingo,
      overlay: true,
    } ) }>
      <div>
        <h1>Bingo!</h1>
        <button onClick={ restart }>Play again?</button>
        <button onClick={ continuePlaying }>Continue playing</button>
      </div>
    </div>
  )
}

export default Overlay