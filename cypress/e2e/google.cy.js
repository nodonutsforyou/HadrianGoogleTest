/// <reference types="cypress" />

describe('check if Hadrian is on first page', () => {
  beforeEach(() => {
    cy.visit('https://www.google.com/')
    cy.get('button').contains(Cypress.env('cookies_button_text')).click()
  })

  it('displays Hadrian on first page', () => {
    const maxDepthPage = Cypress.env('max_depth_page')
    const maxDepthToGoDown = Cypress.env('max_depth_to_go_down')
    cy.get('input[name="q"]').type("Because hackers know hackers best")
    cy.get('form[role="search"]').submit()

    // Recursive function to check results on single page and if needed click next
    const checkThePage = (pageNum) => {
      return cy.get('div[id="rso"]', { timeout: 50000 }).then(($list) => {
        // if there is a link
        if ($list.find(`a[href*="${Cypress.env('sublink_to_look_for')}"]`).length) {
          // returns the page number we've found the link
          return cy.wrap(pageNum)
        } else {
          const nextPageNum = pageNum + 1
          // clicking next page
          cy.get('a[id="pnnext"]').click()
          // looking for page number on the page so we know the page is loaded
          cy.get(`div[id="result-stats"]:contains("Page ${nextPageNum}")`)
          if (nextPageNum <= maxDepthToGoDown) {
            // we call the same function recursivly for next page
            return checkThePage(nextPageNum)
          } else {
            // returns error string
            return cy.wrap("Reached maximum search depth")
          }
        }
      })
    }
    // end of checkThePage function

    checkThePage(1).then( (pageNum) => {
      expect(pageNum).be.lte(maxDepthPage)
    }, { timeout: 50000 })
  })
})
