describe('location', () => {
  const CONTACT_BUBBLE = '#main > div > div > div > div'
  const LOCATION_INPUT = '#main > div > div > div > div > div > div > div > div.LocationSelector__ColorHeader > div.LocationSelector__SearchContainer > form > input'
  const LOCATION_RESET = '#main > div > div > div > div > div > div > div > div.LocationSelector__ColorHeader > div.LocationSelector__SearchContainer > form > div.SearchInput__Reset'
  const LOCATION_TITLE = '#main > div > div > div > div > div > div > div > div.LocationSelector__ColorHeader > div.LocationSelector__TitleContainer > h1'
   
  beforeEach(() => {
    cy.visit('https://demo.podium.tools/qa-webchat-lorw/')
    cy.getIframe('[id=podium-bubble]').find(CONTACT_BUBBLE).click()
  })

  it('is displayed after clicking contact bubble', () => {
    cy.getIframe('[id=podium-modal]').find(LOCATION_TITLE).should('exist')
  })

  it('closes with the big X bubble', () => {
    cy.wait(500) // KLUDGE! There's some kind of race condition where this is visisble, enabled, but not click-able.
    // BUG: that race condition
    cy.getIframe('[id=podium-bubble]').find(CONTACT_BUBBLE).click()
    cy.get('[id=podium-modal]').should('not.exist')
  })

  it('has a default zip code (geoloc?)', () => {
    // BUG: not my correct zip
    cy.getIframe('[id=podium-modal]').find(LOCATION_INPUT).invoke('val').should(($value) => {
      expect($value).to.match(/\d{5}/)
    })
  })

   it('can clear the location field with X', () => {
    cy.getIframe('[id=podium-modal]').find(LOCATION_RESET).click()
    cy.getIframe('[id=podium-modal]').find(LOCATION_INPUT).invoke('val').should('eq', '')
  })
})