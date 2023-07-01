/* eslint-disable no-console */

import get from './get'

describe( 'get function unit tests', () => {

  beforeEach( () => {
    vi.spyOn( console, 'log' ).mockImplementation( () => vi.fn )
  } )

  afterEach( () => {
    vi.clearAllMocks()
  } )

  it( 'returns the correct values when called without the id', () => {
    const getValue = get( 'topics' )

    expect ( getValue ).toMatchSnapshot()
    expect( console.log ).toBeCalledTimes( 1 )
    expect( console.log ).toBeCalledWith( 'fetching data from /topics' )
  } )

  it( 'returns the correct values when called with the id', () => {
    const getValue = get( 'topics', { id: 'email' } )

    expect ( getValue ).toMatchSnapshot()
    expect( console.log ).toBeCalledTimes( 1 )
    expect( console.log ).toBeCalledWith( 'fetching data from /topics/email' )
  } )

} )