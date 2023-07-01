import { Component, ReactElement } from 'react'

import { errorBoundary } from './ErrorBoundary.module.scss'

class ErrorBoundary extends Component<{children: ReactElement}, { error: Error | null }> {
  constructor( props: {children: ReactElement} ) {
    super( props )
    this.state = { error: null }
  }

  static getDerivedStateFromError( error: Error ) {
    return { error }
  }

  render() {
    return this.state.error
      ? (
        <div className={ errorBoundary } data-testid='error-boundary'>
          <h1>Something went wrong 😕</h1>
          {'development' === import.meta.env.MODE && (
            <>
              <h3>{this.state.error.message}</h3>
              <pre>
                {this.state.error.stack}
              </pre>
            </>
          )}
        </div>
      )
      : this.props.children
  }
}

export default ErrorBoundary