import { ReactNode, useRef } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import Spinner from './Spinner'

import { loader } from './Loading.module.scss'

const Loading = ( { loading, children }: {loading:boolean, children: ReactNode} ) => {
  const noderef = useRef( null )

  return (
    <SwitchTransition>
      <CSSTransition
        key={ loading ? 1 : 2 }
        nodeRef={ noderef }
        timeout={ 200 }
        classNames='fade'
      >
        <div ref={ noderef } className={ loader }>
          {loading ? <Spinner /> : children}
        </div>
      </CSSTransition>
    </SwitchTransition>
  )
}

export default Loading