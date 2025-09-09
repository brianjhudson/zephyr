describe("Drinks Carousel", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the drinks carousel", () => {
    cy.get('[data-testid="drinks-carousel"]').should("exist");
  });

  it("contains images", () => {
    cy.get('[data-testid="drinks-carousel"] img').should(
      "have.length.greaterThan",
      0
    );
    cy.get('[data-testid="drinks-carousel"] img')
      .first()
      .should("have.attr", "src");
    cy.get('[data-testid="drinks-carousel"] img')
      .first()
      .should("have.attr", "alt");
  });

  it("contains headings", () => {
    cy.get('[data-testid="drinks-carousel"] h2').should("exist");
    cy.get('[data-testid="drinks-carousel"] h2').should(
      "contain.text",
      "Crafted to Perfection"
    );
  });

  it("contains subheadings", () => {
    cy.get('[data-testid="drinks-carousel"] p').should("exist");
    cy.get('[data-testid="drinks-carousel"] p').should(
      "contain.text",
      "Each cocktail is meticulously prepared"
    );
  });

  it("has navigation controls", () => {
    cy.get('[aria-label="Previous slide"]').should("exist");
    cy.get('[aria-label="Next slide"]').should("exist");
  });

  it("has dot indicators", () => {
    cy.get('[aria-label*="Go to slide"]').should("have.length", 3);
  });

  it("can navigate between slides using next button", () => {
    cy.get('[aria-label="Next slide"]').click();
    cy.get('[data-testid="drinks-carousel"] h2').should(
      "contain.text",
      "Refined Sophistication"
    );
  });

  it("can navigate between slides using dot indicators", () => {
    cy.get('[aria-label="Go to slide 3"]').click();
    cy.get('[data-testid="drinks-carousel"] h2').should(
      "contain.text",
      "Artisan Excellence"
    );
  });
});
