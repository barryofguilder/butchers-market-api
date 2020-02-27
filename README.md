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
