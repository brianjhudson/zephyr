import { setupClerkTestingToken } from "@clerk/testing/cypress";

// Cypress E2E Test
describe("Testing Authentication", () => {
  it("Protects dashboard routes from unauthenticated access", () => {
    cy.visit("/dashboard");
    cy.contains("h1", "Sign in");
    cy.get(".cl-signIn-root").should("exist");
  });

  it("Allows authenticated access to dashboard through sign in ui", () => {
    setupClerkTestingToken();
    cy.visit("/dashboard");
    cy.contains("h1", "Sign in");
    cy.get(".cl-signIn-root").should("exist");
    cy.get("input[name=identifier]").type(Cypress.env("TEST_USERNAME"));

    cy.get(".cl-formButtonPrimary").contains("button", "Continue").click();
    cy.get("input[name=password]").type(Cypress.env("TEST_PASSWORD"));

    cy.get(".cl-formButtonPrimary").contains("button", "Continue").click();

    cy.url().should("include", "dashboard");
  });
  it("Allows authenticated access to dashboard through custom command", () => {
    cy.visit(`/`);
    cy.clerkSignIn({
      strategy: "password",
      identifier: Cypress.env("TEST_USERNAME"),
      password: Cypress.env("TEST_PASSWORD"),
    });
    cy.visit("/dashboard");
    cy.contains("h1", "Dashboard");
  });
  it("Protects dashboard after sign out", () => {
    cy.visit(`/`);
    cy.clerkSignIn({
      strategy: "password",
      identifier: Cypress.env("TEST_USERNAME"),
      password: Cypress.env("TEST_PASSWORD"),
    });
    cy.clerkSignOut();
    cy.visit("/dashboard");
    cy.get(".cl-signIn-root").should("exist");
    cy.visit("/");
    cy.contains("Sign in");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
