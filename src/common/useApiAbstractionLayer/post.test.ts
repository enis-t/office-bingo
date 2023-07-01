import post from './post'

describe( 'post unit testing', () => {

  beforeEach( () => {
    vi.spyOn( console, 'log' ).mockImplementation( () => vi.fn )
  } )

  afterEach( () => {
    vi.clearAllMocks()
  } )

  it( 'calls the endpoint without id if an id is not in the body request', () => {
    post( 'endpoint', { test: 123 } )
    // eslint-disable-next-line no-console
    expect( console.log ).toBeCalledWith( 'Posting {"test":123} to /endpoint' )
  } )

  it( 'calls the endpoint with id if an id is in the body request and removes the id from the body', () => {
    post( 'endpoint', {
      id: 123,
      test: 123,
    } )
    // eslint-disable-next-line no-console
    expect( console.log ).toBeCalledWith( 'Posting {"test":123} to /endpoint/123' )
  } )
} )