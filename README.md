# The Butcher's Market API

API source code for The Butcher's Market website ([http://thebutchersmarket.com](http://thebutchersmarket.com)).

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Volta](https://volta.sh/)
- [Google Chrome](https://google.com/chrome/)

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

- `npm start`
- `npm run start:dev` will auto restart when files change
- `npm run start:debug` will run in debugger mode
  - In Chrome, navigate to `chrome://inspect`
  - Click on the "Inspect" link to launch the debugger window

## Deployment

Deployed using [Render](https://render.com)!

## Sequelize Scripts

List of common scripts you'll use with Sequelize.

### Create Model

Creating a new model will create a new database table and a corresponding model. In the example
below, we are creating a `Special` model with a single attribute of `title`.

```bash
sequelize-esm model:generate --name Special --attributes title:string
```

### Create Migration

Creating a new migration will create the database scripts needed to change the underlying database
table.

```bash
sequelize-esm migration:generate --name special-link
```

### Create Seed

Once you create a new table, you'll probably want to add some seed data to it. In the example below,
we are creating a seed for the `Special` model.

```bash
sequelize-esm seed:generate --name special
```
