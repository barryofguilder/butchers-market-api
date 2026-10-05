# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Koa + Sequelize (Postgres) JSON:API backend for The Butcher's Market website. Node version is pinned via Volta (see `package.json`). Deployed on Render.

## Commands

```bash
npm run dev          # Vite dev server (vite-plugin-node, Koa adapter) with HMR on VITE_PORT
npm run build        # tsc type-check + vite build -> dist/index.cjs
npm start            # run the production build
npm run lint         # eslint (prettier enforced via eslint-plugin-prettier)
npm test             # vitest run; npm run test:watch for watch mode

npm run db:create    # sequelize-cli db:create
npm run db:migrate
npm run db:seed      # db:seed:all; db:unseed undoes all, db:seed:undo undoes the last

npx sequelize-cli migration:generate --name <name>
npx sequelize-cli seed:generate --name <name>
```

Tests live in `tests/` and use Vitest + supertest against `app.callback()` (no server, no port). In test mode (`import.meta.env.MODE === 'test'`) `getEnvironment()` returns `test`, which points Sequelize at an in-memory SQLite database; each test file resets it with `resetDatabase()` from `tests/helpers.js`. `vitest.config.js` is separate from `vite.config.js` so vite-plugin-node doesn't boot the server, and it pins the `VITE_` vars tests rely on.

Setup: copy `.env.example` to `.env`. All env vars use the `VITE_` prefix because app code reads them via `import.meta.env`.

## Architecture

**Request pipeline** ([src/app.js](src/app.js); [src/index.js](src/index.js) only calls `listen`): error middleware → logger (skips the `/api/` health check) → CORS → koa-body (multipart enabled) → koa-jwt → router. JWT auth is required for every non-`GET` request except `/api/token`. Tokens come from `POST /api/token`, which checks a single username/password from env and issues a 30-day JWT.

**The app object is the service locator.** `app.db` (Sequelize models) and `app.serialize` (JSON:API serializer) are attached in `app.js`. Route handlers reach them via `ctx.app.db.<Model>` and `ctx.app.serialize('<type>', ...)` rather than importing them.

**Adding a resource touches four places, each with a manual registry:**
1. Model in `src/db/models/<name>.js` (a `(sequelize) => sequelize.define(...)` factory), registered by hand in [src/db/models/index.js](src/db/models/index.js). There is no auto-loading.
2. Migration in `src/db/migrations/` (CommonJS; a `package.json` with `"type": "commonjs"` in `migrations/` and `seeders/` makes Node load them that way despite the root `"type": "module"`. Existing migrations wrap changes in `queryInterface.sequelize.transaction`).
3. Serializer in `src/resources/<name>.js` returning `{ type, id, attributes, links }`, registered in [src/resources/index.js](src/resources/index.js). `serialize()` wraps the result in `{ data }` and converts ids to strings.
4. Router in `src/routes/<name>.js` exporting `router.routes()`, mounted under the `/api` namespace in [src/routes/index.js](src/routes/index.js). Route paths are plural kebab-case (e.g. `/api/grab-and-gos`).

**Conventions in route handlers:**
- Request bodies are JSON:API: read `ctx.request.body.data.attributes`.
- Filters use bracketed query params, e.g. `ctx.query['filter[isHidden]']`.
- Use `Model.findOrFail(id)` (added to every model in `models/index.js`). It throws `NotFoundError`, which [src/errors/middleware.js](src/errors/middleware.js) turns into a JSON:API 404. Sequelize `ValidationError`/`UniqueConstraintError` become 422s with `source.pointer` set to `/data/attributes/<field>`.
- Orderable resources have a `displayOrder` column, a `POST /reorder` endpoint that takes an ordered array of `{ id }`, and new records appended at max+1. See [src/routes/meat-bundle.js](src/routes/meat-bundle.js).
- List-type attributes (e.g. meat bundle `items`) are stored as `|`-delimited strings. Routes `join('|')` on write; the serializer splits on read.

**Two DB configs:** [src/config/db.ts](src/config/db.ts) is used by the running app (`import.meta.env`). [src/config/db.cjs](src/config/db.cjs) is used by sequelize-cli (`process.env` via dotenv; wired up in `.sequelizerc`). Keep the two in sync. The app prefers `VITE_DB_URL` when it is set. The environment is `production` when `import.meta.env.PROD`, otherwise `development`.

**Uploads** ([src/routes/upload.js](src/routes/upload.js), [src/utilities/file.js](src/utilities/file.js)): multipart `file` plus `generatedFileName`. Images are optimized/resized through the TinyPNG API (skipped for PDFs, `?noOptimize`, or `VITE_OPTIMIZE_IMAGES=false`) and then uploaded to S3 under `VITE_UPLOAD_DIR`.

Source is mostly plain JS with a few `.ts` files. `tsc` runs in strict mode but only for type-checking (`noEmit`).

## Conventions

- Only add comments where the code needs explaining, such as non-obvious reasons or workarounds. Don't comment on what the code plainly does.
- Use US English spelling in code, comments, commit messages, and PR descriptions (e.g. "serialize", "color", "behavior").

- Commit messages are one short imperative line with no body (e.g. `Add create/delete/reorder to meat-bundles`). Explanations go in the PR description.
- Don't add AI attribution to commits or PRs: no "Generated with Claude Code" line in PR descriptions and no `Co-Authored-By` trailer in commit messages.
