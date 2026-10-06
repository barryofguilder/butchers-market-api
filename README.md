# The Butcher's Market API

API source code for The Butcher's Market website ([http://thebutchersmarket.com](http://thebutchersmarket.com)).

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Volta](https://volta.sh/), with `VOLTA_FEATURE_PNPM=1` set so Volta manages pnpm

## Installation

- `git clone <repository-url>` this repository
- `cd butchers-market-api`
- `pnpm install`

## Configure Environment Variables

- Copy the `.env.example` file and rename it to `.env` (this file is private)

## Create Database

- `pnpm db:create`
- `pnpm db:migrate`
- `pnpm db:seed`

## Running / Development

- `pnpm dev` will start the dev server

To debug the application, you can use VS Code. Make sure you select the `dev` script.

## Running Tests

- `pnpm test` runs the test suite once
- `pnpm test:watch` reruns tests as files change

Tests use an in-memory SQLite database, so they don't need Postgres or a `.env` file.

## Deployment

Deployed using [Render](https://render.com)!

### Scripts for Production

- `pnpm install --frozen-lockfile --prod=false`
  - The `--prod=false` flag installs `devDependencies` too, which the build needs.
- `pnpm build`
  - Build the application for production.
- `pnpm db:migrate`
  - Run the database migrations.
- `pnpm start`
  - Start the application in production mode.

## Sequelize Scripts

List of common scripts you'll use with Sequelize.

### Create Model

Creates a TypeScript model and the migration for its database table. In the example below, we are
creating a `Special` model with `title` and `price` attributes.

```bash
pnpm generate:model Special title:string price:decimal
```

This runs `sequelize-cli model:generate` for the migration, then replaces the JavaScript model it
writes with `src/db/models/special.ts` in this project's style. Every attribute starts out optional;
the command prints the next steps, including marking required fields and registering the model.

A new resource also needs a serializer and a router. See "Adding a resource" in
[CLAUDE.md](CLAUDE.md) for all four steps.

### Create Migration

Creating a new migration will create the database scripts needed to change the underlying database
table.

```bash
pnpm exec sequelize-cli migration:generate --name special-link
```

### Create Seed

Once you create a new table, you'll probably want to add some seed data to it. In the example below,
we are creating a seed for the `Special` model.

```bash
pnpm exec sequelize-cli seed:generate --name special
```
