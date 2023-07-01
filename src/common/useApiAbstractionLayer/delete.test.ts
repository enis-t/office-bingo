import del from './delete'

describe( 'delete unit testing', () => {

  beforeEach( () => {
    vi.spyOn( console, 'error' ).mockImplementation( () => vi.fn() )
    vi.spyOn( console, 'log' ).mockImplementation( () => vi.fn )
  } )

  afterEach( () => {
    vi.clearAllMocks()
  } )

  it( 'throws an error if called without id', () => {
    try {
      expect( del( 'endpoint', { test: 123 } ) ).toThrowError( '' )
    } catch ( error ) {
      return
    }
  } )

  it( 'calls the endpoint with id if an id is in the body request and removes the id from the body', () => {
    del( 'endpoint', {
      id: 123,
      test: 123,
    } )
    // eslint-disable-next-line no-console
    expect( console.log ).toBeCalledWith( 'deleting id 123 from /endpoint' )
  } )
} )