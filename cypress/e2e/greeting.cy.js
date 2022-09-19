describe('greeting', () => {
  const CONTACT_BUBBLE = '#main > div > div > div > div'
  const CLOSE_BUTTON = '#main > div > div > div > div > button'
  const GREETING = '#main > div > div > div > div > div > div.Prompt__PromptText'
  
  beforeEach(() => {
    cy.visit('https://demo.podium.tools/qa-webchat-lorw/')
  })

  it('shows on page load', () => {
    cy.getIframe('[id=podium-prompt]').should('be.visible')
  })

  it('closes with the close button', () => {
    cy.getIframe('[id=podium-prompt]').should('be.visible')
    cy.getIframe('[id=podium-bubble]').find(CLOSE_BUTTON).click()
    cy.get('[id=podium-prompt]').should('not.exist')
  })

  it('does not show after clicking contact bubble', () => {
    cy.getIframe('[id=podium-bubble]').find(CONTACT_BUBBLE).click()
    cy.get('[id=podium-prompt]').should('not.exist')
  })

  it('displays greeting text', () => {
    // BUG: Also has time/date stamp that appears hard-coded.
    cy.getIframe('[id=podium-prompt]').find(GREETING).contains('greeting -')
  })
})