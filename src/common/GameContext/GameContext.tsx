import { ReactNode, JSX, createContext, useState, useCallback, useEffect } from 'react'

import useApiAbstractionLayer from '@/common/useApiAbstractionLayer/useApiAbstractionLayer'

import shuffle from './shuffle'
import winningSequencesPattern from '@/utils/winningSequences'

import { bingoItem, checkableBingoItem } from '@/types/bingoItem'
import { winningSequenceKey, winningSequenceType } from '@/types/winningSequence'

type props = {
  children: ReactNode
}

type context = {
  bingo: boolean,
  cards: checkableBingoItem[]
  continuePlaying: () => void
  deal: ( items: bingoItem[] ) => void
  reset: () => void
  toggle: ( id: string ) => void
  winningSequences: winningSequenceKey []
}

const GameContext = createContext<context>( {} as unknown as context )


export const GameContextProvider = ( { children }: props ): JSX.Element => {
  const [ bingo, setBingo ] = useState<boolean>( false )
  const [ cards, setCards ] = useState<checkableBingoItem[]>( [] )
  const [ winningSequences, setWinningSequences ] = useState<winningSequenceKey[]>( [] )

  const reset = () => {
    setBingo( false )
    setWinningSequences( [] )
  }

  const continuePlaying = () => {
    setBingo( false )
  }

  const deal = useCallback( ( items: bingoItem[] ) => {
    setCards( shuffle( items ).map( ( item ) => ( {
      ...item,
      checked: 'empty' === item.id,
    } ) ) )
  }, [] )

  const { run } = useApiAbstractionLayer( 'topics', 'post' )
  const { run: runDelete } = useApiAbstractionLayer( 'topics', 'del' )

  const toggle = ( id: string ) => {
    if( 'empty' === id ){
      // is jolly item
      return
    }

    const cardIndex = cards.findIndex( ( { id: arrayId } ) => arrayId === id )
    const wasChecked = cards[cardIndex].checked

    // if the card was checked, we remove the sequences including it from the winning sequences
    setWinningSequences( ( old ) => old
      .filter( ( sequence ) => !wasChecked || !winningSequencesPattern[sequence].includes( cardIndex ) ) )

    setCards( ( old ) => old.map( ( item ) => item.id === id ? {
      ...item,
      checked: !item.checked,
    } : item ) )

    const runFunction = wasChecked ? runDelete : run

    runFunction( {
      id,
      praseId: id,
    } )
  }

  useEffect( () => {
    if( 0 === cards.length ){
      // we don't have the items
      return
    }

    const checkedCards = cards.map( ( { checked } ) => checked )

    // hellper function that checks if the partial card sequence matches a winning sequence
    const checkWinningSequence = ( sequence: Array<number> ) => checkedCards
      .filter( ( _, i ) => sequence.includes( i ) )
      .every( ( item ) => item )

    // checks every possible winning sequences against current
    // checked cards and keeps track of active winning sequences
    // TODO: make it dynamically adapt to different board sizes
    const winningCombinations: Partial<winningSequenceType> = Object
      .entries( winningSequencesPattern )
      .filter( ( [ key ] ) => !winningSequences.includes( key as unknown as winningSequenceKey ) )
      .reduce( ( final, [ key, value ] ) => ( {
        ...final,
        [key]: checkWinningSequence( value ),
      } ), {} )

    // A winning sequence is all checked
    if( Object.values( winningCombinations ).includes( true ) ){
      setBingo( true )
      Object.entries( winningCombinations ).forEach( ( [ key, value ] ) => {
        if( value && !winningSequences.includes( key as unknown as winningSequenceKey ) ){
          setWinningSequences( ( old ) => [
            ...old,
            key as unknown as winningSequenceKey,
          ] )
        }
      } )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ cards ] )

  return (
    <GameContext.Provider value={ {
      bingo,
      cards,
      continuePlaying,
      deal,
      reset,
      toggle,
      winningSequences,
    } }>
      {children}
    </GameContext.Provider>
  )
}

export default GameContext