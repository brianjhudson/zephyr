# Testing Documentation

## Test Setup

This project includes comprehensive testing for the Clerk authentication flow with:

- **Jest + React Testing Library** for unit and component tests
- **Playwright** for end-to-end integration tests
- **@clerk/testing** utilities for authentication testing

## Test Structure

### Unit Tests (`src/__tests__/`)
- `basic-auth.test.tsx` - Basic authentication setup verification
- Tests verify components render correctly and configuration is valid

### End-to-End Tests (`e2e/`)
- `auth-flow.spec.ts` - Complete authentication user flow
- `middleware-protection.spec.ts` - Route protection and middleware behavior
- `clerk-integration.spec.ts` - Clerk component integration and functionality

## Running Tests

```bash
# Run unit tests
npm test

# Run unit tests in watch mode
npm run test:watch

# Run end-to-end tests
npm run test:e2e

# Run e2e tests with UI
npm run test:e2e:ui
```

## Test Coverage

### Authentication Flow Testing
- [x] Sign-in page renders correctly
- [x] Sign-up page renders correctly  
- [x] Dashboard requires authentication
- [x] Public routes are accessible
- [x] Protected routes redirect to sign-in
- [x] Middleware configuration is correct
- [x] Clerk components load without errors
- [x] Catch-all routes work properly
- [x] Error handling for invalid credentials
- [x] Route protection works for nested paths

### Component Testing
- [x] Page layouts and styling
- [x] Proper component structure
- [x] Environment variable configuration
- [x] Middleware route matching logic

## Mock Strategy

Unit tests use mocked Clerk components to avoid complex authentication setup during testing. E2E tests interact with actual Clerk components but don't require real user accounts.

## Test Environment

- Tests run against `http://localhost:3000`
- E2E tests automatically start dev server
- Environment variables are mocked in unit tests
- Real Clerk configuration used in E2E tests

## Adding New Tests

When adding authentication-related features:

1. Add unit tests for component behavior
2. Add E2E tests for user flows
3. Update middleware tests if route protection changes
4. Test both authenticated and unauthenticated states