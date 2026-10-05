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

Generating a model creates the migration for a new database table. In the example below, we are
creating a `Special` model with a single attribute of `title`.

```bash
npx sequelize-cli model:generate --name Special --attributes title:string
```

The generator also writes a JavaScript model file (`src/db/models/special.js`), but it doesn't
match how models are written in this project. Delete it, then:

1. Create `src/db/models/special.ts` by copying an existing model such as
   [deli-item.ts](src/db/models/deli-item.ts). Models are TypeScript classes that extend `AppModel`.
2. Register it in [src/db/models/index.ts](src/db/models/index.ts).

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
