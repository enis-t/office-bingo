import { useContext, useEffect } from 'react'

import useApiAbstractionLayer from '@/common/useApiAbstractionLayer'

import BingoCardPresentation from './BingoCardPresentation'
import Loading from '../Loading/Loading'

import { bingoItem } from '@/types/bingoItem'
import GameContext from '@/common/GameContext/GameContext'

type props = {
  topic: string,
}

const BingoCard = ( { topic }: props ) => {
  const { data, loading } = useApiAbstractionLayer( 'topics', 'get', topic )
  const { deal, cards, bingo } = useContext( GameContext )

  useEffect( () => {
    if( !loading && data ){
      deal( data as unknown as bingoItem[] )
    }
  }, [ loading, data, deal ] )

  return (
    <Loading loading={ loading }>
      <BingoCardPresentation items={ cards } bingo={ bingo } />
    </Loading>
  )
}

export default BingoCard