import mockApiResponse from './mockApiResponse'

describe( 'mockApiResponse unit testing', () => {
  beforeEach( () => {
    vi.useFakeTimers()
  } )

  afterEach( () => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  } )

  it( 'returns the results after the timeout', () => {
    const response = mockApiResponse( [ { test: 'test' } ] )

    vi.runAllTimers()
    expect( response ).resolves.toStrictEqual( [ { test: 'test' } ] )
  } )

  it( 'fails when given no argument', () => {
    const response = mockApiResponse()

    vi.runAllTimers()
    expect( response ).rejects.toBe( 'API error' )
  } )

} )