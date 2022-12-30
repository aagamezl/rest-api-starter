# REST API Starter

Node.js REST API Starter using best practices and patterns.

## Included Technologies

This is a list of the main technologies included in this Starter:

* [Express](https://expressjs.com/) Fast, unopinionated, minimalist web framework for Node.js.
* [Sequealize](https://sequelize.org/) A modern TypeScript and Node.js ORM.
* [Postgres](https://www.postgresql.org/) the World's Most Advanced Open Source Relational Database.
* [Docker](https://www.docker.com/) An open source containerization platform
* [Docker Compose](https://docs.docker.com/compose/) tool for defining and running multi-container Docker applications
* [Ava](https://github.com/avajs/ava) Test runner.
* [Sinon](https://sinonjs.org/) Mocking library.
* [JSON Web Token](https://www.rfc-editor.org/rfc/rfc7519) is a compact, URL-safe means of representing claims to be transferred between two parties.
* [OpenAPI](https://www.openapis.org/) Language-agnostic interface description for HTTP APIs.
* [Best Practices](https://github.com/goldbergyoni/nodebestpractices) Node.js Best Practices.
* [Conventional Commits](https://www.conventionalcommits.org/) A specification for adding human and machine readable meaning to commit messages.
* [Commitizen](https://commitizen-tools.github.io/commitizen/) Define a standard way of committing rules and communicating it.
* [Husky](https://typicode.github.io/husky/) Git hooks made easy woof!.
* [Istanbul](https://istanbul.js.org/) JavaScript test coverage made simple.
* [Pino](https://getpino.io/) Very low overhead Node.js logger.
* [Standard](https://standardjs.com/) JavaScript Style Guide, with linter & automatic code fixer.
* [nodemon](https://nodemon.io/) Simple monitor script for use during development.
* [Joi](https://joi.dev/) Lets you describe and validate your data using a simple, intuitive, and readable language.
* [Thunder Client](https://www.thunderclient.com/) Lightweight Rest API Client for VS Code.

# Usage

The starter use docker and docker compose to run the application and the database in development.

We need to setup the enviroment variables for production or development. For production there are 3 environment variables `NODE_ENV`, `PORT` and `HOSTNAME` in the `docker-compose.yml` file; these variable have default values that you can change according to your needs:

```yaml
NODE_ENV: production  # Node.js environment
PORT: 3000            # API running port
HOSTNAME: 0.0.0.0     # API hostname
```

For development you need to setup the `docker-compose.override.yml`, this is a development override docker compose file that define the database container and environment variable for the database and for development in general.

`docker-compose.override.yml` file is ignored in the repo, because although it is a file destined for the development environment, it can leak some sensitive information if it is sent to the remote repository.

In the code you will find a `docker-compose.override.yml.dist` file, you should rename this file to `docker-compose.override.yml` (remove the `.dist` at the end of the name) and modify the environment variables that this file defines, as these will be used to configure the database inside the database container and to make the connection to the database from the API container.

## Database Container Variables

```yaml
POSTGRES_DB: rest-api-starter           # Database name
POSTGRES_USER: rest-api-starter         # Database username
POSTGRES_PASSWORD: ujt9ack5gbn_TGD4mje  # Database password
```

## API Container Variables

```yaml
NODE_ENV: development                   # Node.js environment

DATABASE_TYPE: postgres                 # Database engine
DATABASE_HOST: postgres                 # Database hostname
DATABASE_PORT: 5432                     # Database port
DATABASE_NAME: rest-api-starter         # Database name
DATABASE_USERNAME: rest-api-starter     # Database username
DATABASE_PASSWORD: ujt9ack5gbn_TGD4mje  # Database password

TOKEN_SECRET: ERN7kna-hqa2xdu4bva       # Secret for JWT token generation
EXPIRES_IN: 3600 # 1 hour               # JWT token expiration time
```

To run the API and database you need to use the next command in your terminal:

```shell
$ sudo docker-compose up -d
```

# Database Configuration And Administration

## Sequelize

To create the necessary Sequelize database structure we need to setup our 
environment using the `.sequelizerc` sequelize configuration file. Below you 
can see default configuration that this starter provide:

```js
const path = require('node:path')

module.exports = {
  'config': path.resolve('config', 'index.js'),
  'models-path': path.resolve('src', 'domains', '**/*.model.js'),
  'seeders-path': path.resolve('database', 'seeders'),
  'migrations-path': path.resolve('database', 'migrations')
}
```

Not we need to initialize the Sequelize structure with the next command:

```shell
$ npx sequelize-cli init
```

# TODO

## Objetives

My main goal is to add support for a wider range of libraries, ORMs, and other relevant technologies.

Initially I will do this by creating separate branches for each implementation, and in the future I will create a CLI that allows the starter to be created based on the available options.

1. Add support for Fastify (other libraries like Restify?).
2. Add support for TypeScript.
3. Add support for Prisma.
4. Add support for TypeORM.
5. Add support for other Relational Database Engines.
6. Add Support for NoSQL Database Engines.
7. CLI to config the starter.
