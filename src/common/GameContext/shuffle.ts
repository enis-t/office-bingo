import randomizeArray from '@/utils/randomizeArray'

import { bingoItem } from '@/types/bingoItem'

const shuffle = ( items: bingoItem[] ) => {
  let finalItems: bingoItem[] = []
  const slicesByPopularity = [ 2, 7, 15 ] // 2 rare, 7 average, 15 frequent

  const ordered = ( items )
    .sort( ( a, b ) => b.frequency - a.frequency )

  slicesByPopularity.forEach( ( amountOfItems, i ) => {
    const sliceSize = Math.floor( ordered.length / slicesByPopularity.length )

    const currentSlice = ordered.slice( i * sliceSize, ( i * sliceSize ) + amountOfItems )

    finalItems = [
      ...finalItems,
      ...randomizeArray( currentSlice ).slice( 0, amountOfItems ),
    ]
  } )

  finalItems = randomizeArray( finalItems )
  finalItems.splice( finalItems.length / 2, 0, {
    frequency: -1,
    id: 'empty',
    phrase: '',
  } )

  return finalItems
}

export default shuffle