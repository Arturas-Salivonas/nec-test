# User Registration App

A simple Next.js + TypeScript app for registering users with form validation.

## Setup

Clone the repo and install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Run tests:

```bash
npm test
```

## What It Does

This is a user registration form that lets you add users with:
- Name (required)
- Age (18+ only)
- Country (England, Italy, Australia, France)
- Interests (at least one checkbox)

After submitting, users appear in a table below the form.

## Tech Decisions

**Next.js 16 + TypeScript** - App Router with strict TypeScript for type safety.

**Zod** - Runtime validation and TypeScript types from a single source.

**GDS Design System** - UK Government Design System patterns for accessible forms and error handling.

**Local state** - Simple useState for parent-child communication.

**Jest + React Testing Library** - Tests user behavior.

## Project Structure

- `app/` - Next.js pages and layouts
- `components/` - Form and user list components
- `lib/` - Validation schemas and constants
- `types/` - TypeScript interfaces
- `__tests__/` - Component tests

## Accessibility

Following WCAG 2.1 AA standards:
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Focus management (errors get focus)
- Screen reader support
- Clear error messages
