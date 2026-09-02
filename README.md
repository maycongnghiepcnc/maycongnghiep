# CNC Website Monorepo

This monorepo manages the customer-facing website and internal content management portal for the CNC machine business. 

It is built using Next.js (App Router), Tailwind CSS, Supabase, and uses `pnpm` as the package manager.

## Structure

- `apps/frontend`: Customer-facing Next.js website (port `3000`)
- `apps/portal`: Internal Next.js portal for content management (port `3001`)
- `packages/ui`: Shared React components
- `packages/database`: Supabase client and schema types
- `packages/config`: Shared configurations (ESLint, Prettier, etc.)

## Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Environment Variables:**
   Copy the sample environment file and fill in your Supabase credentials.
   ```bash
   cp .env.example .env
   ```

3. **Run development servers:**
   ```bash
   pnpm dev
   ```
   - The Frontend runs on `http://localhost:3000`
   - The Portal runs on `http://localhost:3001`
