# REST API Starter

[![Node.js CI](https://github.com/aagamezl/rest-api-starter/actions/workflows/node.js.yml/badge.svg)](https://github.com/aagamezl/rest-api-starter/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/aagamezl/rest-api-starter/badge.svg?branch=master)](https://coveralls.io/github/aagamezl/rest-api-starter?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
![GitHub issues](https://img.shields.io/github/issues-raw/aagamezl/rest-api-starter)
![GitHub](https://img.shields.io/github/license/aagamezl/rest-api-starter)

Node.js REST API Starter using best practices and patterns.

## Included Technologies

This is a list of the main technologies included in this Starter:

* [Fastify](https://fastify.dev/) Fast and low overhead web framework, for Node.js.
* [Drizzle ORM](https://orm.drizzle.team/) Drizzle ORM is a headless TypeScript ORM with a head.
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
* [c8](https://github.com/bcoe/c8) Code-coverage using [Node.js' built in functionality](https://nodejs.org/dist/latest-v10.x/docs/api/cli.html#cli_node_v8_coverage_dir) that's compatible with [Istanbul's reporters](https://istanbul.js.org/docs/advanced/alternative-reporters/).
* [Standard](https://standardjs.com/) JavaScript Style Guide, with linter & automatic code fixer.
* [JSON Schema](https://joi.dev/) JSON Schema is a vocabulary to annotate and validate JSON documents.

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
POSTGRES_DB: rest-api                   # Database name
POSTGRES_USER: rest-api                 # Database username
POSTGRES_PASSWORD: ujt9ack5gbn_TGD4mje  # Database password
```

## API Container Variables

```yaml
NODE_ENV: development | production                                         # Node.js environment
DATABASE_URL: "PROVIDER://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"  # Database URL
TOKEN_SECRET: XXXXXXXXXXXXXXXXXXX                                          # Secret for JWT token generation
EXPIRES_IN: 3600                                                           # JWT token expiration time

```

To run the API and database you need to use the next command in your terminal:

```shell
$ sudo docker-compose up -d
```

To connect to the a container, run the next command:

```shell
$ sudo docker exec -it rest-api sh
```

# Database Configuration And Administration

## Entities

## Migrations

Database migrations are a controlled set of changes that modify and evolve the structure of your database schema. Migrations help you transition your database schema from one state to another. For example, within a migration you can create or remove tables and columns, split fields in a table, or add types and constraints to your database.

## Generating Migrations

After creating or modifying an entity, it is time to generate the corresponding migration; the project has a script to execute this task:

```shell
npm run migrate:generate
or
sudo docker exec -it rest-api npm run migrate:generate
```

## Running Migrations

After creating the corresponding migration, it is time to run the migration to create or modify the table associated with the entity.

To run the migrations we will use the next command:

```shell
$ npm run migrate:run
or
sudo docker exec -it rest-api npm run migrate:run
```
