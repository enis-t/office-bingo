import classNames from 'classnames'

import BingoCardItem from '@/components/BingoCardItem/'

import { checkableBingoItem } from '@/types/bingoItem'

import { bingoCard } from './BingoCard.module.scss'

type props = {
  items: checkableBingoItem []
  bingo: boolean
}

const BingoCardPresentation = ( { items, bingo }: props ) => (
  <div
    className={ classNames( {
      bingo,
      [bingoCard]: true,
    } ) }
    data-test='bingo-card'
  >
    {
      items.map( ( item, key ) => (
        <BingoCardItem
          key={ item.id }
          item={ item }
          index={ key }
        />
      ) )
    }
  </div>
)

export default BingoCardPresentation