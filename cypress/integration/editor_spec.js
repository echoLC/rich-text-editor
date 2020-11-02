describe('Editor init', () => {
  beforeEach(() => {
    // per test suit reload page
    // window.location.reload()
    cy.reload()
  })

  it('it should can init basic editor by new Editor instance pass dom', () => {
    cy.visit('/')

    cy.get('#editor').find('.editor-toolbar').first()
    cy.get('#editor').find('.editor-toolbar').children().should('have.length', 3)
    cy.get('#editor').find('.editor-content').last()

    cy.get('.editor-content').should('contain', 'test')
  })

  it('it should click h button make text change to h1 title', () => {
    cy.get('#editor')
      .find('.editor-content')
      .focus()
      .then(contentEl => {
        cy.get('#editor').find('.editor-toolbar').children().first().click()

        cy.get('#editor').find('.editor-content').get('h1').should('not.to.be', null)
      })
  })

  it('it should click b button make text change to bold style', () => {
    cy.get('#editor')
      .find('.editor-content')
      .focus()
      .click()
      .then(contentEl => {
        cy.get(contentEl)
          .type('{selectall}')
          .then(() => {
            cy.get('#editor').find('.editor-toolbar').children().eq(1).click()

            cy.get('#editor').find('.editor-content').get('b')
          })
      })
  })
})
