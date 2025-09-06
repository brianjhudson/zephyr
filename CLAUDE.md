# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application ("Zephyr") that uses:

- **Authentication**: Clerk for user authentication with protected routes
- **Deployment**: Cloudflare Workers via OpenNext.js Cloudflare adapter
- **Styling**: Tailwind CSS v4
- **Testing**: Cypress for E2E tests
- **TypeScript**: Strict configuration with path aliases (`@/*` → `src/*`)

## Architecture

### App Structure

- **App Router**: Uses Next.js 13+ app directory structure
- **Authentication Flow**:
  - Clerk middleware (`src/middleware.ts`) protects `/dashboard/*` routes
  - Public routes: `/`, `/sign-in/*`, `/sign-up/*`
  - Auth pages use Clerk's catch-all routing: `[[...rest]]`
- **Layout**: Root layout (`src/app/layout.tsx`) wraps app in ClerkProvider

### Key Files

- `src/middleware.ts`: Route protection logic using Clerk
- `src/app/layout.tsx`: Global layout with Clerk provider
- `wrangler.jsonc`: Cloudflare Workers deployment config
- `open-next.config.ts`: OpenNext Cloudflare adapter configuration

## Development Commands

```bash
# Development
npm run dev                # Start dev server with Turbopack
npm run build             # Build for production
npm start                 # Start production server

# Code Quality
npm run lint              # ESLint with Next.js and Cypress rules
# No typecheck command - use tsc directly if needed

# Testing
npm run test          # Run Cypress E2E tests headless
npm run test:ui       # Open Cypress UI

# Deployment
npm run deploy            # Build and deploy to Cloudflare
npm run preview           # Build and preview locally
npm run cf-typegen        # Generate Cloudflare environment types
```

## Testing Strategy

### E2E Tests (Cypress)

- Located in `cypress/e2e/`
- Tests authentication flows, middleware protection, and Clerk integration
- Configured to test against `http://localhost:3000`
- See `TESTING.md` for comprehensive test coverage details

## Environment & Deployment

### Local Development

- Uses Next.js dev server with Turbopack
- Environment variables in `.env.local`
- Clerk configuration required for auth features

### Cloudflare Deployment

- Built with OpenNext.js Cloudflare adapter
- Assets served from `.open-next/assets`
- Worker code in `.open-next/worker.js`
- Compatible with Cloudflare's Node.js compatibility layer

## Code Conventions

- **TypeScript**: Strict mode enabled
- **Path Aliases**: Use `@/*` for `src/*` imports
- **Styling**: Tailwind CSS with CSS variables for fonts
- **Authentication**: Always use Clerk hooks/components for auth state
- **Route Protection**: Modify `src/middleware.ts` for new protected routes

## CI/CD

- CircleCI configuration in `.circleci/config.yml`
- Runs Cypress E2E tests in CI pipeline
- Migrated from Playwright to Cypress (see commit history)
