describe("Mobile Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("Mobile viewport", () => {
    beforeEach(() => {
      cy.viewport(375, 667); // iPhone SE dimensions
    });

    it("shows mobile menu button on small screens", () => {
      cy.get('[aria-label="Toggle mobile menu"]').should("be.visible");
    });

    it("hides desktop navigation on small screens", () => {
      cy.get(".hidden.md\\:flex").should("not.be.visible");
    });

    it("opens mobile drawer when menu button is clicked", () => {
      cy.get('[aria-label="Toggle mobile menu"]').click();
      cy.get('[aria-label="Close menu"]').should("be.visible");
      cy.contains("Menu").should("be.visible");
    });

    it("closes mobile drawer when close button is clicked", () => {
      cy.get('[aria-label="Toggle mobile menu"]').click();
      cy.get('[aria-label="Close menu"]').click();
      cy.get('[aria-label="Close menu"]').should("not.be.visible");
    });

    it("closes mobile drawer when overlay is clicked", () => {
      cy.get('[aria-label="Toggle mobile menu"]').click();
      cy.get(".fixed.inset-0.bg-black\\/50").click({ force: true });
      cy.get('[aria-label="Close menu"]').should("not.be.visible");
    });

    it("contains Home link in mobile nav", () => {
      cy.get('[aria-label="Toggle mobile menu"]').click();
      cy.contains("Home").should("be.visible");
    });

    it("Home link navigates correctly", () => {
      cy.get('[aria-label="Toggle mobile menu"]').click();
      cy.contains("Home").click();
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });

    it("contains theme toggle in mobile nav", () => {
      cy.get('[aria-label="Toggle mobile menu"]').click();
      cy.contains("Theme").should("be.visible");
    });

    it("shows sign in option when signed out", () => {
      cy.get('[aria-label="Toggle mobile menu"]').click();
      cy.get("button").contains("Sign in").should("exist");
    });

    it("mobile menu button transforms when opened", () => {
      cy.get('[aria-label="Toggle mobile menu"]').click();
      cy.get('[aria-label="Toggle mobile menu"]')
        .find("span")
        .first()
        .should("have.class", "rotate-45");
    });

    it("mobile drawer slides in from the right", () => {
      cy.get('[aria-label="Toggle mobile menu"]').click();
      cy.get(".fixed.top-0.right-0").should("have.class", "translate-x-0");
    });
  });

  context("Desktop viewport", () => {
    beforeEach(() => {
      cy.viewport(1024, 768);
    });

    it("hides mobile menu button on large screens", () => {
      cy.get('[aria-label="Toggle mobile menu"]').should("not.be.visible");
    });

    it("shows desktop navigation on large screens", () => {
      cy.get(".hidden.md\\:flex").should("be.visible");
    });
  });
});