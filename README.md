# The Butcher's Market API

API source code for The Butcher's Market website ([http://thebutchersmarket.com](http://thebutchersmarket.com)).

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Volta](https://volta.sh/)

## Installation

- `git clone <repository-url>` this repository
- `cd butchers-market-api`
- `npm install`

## Configure Environment Variables

- Copy the `.env.example` file and rename it to `.env` (this file is private)

## Create Database

- `npm run db:create`
- `npm run db:migrate`
- `npm run db:seed`

## Running / Development

- `npm run dev` will start the dev server

To debug the application, you can use VS Code. Make sure you select the `dev` script.

## Running Tests

- `npm test` runs the test suite once
- `npm run test:watch` reruns tests as files change

Tests use an in-memory SQLite database, so they don't need Postgres or a `.env` file.

## Deployment

Deployed using [Render](https://render.com)!

### Scripts for Production

- `npm ci --include=dev`
  - The `--include=dev` flag is used to include the `devDependencies` in the `node_modules` folder.
- `npm run build`
  - Build the application for production.
- `npm run db:migrate`
  - Run the database migrations.
- `npm start`
  - Start the application in production mode.

## Sequelize Scripts

List of common scripts you'll use with Sequelize.

### Create Model

Creates a TypeScript model and the migration for its database table. In the example below, we are
creating a `Special` model with `title` and `price` attributes.

```bash
npm run generate:model -- Special title:string price:decimal
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
npx sequelize-cli migration:generate --name special-link
```

### Create Seed

Once you create a new table, you'll probably want to add some seed data to it. In the example below,
we are creating a seed for the `Special` model.

```bash
npx sequelize-cli seed:generate --name special
```
