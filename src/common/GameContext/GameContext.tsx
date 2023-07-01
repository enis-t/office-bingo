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
  deal: ( items: bingoItem[] ) => void
  reset: () => void
  toggle: ( id: string, checked: boolean ) => void
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

  const deal = useCallback( ( items: bingoItem[] ) => {
    setCards( shuffle( items ).map( ( item ) => ( {
      ...item,
      checked: 'empty' === item.id,
    } ) ) )
  }, [] )

  const { run } = useApiAbstractionLayer( 'topics', 'post' )
  const { run: runDelete } = useApiAbstractionLayer( 'topics', 'del' )

  const toggle = ( id: string, checked: boolean ) => {
    if( 'empty' === id ){
      // is jolly item
      return
    }

    setCards( ( old ) => old.map( ( item ) => item.id === id ? {
      ...item,
      checked: !item.checked,
    } : item ) )

    const runFunction = checked ? runDelete : run

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

    // checks if the partial card sequence matches a winning sequence
    const checkWinningSequence = ( sequence: Array<number> ) => checkedCards
      .filter( ( _, i ) => sequence.includes( i ) )
      .every( ( item ) => item )

    // checks every possible winning sequences against current
    // checked cards and keeps track of active winning sequences
    // TODO: make it dynamically adapt to different board sizes
    const winningCombinations: Partial<winningSequenceType> = Object
      .entries( winningSequencesPattern )
      .reduce( ( final, [ key, value ] ) => ( {
        ...final,
        [key]: checkWinningSequence( value ),
      } ), {} )

    // A winning sequence is all checked
    if( Object.values( winningCombinations ).includes( true ) ){
      setBingo( true )
      Object.entries( winningCombinations ).forEach( ( [ key, value ] ) => {
        if( value ){
          setWinningSequences( ( old ) => [
            ...old as unknown as winningSequenceKey[],
            key as unknown as winningSequenceKey,
          ] )
        }
      } )
    }
  }, [ cards ] )

  return (
    <GameContext.Provider value={ {
      bingo,
      cards,
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