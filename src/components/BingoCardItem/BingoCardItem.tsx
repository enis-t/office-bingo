import { useContext } from 'react'
import classNames from 'classnames'

import GameContext from '@/common/GameContext/GameContext'

import winningSequencesPattern from '@/utils/winningSequences'

import { checkableBingoItem } from '@/types/bingoItem'
import { winningSequenceType } from '@/types/winningSequence'

type props = {
  item: checkableBingoItem,
  index: number
}

const BingoCardItem = ( { item: { checked, id, phrase }, index } : props ) => {
  const isJolly = 'empty' === id
  const { toggle, winningSequences } = useContext( GameContext )
  const _toggle = () => {
    toggle( id, checked )
  }

  const computedClassNames = Object.entries( winningSequencesPattern ).reduce( ( final, [ key, value ] ) => ( {
    ...final,
    [key]: value.includes( index ),
  } ), {} )
  const winning = Object.entries( computedClassNames )
    .filter( ( [ _, value ] ) => value )
    .reduce( ( isWinning, [ key ] ) => isWinning || winningSequences.includes( key as keyof winningSequenceType ),
      false,
    )

  return (
    <div
      onClick={ _toggle } className={ classNames( {
        bingoCardItem: true,
        checked,
        isJolly,
        winning,
        ...computedClassNames,

      } ) }>
      {phrase}
    </div>
  )
}

export default BingoCardItem