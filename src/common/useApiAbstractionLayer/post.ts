const post = ( endpoint: string, body: Record<string, string | number> ) => {
  // remove id from body
  const normalizedBody = Object.keys( body )
    .filter( ( property ) => 'id' !== property )
    .reduce( ( normalized, key ) => ( {
      ...normalized,
      [key]: body[key],
    } ),
    {},
    )

  const normalizedEndpoint = body.id ? `${ endpoint }/${ body.id }` : endpoint

  // eslint-disable-next-line no-console
  console.log( `Posting ${ JSON.stringify( normalizedBody ) } to /${ normalizedEndpoint }` )

  return null
}

export default post