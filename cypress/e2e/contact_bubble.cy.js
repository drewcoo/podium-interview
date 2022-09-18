context('ContactBubble', () => {
  // podium-prompt
  const CLOSE_BUTTON = '#main > div > div > div > div > button'
  const GREETING = '#main > div > div > div > div > div > div.Prompt__PromptText'

  // podium-bubble
  const CONTACT_BUBBLE = '#main > div > div > div > div'

  // podium-modal
  const LOCATION_TITLE = '#main > div > div > div > div > div > div > div > div.LocationSelector__ColorHeader > div.LocationSelector__TitleContainer > h1'
  const LOCATION_INPUT = '#main > div > div > div > div > div > div > div > div.LocationSelector__ColorHeader > div.LocationSelector__SearchContainer > form > input'
  const LOCATION_ITEMS = '#main > div > div > div > div > div > div > div > div.LocationsList > div'
  const LOCATION_RESET = '#main > div > div > div > div > div > div > div > div.LocationSelector__ColorHeader > div.LocationSelector__SearchContainer > form > div.SearchInput__Reset'

  const SEND_SMS = '#ComposeMessage > form > div.SendSmsPage__ButtonFader > div.SendSmsPage__Center > button'

  beforeEach(() => {
    cy.visit('https://demo.podium.tools/qa-webchat-lorw/')
  })

  describe('initial greeting', () => {
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

  describe('select location', () => {
    beforeEach(() => {
      cy.getIframe('[id=podium-bubble]').find(CONTACT_BUBBLE).click()
    })

    it('is displayed after clicking contact bubble', () => {
      cy.getIframe('[id=podium-modal]').find(LOCATION_TITLE).should('exist')
    })

    it('closes with the big X bubble', () => {
      cy.getIframe('[id=podium-bubble]').find(CONTACT_BUBBLE).should('be.visible')
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

    context('contacts', () => {
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

/*
      it.only('selecting one shows contact info on message screen', () => {
        let index = Math.round(Math.random(3))
        let name
        cy.getIframe('[id=podium-modal]').find(LOCATION_ITEMS).children().eq(index).find('.LocationContainer__Name').then(($name) => {
          name = $name
        }).click()
        // #main > div > div > div > div > div > div > div > div.LocationsList > div > button.LocationContainer.StaggerFadeIn4.LocationContainer--desktop > div.LocationContainer__TopLine > h1
        //cy.getIframe('[id=podium-modal]').find(LOCATION_ITEMS).children.eq(index).click()
        cy.getIframe('[id=podium-modal]').find(MESSAGE_CONTACT).invoke('val').should('eq', name)
      })
      */
    })
  })

  describe('message', () => {
    beforeEach(() => {
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
})



