const visualRegression = ( page: string ) => {
  const sizes = [
    [ 'samsung-note9', 'landscape' ],
    'samsung-note9',
    [ 'ipad-2', 'landscape' ],
    'ipad-2',
    [ 'iphone-x', 'landscape' ],
    'iphone-x',
    'macbook-15',
    [ 1280, 800 ],
    [ 1366, 768 ],
    [ 1440, 800 ],
    [ 1920, 1080 ],
  ]

  sizes.forEach( ( size: [Cypress.ViewportPreset, Cypress.ViewportOrientation]|Cypress.ViewportPreset ) => {
    cy.setResolution( size )
    cy.matchImageSnapshot( `${ page }/${ size.toString() }` )
  } )
}

export default visualRegression