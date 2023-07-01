import { render, screen } from '@testing-library/react'
import ErrorBoundary from './ErrorBoundary'

const NotFailingComponent = () => <h1 data-testid='test'>test</h1>

const FailingComponent = () => {
  throw new Error( 'test error' )
}

describe( 'error boundary unit tests', () => {
  vi.spyOn( global.console, 'error' ).mockImplementation( () => vi.fn() )

  afterAll( () => {
    vi.restoreAllMocks()
  } )

  it( "lets the child components pass through when there's no error", () => {
    render(
      <ErrorBoundary>
        <NotFailingComponent />
      </ErrorBoundary>,
    )
    expect( screen.queryAllByTestId( 'error-boundary' ) ).toHaveLength( 0 )
    expect( screen.getByTestId( 'test' ) ).toBeVisible()
  } )

  it( 'display an error message if an error is thrown', () => {
    render(
      <ErrorBoundary>
        <FailingComponent />
      </ErrorBoundary>,
    )
    expect( screen.getByTestId( 'error-boundary' ) ).toBeVisible()
    expect( screen.queryAllByTestId( 'test' ) ).toHaveLength( 0 )
  } )

} )