describe('contacts', () => {
  const CONTACT_BUBBLE = '#main > div > div > div > div'
  const LOCATION_ITEMS = '#main > div > div > div > div > div > div > div > div.LocationsList > div'

  beforeEach(() => {
    cy.visit('https://demo.podium.tools/qa-webchat-lorw/')
    cy.getIframe('[id=podium-bubble]').find(CONTACT_BUBBLE).click()
  })

   it('displays three', () => {
    // BUG: PDF said 4
    cy.getIframe('[id=podium-modal]').find(LOCATION_ITEMS).children().should('have.length', 3)
  })

  it('has names listed in alphabetical order', () => {
    // Note: This is a kludgy way to check for alphabetical order.
    let values = []
    cy.getIframe('[id=podium-modal]').find(LOCATION_ITEMS).children().each(($child) => {
      values.push($child.find('h1').text())
    }).then(() => {
      expect(values[0] < values[1])
      expect(values[1] < values[2])
    })
  })

  it('any of them has an address listed', () => {
    cy.getIframe('[id=podium-modal]').find(LOCATION_ITEMS).find('button', Math.round(Math.random(3))).find('div.LocationContainer__Address').should('exist')
  })
})