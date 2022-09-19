describe('message', () => {
  const CONTACT_BUBBLE = '#main > div > div > div > div'
  const LOCATION_ITEMS = '#main > div > div > div > div > div > div > div > div.LocationsList > div'
   
  beforeEach(() => {
    cy.visit('https://demo.podium.tools/qa-webchat-lorw/')
    cy.getIframe('[id=podium-bubble]').find(CONTACT_BUBBLE).click()
    cy.getIframe('[id=podium-modal]').find(LOCATION_ITEMS).children().eq(Math.round(Math.random(3))).click()
  })

  it('displays intro message', () => {
    // BUG: same baked time/date stamp
    // What's the point of the intro message?
    cy.getIframe('[id=podium-modal]').find('form').should('exist')
  })

  context('field is required:', () => {
    // BUG: These things aren't validated at all with the exception that ph takes only (any number of) numbers
    [{ name: 'name', selector: 'input[autocomplete=name]' },
     { name: 'tel', selector: 'input[autocomplete=tel]' },
     {name: 'message', selector: '#Message' }].forEach(($field) => {
      it($field.name, () => {
        const SEND_SMS = '#ComposeMessage > form > div.SendSmsPage__ButtonFader > div.SendSmsPage__Center > button'

        cy.getIframe('[id=podium-modal]').find('input[autocomplete=name]').type('1')
        cy.getIframe('[id=podium-modal]').find('input[autocomplete=tel]').type('1')
        cy.getIframe('[id=podium-modal]').find('#Message').type('1')
        cy.getIframe('[id=podium-modal]').find(SEND_SMS).should('have.class', 'SendButton SendButton--valid')
          
        cy.getIframe('[id=podium-modal]').find($field.selector).clear({force: true})
        cy.getIframe('[id=podium-modal]').find(SEND_SMS).should('have.class', 'SendButton SendButton--incomplete')
      })
    })
  })

  it('links to TOS', () => {
    cy.getIframe('[id=podium-modal]')
      .find('#ComposeMessage > div.PodiumPower__Container.PodiumPower__Container--noMarginBottom > div > a')
      .should('have.attr', 'href').then(($href) => {
        cy.request($href).then((resp) => {    
          expect(resp.status).to.eq(200)
        })
      })
  })
})
