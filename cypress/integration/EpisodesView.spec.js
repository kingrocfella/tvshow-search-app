
describe("EpisodesView Page Test", () => {
  beforeEach(() => {
    cy.visit(encodeURI('http://localhost:3000/#/episodes/view'));
  });

  it("Page header and filter should be visible", () => {
    cy.get(".test-episodes-header").should('be.visible').get(".test-episodes-filter").should('be.visible');
  });

  it("episode card, image and show summary btn should be visible", () => {
    cy.get(".test-episodebox-card").first().should('be.visible').get(".test-episodebox-card-text").first().should('be.visible').get(".test-episodebox-card-img").first().should('be.visible').get(".test-episodebox-summary-btn").first().should('be.visible');
  });

  it("should display a modal with episode summary when episode btn is clicked", () => {
    cy.get(".test-modal").should('not.be.visible');
    cy.get(".test-episodebox-summary-btn").first().click().get(".test-modal").should('be.visible');
    cy.get(".test-modal-footer").click().should('not.be.visible');
  });
});