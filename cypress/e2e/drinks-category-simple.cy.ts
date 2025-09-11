describe("Drinks Category Carousels - Simple", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays all four drink categories", () => {
    cy.contains("Browse by Category").should("be.visible");
    cy.contains("Cocktails").should("be.visible");
    cy.contains("Beer").should("be.visible");
    cy.contains("Wine").should("be.visible");
    cy.contains("Spirits").should("be.visible");
  });

  it("loads drink cards in each category", () => {
    // Wait for drink cards to load
    cy.get('[data-testid="drink-card"]', { timeout: 15000 }).should("exist");
    
    // Should have multiple drink cards across all categories
    cy.get('[data-testid="drink-card"]').should("have.length.greaterThan", 10);
  });

  it("shows navigation arrows for categories with multiple drinks", () => {
    cy.get('[data-testid="drink-card"]', { timeout: 15000 }).should("exist");
    
    // At least one category should have navigation arrows
    cy.get('[aria-label="Next drinks"]').should("exist");
    cy.get('[aria-label="Previous drinks"]').should("exist");
  });

  it("can navigate using next button", () => {
    cy.get('[data-testid="drink-card"]', { timeout: 15000 }).should("exist");
    
    // Find the first enabled next button and click it
    cy.get('[aria-label="Next drinks"]')
      .not("[disabled]")
      .first()
      .click();
    
    // Should still have drink cards visible after navigation
    cy.get('[data-testid="drink-card"]').should("be.visible");
  });

  it("disables previous button at the start", () => {
    cy.get('[data-testid="drink-card"]', { timeout: 15000 }).should("exist");
    
    // Previous buttons should be disabled initially (at start of carousels)
    cy.get('[aria-label="Previous drinks"]').should("be.disabled");
  });

  it("drink cards contain required information", () => {
    // Wait for cards to load and ensure we have actual data, not just skeletons
    cy.get('[data-testid="drink-card"]', { timeout: 20000 }).should("exist");
    cy.get(".animate-pulse").should("not.exist");
    
    cy.get('[data-testid="drink-card"]')
      .first()
      .within(() => {
        cy.get("img").should("exist");
        cy.get("h4, h3").should("exist").and("not.be.empty");
        cy.contains(/\$\d+/).should("exist");
        cy.contains("Add to Order").should("exist");
      });
  });
});