import visualRegression from '../support/utils/visualRegression'

describe( 'template spec', () => {
  it( 'passes', () => {
    cy.visit( '/' )
    cy.get( '[data-test=select-topic]' ).should( 'be.visible' )
    visualRegression( 'homepage' )
    cy.get( '[data-test=select-topic] > :nth-child(3)' ).click()
    // visual regression
    cy.get( '.firstRow.diagonal' ).click()
    cy.get( '[data-test=bingo-card] > :nth-child(2)' ).click()
    cy.get( '[data-test=bingo-card] > :nth-child(3)' ).click()
    cy.get( '[data-test=bingo-card] > :nth-child(4)' ).click()
    cy.get( '.firstRow.diagonalInverse' ).click()

    cy.get( '.firstRow.diagonal' ).should( 'have.class', 'winning' )
    cy.get( '[data-test=bingo-card] > :nth-child(2)' ).should( 'have.class', 'winning' )
    cy.get( '[data-test=bingo-card] > :nth-child(3)' ).should( 'have.class', 'winning' )
    cy.get( '[data-test=bingo-card] > :nth-child(4)' ).should( 'have.class', 'winning' )
    cy.get( '.firstRow.diagonalInverse' ).should( 'have.class', 'winning' )
    cy.get( '.overlay' ).should( 'be.visible' )

    cy.get( 'button' ).click()
    cy.get( '[data-test=select-topic] > :nth-child(3)' ).click()
    cy.get( '[data-test=bingo-card] > :nth-child(6)' ).click()
    cy.get( '[data-test=bingo-card] > :nth-child(6)' ).should( 'have.class', 'checked' )
    cy.get( '[data-test=bingo-card] > :nth-child(6)' ).click()
    cy.get( '[data-test=bingo-card] > :nth-child(6)' ).should( 'not.have.class', 'checked' )
  } )
} )