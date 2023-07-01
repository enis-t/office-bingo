import shuffle from './shuffle'

import email from '../useApiAbstractionLayer/topics/email.json'
import customerService from '../useApiAbstractionLayer/topics/customerService.json'
import projectManagement from '../useApiAbstractionLayer/topics/projectManagement.json'


describe( 'unit tests for deal', () => {

  vi.mock( '@/utils/randomizeArray', () => ( { default: ( arr: [] ) => arr } ) )
  it( 'return the correct values', () => {
    expect( shuffle( projectManagement ) ).toMatchSnapshot()
    expect( shuffle( customerService ) ).toMatchSnapshot()
    expect( shuffle( email ) ).toMatchSnapshot()
    expect( shuffle( [
      ...Array( 10 ).fill( { frequency: 1 } ),
      ...Array( 10 ).fill( { frequency: 0.5 } ),
      ...Array( 10 ).fill( { frequency: 0 } ),
    ] ) ).toMatchSnapshot()
  } )
} )