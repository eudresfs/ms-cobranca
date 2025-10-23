# Repository Guidelines

## Project Structure & Module Organization
This repository starts intentionally lean; scaffold new features using the layout below so the billing service stays predictable. Runtime code lives in `src/`, grouped by domain (e.g., `src/billing/`, `src/customers/`). Share DTOs and validators from `src/shared/`, and keep adapters in `src/adapters/`. Place infrastructure manifests in `infra/`, configuration samples in `config/` with `.example` suffixes, and mirror the tree under `tests/` plus `tests/integration/` for service-level cases.

## Build, Test, and Development Commands
Centralize automation in a `Makefile` or `justfile`. `make setup` installs dependencies (wrap `poetry install`, `pip install -r requirements.txt`, or `npm install`). `make run` starts the dev server with hot reload, `make lint` formats and lints, and `make test` runs the full matrix. Update this section whenever you add or rename a command.

## Coding Style & Naming Conventions
Default to 4-space indentation for Python and 2 spaces for YAML/TOML. Use snake_case for files, modules, and functions; PascalCase for classes; kebab-case for Docker service IDs. Prefer descriptive filenames such as `billing_service.py` or `invoice.repository.ts`. Format with `ruff format` or `black`, run `ruff check --fix`, and rely on ESLint + Prettier via `npm run lint` for TypeScript fragments.

## Testing Guidelines
Mirror the `src/` layout in `tests/`, naming pytest files `test_<feature>.py` and TypeScript specs `<feature>.spec.ts`. Keep integration flows in `tests/integration/` and orchestrate dependencies with `docker compose -f infra/docker-compose.dev.yml up`. Maintain ≥80% coverage and export reports to `artifacts/coverage/` for CI attachments. Run `make test` (and any targeted smoke suites) before every push and add regression tests with bug fixes.

## Commit & Pull Request Guidelines
Adopt Conventional Commits, e.g., `feat(billing): add boleto webhook`. Explain intent in the body, reference issues (`Refs #42`), and keep each PR focused. Include summary, testing checklist (`make lint`, `make test`), risk or rollback notes, and screenshots for UI changes. Rebase onto `main`, ensure CI green, then request review.

## Security & Configuration Tips
Never commit secrets; store them in `.env.local` and share `.env.example` placeholders instead. Document required variables in `config/README.md`, run dependency audits (`pip-audit` or `npm audit`) before releases, and scrub sensitive data from logs.
