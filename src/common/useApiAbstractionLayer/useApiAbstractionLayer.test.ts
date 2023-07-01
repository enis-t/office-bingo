import { renderHook, waitFor } from '@testing-library/react'

import useApiAbstractionLayer from './useApiAbstractionLayer'
import mockApiResponse from './mockApiResponse'
import get from './get'
import post from './post'
import del from './delete'

// mocks are hoisted. Duplicated code is necessary
vi.mock(
  './mockApiResponse',
  () => ( { default: vi.fn().mockImplementation( () => Promise.resolve( { test: 123 } ) ) } ),
)

vi.mock(
  './get',
  () => ( { default: vi.fn().mockImplementation( () => null ) } ),
)

vi.mock(
  './post',
  () => ( { default: vi.fn().mockImplementation( () => null ) } ),
)

vi.mock(
  './delete',
  () => ( { default: vi.fn().mockImplementation( () => null ) } ),
)

describe( 'useApiAbstractionLayer unit testing', () => {

  describe( 'useApiAbstractionLayer unit testing - get method', () => {
    afterEach( () => {
      vi.clearAllMocks()
    } )

    it( 'changes the loading status and the data correctly', async () => {
      const { result } = renderHook( () => useApiAbstractionLayer( '', 'get' ) )

      expect( result.current.data ).toBeNull()
      expect( result.current.loading ).toBeTruthy()

      await waitFor( () => {
        expect( mockApiResponse ).toBeCalledTimes( 1 )
      } )

      expect( get ).toBeCalledTimes( 1 )
      expect( post ).toBeCalledTimes( 0 )
      expect( result.current.data ).toMatchInlineSnapshot( `
      {
        "test": 123,
      }
    ` )

    } )

    it( 'calls get on load when called to get', async () => {

      renderHook( () => useApiAbstractionLayer( '', 'get' ) )

      await waitFor( () => {
        expect( mockApiResponse ).toBeCalledTimes( 1 )
        expect( get ).toBeCalledTimes( 1 )
        expect( post ).toBeCalledTimes( 0 )
      } )
    } )

    it( 'calls get with id on body when called with id', async () => {

      renderHook( () => useApiAbstractionLayer( 'endpoint', 'get', 'id' ) )

      await waitFor( () => {
        expect( mockApiResponse ).toBeCalledTimes( 1 )
      } )
      expect( post ).toBeCalledTimes( 0 )
      expect( get ).toBeCalledWith( 'endpoint', { id: 'id' } )
    } )

  } )

  describe( 'useApiAbstractionLayer unit testing - post method', () => {

    afterEach( () => {
      vi.clearAllMocks()
    } )

    it( 'changes the loading status and the data correctly at the right time', async () => {
      const { result } = renderHook( () => useApiAbstractionLayer( '', 'post' ) )

      expect( result.current.data ).toBeNull()
      expect( result.current.loading ).toBeFalsy()


      await waitFor( () => {
        result.current.run( { body: 'test' } )
        expect( mockApiResponse ).toBeCalledTimes( 1 )
      } )

      expect( get ).toBeCalledTimes( 0 )
      expect( post ).toBeCalledTimes( 1 )
      expect( result.current.data ).toMatchInlineSnapshot( `
      {
        "test": 123,
      }
    ` )

    } )

    it( "doesn't call post on load when called to post", async () => {

      renderHook( () => useApiAbstractionLayer( '', 'post' ) )

      await waitFor( () => {
        expect( mockApiResponse ).toBeCalledTimes( 0 )
        expect( post ).toBeCalledTimes( 0 )
      } )
    } )

    it( "doesn't call post with id when called with id", async () => {

      const { result } = renderHook( () => useApiAbstractionLayer( 'endpoint', 'post', 'id' ) )

      await waitFor( () => {
        result.current.run( { body: 'test' } )
      } )
      expect( post ).toBeCalledWith( 'endpoint', { body: 'test' } )
    } )

  } )

  describe( 'useApiAbstractionLayer unit testing - del method', () => {

    afterEach( () => {
      vi.clearAllMocks()
    } )

    it( 'changes the loading status and the data correctly at the right time', async () => {
      const { result } = renderHook( () => useApiAbstractionLayer( '', 'del', 'id' ) )

      expect( result.current.data ).toBeNull()
      expect( result.current.loading ).toBeFalsy()

      await waitFor( () => {
        result.current.run( { body: 'test' } )
        expect( mockApiResponse ).toBeCalledTimes( 1 )
      } )

      expect( get ).toBeCalledTimes( 0 )
      expect( del ).toBeCalledTimes( 1 )
      expect( result.current.data ).toMatchInlineSnapshot( `
        {
          "test": 123,
        }
      ` )

    } )

    it( "doesn't call del on load when called to del", async () => {

      renderHook( () => useApiAbstractionLayer( '', 'del' ) )

      await waitFor( () => {
        expect( mockApiResponse ).toBeCalledTimes( 0 )
        expect( del ).toBeCalledTimes( 0 )
      } )
    } )

  } )
} )