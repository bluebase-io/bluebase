# Bluebase

Make Sense of your Beacons. Bluebase can aggregate data on your bluetooth low energy devices using our CLI tool or Raspberry Pi image. Easily export, visualize, dashboard and share your data.

## Getting Started

* [Setting up a Bluebase instance](https://bluebase.io/help/open-source/setup) (includes links to ready made Heroku images).
* [Documentation](https://bluebase.io/help/).

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Instructions

### Enviroment variables

GOOGLE_CLIENT_ID={{your google client id}}  
GOOGLE_CLIENT_SECRET={{your google client secret}}  
JWT_SECRET={{your jwt secret}}  
EXPIRES_IN=3600 

## Getting Help

* Issues: https://github.com/bluebase-io/bluebase/issues


## Reporting Bugs

* Want to report a bug or request a feature? Please open [an issue](https://github.com/bluebase-io/bluebase/issues/new).

## Contributing
* Want to help us build **_Bluebase_**? Fork the project, edit in a [dev environment](), and make a pull request. We need all the help we can get!
* Author: [Clayton Kucera](https://github.com/claytonkucera)

### Technologies used
A back-end server stater repository, using modern technologies, such as:
 * [Nest](https://github.com/nestjs/nest) - A progressive [Node.js](http://nodejs.org) framework for building efficient and scalable server-side applications, heavily inspired by [Angular](https://angular.io).
 * [MongoDB](https://github.com/mongodb/mongo) - a NoSQL database
 * [TypeORM](https://typeorm.io) - most mature Object Relational Mapper (ORM) available so far, provides a support for a lot of different databases such as PostgreSQL, SQLite, and even MongoDB (NoSQL)
 * [TypeScript](https://github.com/Microsoft/TypeScript) - superset of JS which compiles to JS, providing compile-time type checking
* [Passport](https://github.com/jaredhanson/passport) - a popular library used to implement JavaScript authentication
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - a JavaScript json web tokens implementation by auth0


## Security

Please email security@bluebase.io to report any security vulnerabilities. We will acknowledge receipt of your vulnerability and strive to send you regular updates about our progress. If you're curious about the status of your disclosure please feel free to email us again.

## License

BSD-2-Clause.