# Repository Guidelines

## Project Structure & Module Organization
This Turborepo groups every workspace under clear prefixes. Runtime services live in `apps/`: `apps/backend` hosts the NestJS API (source in `src/`, tests in `test/`), while `apps/frontend` contains the Vite + React SPA (`src/`, static assets in `public/`). Shared libraries are in `packages/`: `shared-types` for TypeScript models and helpers, `ui` for reusable React primitives, and lint/TypeScript presets in `eslint-config` and `typescript-config`. Infrastructure files (`docker-compose.yml`, environment samples) stay in the repo root; keep new infra manifests inside an `infra/` folder when added.

## Build, Test, and Development Commands
- `npm install` – bootstrap all workspaces via npm workspaces.
- `npm run dev -- --filter=@repo/backend` / `--filter=@repo/frontend` – start each app with hot reload.
- `npm run build` – run the Turborepo build pipeline for every workspace.
- `npm run lint -- --filter=@repo/*` – execute ESLint across selected packages.
- `npm --workspace apps/backend run prisma:migrate` – manage Prisma migrations for the API.
If you add scripts, mirror them in `package.json` and document the new usage here.

## Coding Style & Naming Conventions
Prettier (configured via `npm run format`) enforces two-space indentation and single quotes across TS/TSX. ESLint extends the shared presets in `packages/eslint-config`; prefer fixing issues with `npm run lint -- --filter=<workspace>`. Name files in kebab-case, NestJS providers in PascalCase, and exported constants in SCREAMING_SNAKE_CASE only when truly constant. Align DTOs and Prisma models with English camelCase keys to match existing code.

## Testing Guidelines
Backend tests use Jest; run `npm --workspace apps/backend run test` for unit suites and `npm --workspace apps/backend run test:e2e` for end-to-end cases. Frontend coverage currently relies on lint + type checks; introduce Vitest when UI logic gains complexity. Aim for ≥80% statement coverage and place fixtures under `apps/backend/test/fixtures/` or `apps/frontend/src/__tests__/` when created. New features must ship with regression tests or documented rationale when testing is deferred.

## Commit & Pull Request Guidelines
History is still sparse (`Initial commit`, setup merges), so adopt Conventional Commits going forward (e.g., `feat(auth): add refresh-token endpoint`). Keep commits scoped to a single concern and reference issues with `Refs #123`. PRs should outline context, implementation notes, verification steps (`npm run lint`, `npm run build`, workspace-specific tests), and screenshots or curl samples for user-facing changes. Ensure CI passes before requesting review.

## Security & Configuration Tips
Never commit real secrets; instead copy the provided `.env.example` files and store credentials locally. Rotate `BETTER_AUTH_SECRET`, `JWT_SECRET`, and database passwords per environment. Run `npm audit` before releases and scrub sensitive fields from logs or Prisma models before exporting sample data. Document any new environment variable in both the root and relevant workspace README files.
