describe("EpisodesView Page Test", () => {
  beforeEach(() => {
    cy.visit(encodeURI('http://localhost:3000/#/movie/cast'));
  });

  it("Page header and filter should be visible", () => {
    cy.get(".test-cast-header").should('be.visible').should('be.visible');
  });

  it("episode card, image should be visible", () => {
    cy.get(".test-cast-card").first().should('be.visible').get(".test-cast-card-text").first().should('be.visible').get(".test-cast-card-img").first().should('be.visible').get(".test-episodebox-summary-btn").first().should('be.visible');
  });
});