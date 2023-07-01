import { Dispatch, SetStateAction } from 'react'

import useApiAbstractionLayer from '@/common/useApiAbstractionLayer'
import Loading from '@/components/Loading'

import { select } from './SelectTopic.module.scss'

type props = {
  setTopic : Dispatch<SetStateAction<string | null>>
}

const SelectTopic = ( { setTopic }: props ) => {
  const { data, loading } = useApiAbstractionLayer( 'topics', 'get' )

  return(

    <Loading loading={ loading }>
      <div className={ select } data-test='select-topic'>
        <h1>Welcome to Office Bingo!</h1>
        <h2>Select a scenario</h2>
        {
          ( data ?? [] ).map( ( { name, title } ) => (
            <button
              key={ name }
              onClick={ () => {
                setTopic( name )
              } }
            >
              {title}
            </button>
          ) )
        }
      </div>
    </Loading>
  )
}


export default SelectTopic