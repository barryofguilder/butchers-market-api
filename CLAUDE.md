# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Koa + Sequelize (Postgres) JSON:API backend for The Butcher's Market website. Node version is pinned via Volta (see `package.json`). Deployed on Render.

## Commands

```bash
npm run dev          # Vite dev server (vite-plugin-node, Koa adapter) with HMR on VITE_PORT
npm run build        # tsc type-check + vite build -> dist/index.cjs
npm start            # run the production build
npm run lint         # eslint with type-aware typescript-eslint rules (prettier enforced via eslint-plugin-prettier)
npm test             # vitest run; npm run test:watch for watch mode

npm run db:create    # sequelize-cli db:create
npm run db:migrate
npm run db:seed      # db:seed:all; db:unseed undoes all, db:seed:undo undoes the last

npm run generate:model -- <ModelName> <field:type> ...  # migration + TypeScript model
npx sequelize-cli migration:generate --name <name>
npx sequelize-cli seed:generate --name <name>
```

Tests live in `tests/` and use Vitest + supertest against `app.callback()` (no server, no port). In test mode (`import.meta.env.MODE === 'test'`) `getEnvironment()` returns `test`, which points Sequelize at an in-memory SQLite database; each test file resets it with `resetDatabase()` from `tests/helpers.ts`. `vitest.config.ts` is separate from `vite.config.ts` so vite-plugin-node doesn't boot the server, and it pins the `VITE_` vars tests rely on.

CI ([.github/workflows/ci.yml](.github/workflows/ci.yml)) runs lint, `tsc --noEmit` and tests on non-draft PRs (including when a draft is marked ready for review) and on pushes to `master`. It takes the Node version from `volta.node`.

Setup: copy `.env.example` to `.env`. All env vars use the `VITE_` prefix because app code reads them via `import.meta.env`.

## Architecture

**Request pipeline** ([src/app.ts](src/app.ts); [src/index.ts](src/index.ts) only calls `listen`, and only in production): error middleware → logger (skips the `/api/` health check) → CORS → koa-body (multipart enabled) → koa-jwt → router. JWT auth is required for every non-`GET` request except `/api/token`. Tokens come from `POST /api/token`, which checks a single username/password from env and issues a 30-day JWT.

**The app object is the service locator.** `app.db` (Sequelize models) and `app.serialize` (JSON:API serializer) are attached in `app.ts`. Route handlers reach them via `ctx.app.db.<Model>` and `ctx.app.serialize('<type>', ...)` rather than importing them. Both are typed through a `declare module 'koa'` augmentation of `DefaultContext` in `app.ts`, so `ctx.app.db.MeatBundle` is a typed model class.

**Adding a resource touches four places, each with a manual registry:**
1. Model in `src/db/models/<name>.ts` (start with `npm run generate:model`, which also writes the migration; don't use `sequelize-cli model:generate` directly, it writes a JavaScript model): a class extending [`AppModel`](src/db/models/app-model.ts) with `declare`d fields typed via `InferAttributes`/`InferCreationAttributes`, plus a default-exported `(sequelize) => Model.init(...)` function. Registered by hand in [src/db/models/index.ts](src/db/models/index.ts). There is no auto-loading. List `id`, `createdAt` and `updatedAt` in `init` with `allowNull: false` (the typings require them, and listing them otherwise drops the `NOT NULL` Sequelize would add).
2. Migration in `src/db/migrations/` (CommonJS; a `package.json` with `"type": "commonjs"` in `migrations/` and `seeders/` makes Node load them that way despite the root `"type": "module"`. Existing migrations wrap changes in `queryInterface.sequelize.transaction`).
3. Serializer in `src/resources/<name>.ts` taking the model class and returning a `ResourceObject` (`{ type, id, attributes, links }`), registered in [src/resources/index.ts](src/resources/index.ts). `serialize()` wraps the result in `{ data }`, converts ids to strings, and only accepts the model that matches the resource type.
4. Router in `src/routes/<name>.ts` exporting `router.routes()`, mounted under the `/api` namespace in [src/routes/index.ts](src/routes/index.ts). Route paths are plural kebab-case (e.g. `/api/grab-and-gos`).

**Conventions in route handlers:**
- Request bodies are JSON:API: read them with `getAttributes<T>(ctx)` from [src/routes/json-api.ts](src/routes/json-api.ts), typed as what the UI sends (usually `CreationAttributes<Model>`, or `Partial<...>` for `PATCH`). It's a type assertion, not validation; Sequelize validation produces the 422s.
- Filters use bracketed query params, e.g. `ctx.query['filter[isHidden]']`.
- Use `Model.findOrFail(id)` (a static on `AppModel`). It throws `NotFoundError`, which [src/errors/middleware.ts](src/errors/middleware.ts) turns into a JSON:API 404. Sequelize `ValidationError`/`UniqueConstraintError` become 422s with `source.pointer` set to `/data/attributes/<field>`.
- Orderable resources have a `displayOrder` column, a `POST /reorder` endpoint that takes an ordered array of `{ id }`, and new records appended at max+1. Reorder bodies are read with `getReorderItems(ctx)`. See [src/routes/meat-bundle.ts](src/routes/meat-bundle.ts).
- List-type attributes (e.g. meat bundle `items`) are stored as `|`-delimited strings. Routes `join('|')` on write; the serializer splits on read. The route's attributes type swaps the field to `string[]` (e.g. `MeatBundleAttributes`).

**Two DB configs:** [src/config/db.ts](src/config/db.ts) is used by the running app (`import.meta.env`). [src/config/db.cjs](src/config/db.cjs) is used by sequelize-cli (`process.env` via dotenv; wired up in `.sequelizerc`). Keep the two in sync. The app prefers `VITE_DB_URL` when it is set. The environment is `test` under Vitest, `production` when `import.meta.env.PROD`, otherwise `development`.

**Uploads** ([src/routes/upload.ts](src/routes/upload.ts), [src/utilities/file.ts](src/utilities/file.ts)): multipart `file` plus `generatedFileName`. Images are optimized/resized through the TinyPNG API (skipped for PDFs, `?noOptimize`, or `VITE_OPTIMIZE_IMAGES=false`) and then uploaded to S3 under `VITE_UPLOAD_DIR`.

Source and tests are TypeScript. Migrations and seeders stay CommonJS `.js` because sequelize-cli loads them directly, and `scripts/generate-model.js` is run by plain `node`. `tsc` runs in strict mode over `src/`, `tests/` and both Vite configs, but only for type-checking (`noEmit`). ESLint 10 is configured in [eslint.config.js](eslint.config.js) (flat config). It uses typescript-eslint's `recommended-type-checked` rules for `.ts` files, with the `no-unsafe-*` and `require-await` rules off in `tests/` because supertest response bodies are `any`. Migrations, seeders and `.cjs` files are linted as CommonJS with `eslint-plugin-n`.

## Conventions

- Only add comments where the code needs explaining, such as non-obvious reasons or workarounds. Don't comment on what the code plainly does.
- Use US English spelling in code, comments, commit messages, and PR descriptions (e.g. "serialize", "color", "behavior").

- Commit messages are one short imperative line with no body (e.g. `Add create/delete/reorder to meat-bundles`). Explanations go in the PR description.
- Don't add AI attribution to commits or PRs: no "Generated with Claude Code" line in PR descriptions and no `Co-Authored-By` trailer in commit messages.
