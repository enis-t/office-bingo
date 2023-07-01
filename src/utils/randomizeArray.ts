const randomizeArray = <T>( array: T[] ): T[] => {
  for ( let i = array.length - 1; 0 < i; i-- ) {
    const j = Math.floor( Math.random() * ( i + 1 ) );

    [ array[i], array[j] ] = [ array[j], array[i] ]
  }
  return array
}

export default randomizeArray