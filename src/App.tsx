import { useState, useRef } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import { GameContextProvider } from '@/common/GameContext'

import Layout from '@/components/Layout'
import BingoCard from '@/components/BingoCard/BingoCard'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'
import SelectTopic from '@/components/SelectTopic'
import Overlay from '@/components/Overlay'


const App = () => {
  const [ topic, setTopic ] = useState<string|null>( null )
  const noderef = useRef( null )

  return (
    <ErrorBoundary>
      <GameContextProvider>
        <SwitchTransition>
          <CSSTransition
            key={ topic }
            nodeRef={ noderef }
            timeout={ 200 }
            classNames='fade'
          >
            <Layout ref={ noderef }>
              {
                topic
                  ? <BingoCard topic={ topic } key='projectManagement' />
                  : <SelectTopic setTopic={ setTopic } />
              }
            </Layout>
          </CSSTransition>
        </SwitchTransition>
        <Overlay setTopic={ setTopic } />
      </GameContextProvider>
    </ErrorBoundary>
  )
}

export default App
