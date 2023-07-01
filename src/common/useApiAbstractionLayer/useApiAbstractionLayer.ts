import { useEffect, useState } from 'react'

import mockApiResponse from './mockApiResponse'
import get from './get'
import post from './post'
import del from './delete'

const methods = {
  del,
  get,
  post,
}

const useApiAbstractionLayer = ( endpoint: string, method: keyof typeof methods, id?: string ) => {

  const [ loading, setLoading ] = useState<boolean>( 'get' === method )
  const [ data, setData ] = useState<Array<Record<string, string>> | null>( null )

  const run = async ( body?: Record<string, string> ) => {
    setLoading( true )
    setData( null )

    const normalizedBody = id && ( [ 'get', 'del' ].includes( method ) )
      ? {
        id,
        ...( body ?? {} ),
      }
      : { ...( body ?? {} ) }

    const response = methods[method](
      endpoint,
      normalizedBody,
    )

    mockApiResponse( response as Record<string, string | number>[] )
      .then( ( data ) => {
        setData( data as Array<Record<string, string>> )
      } )
      .catch( () => {
        // TODO: set error
      } )
      .finally( () => {
        setLoading( false )
      } )
  }

  useEffect( () => {
    if( 'get' === method ){
      run()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] )

  return {
    data,
    loading,
    run,
  }
}

export default useApiAbstractionLayer