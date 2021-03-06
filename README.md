# The Butcher's Market API

API source code for The Butcher's Market website ([http://thebutchersmarket.com](http://thebutchersmarket.com)).

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd butchers-market-api`
* `yarn`

## Configure Environment Variables

* Copy the `.env.example` file and rename it to `.env` (this file is private)

## Create Database

* `yarn db:migrate`
* `yarn db:seed`

## Running / Development

* `yarn start`
* `yarn start:dev` will auto restart when files change
* `yarn start:debug` will run in debugger mode
  * In Chrome, navigate to `chrome://inspect`
  * Click on the "Inspect" link to launch the debugger window

## Deployment

Copy all files that have changed, even the `package.json` file.

```bash
npm install --production
NODE_ENVIRONMENT=production DB_STORAGE=../db/butcher.sqlite3 sequelize-esm db:migrate
NODE_ENVIRONMENT=production DB_STORAGE=../db/butcher.sqlite3 sequelize-esm db:seed --seed <name>
pm2 list
pm2 stop <name>
pm2 start ecosystem.config.js --env production
```

When running the Sequelize scripts on production, you must prefix all the commands with:

```bash
NODE_ENVIRONMENT=production DB_STORAGE=../db/butcher.sqlite3
```

If you need to undo a database seed, run:

```bash
NODE_ENVIRONMENT=production DB_STORAGE=../db/butcher.sqlite3 sequelize-esm db:seed:undo --seed <name>
```

If you need to restore the most recent database backup, delete the existing database and then run:

```bash
sqlite3 ~/public_html/db/butcher.sqlite3 < ~/public_html/db_backups/backup_file_name.bak 
```

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
