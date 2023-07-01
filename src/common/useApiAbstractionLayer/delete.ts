const post = ( endpoint: string, body: Record<string, string | number> ) => {

  if( !body.id ){
    throw new Error( 'No id provided to API DELETE' )
  }

  // eslint-disable-next-line no-console
  console.log( `deleting id ${ body.id } from /${ endpoint }` )

  return 'OK'
}

export default post