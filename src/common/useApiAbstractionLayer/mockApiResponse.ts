const mockApiResponse = (
  response?: Array<Record<string, string|number>> | null,
) => new Promise( ( resolve, reject ) => {

  setTimeout( () => {
    if( response ) {
      resolve( response )
    }

    reject( 'API error' )
  }, 1000 )
} )

export default mockApiResponse