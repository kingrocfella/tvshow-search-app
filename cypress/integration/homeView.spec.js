
describe("HomeView Page Test", () => {
  beforeEach(() => {
    cy.visit(encodeURI('http://localhost:3000/#/'));
  });
  const searchterm = "girls";
  const searchterm2 = "run";

  it("search button should be disabled as long as search box is empty and vice versa", () => {
    cy.get(".home-search-btn").should('be.disabled');
    //type into it now
    cy.get(".home-searchbox").type(searchterm);
    cy.get(".home-search-btn").should('not.be.disabled');
  });

  it("Should display a result once a valid search item is entered and submited", () => {
    cy.get(".home-searchbox").type(searchterm).type("{enter}");
    cy.get(".home-search-detail").should('be.visible').get(".test-home-btn1").should('be.visible').get(".test-home-btn2").should('be.visible').get(".test-home-img").should('be.visible');
  });

  it("both view episode and view cast buttons should be disabled once movie is in development", () => {
    cy.get(".home-searchbox").type(searchterm2).type("{enter}").get(".test-home-btn1").should('be.disabled').get(".test-home-btn2").should('be.disabled');
  });

  it("Should redirect to episodes page if view episodes button is clicked", () => {
    cy.get(".home-searchbox").type(searchterm).type("{enter}");
    cy.get(".test-home-btn1").click();
    cy.location('hash').should('eq', '#/episodes/view');
  })

});