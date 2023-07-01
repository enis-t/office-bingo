import randomizeArray from './randomizeArray'

describe( 'unit test for randomizeArray', () => {
  it( 'randomizes the array while preserving all original elements', () => {
    const original = Array( 50 ).fill( 1 ).map( ( _, key ) => key )

    const randomized = randomizeArray( [ ...original ] )

    expect( randomized ).toHaveLength( original.length )
    expect( randomized ).not.toEqual( original )
    expect( new Set( randomized ) ).toEqual( new Set( original ) )
  } )
} )