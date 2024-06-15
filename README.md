# REST API Starter

![Node CI](https://github.com/aagamezl/rest-api-starter/workflows/Node%20CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/aagamezl/rest-api-starter/badge.svg?branch=master)](https://coveralls.io/github/aagamezl/rest-api-starter?branch=master)
![GitHub issues](https://img.shields.io/github/issues-raw/aagamezl/rest-api-starter)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![GitHub](https://img.shields.io/github/license/aagamezl/rest-api-starter)
![GitHub contributors](https://img.shields.io/github/contributors/aagamezl/rest-api-starter)
![Twitter Follow](https://img.shields.io/twitter/follow/aagamezl)

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
* [Pino](https://getpino.io/) Very low overhead Node.js logger.
* [Standard](https://standardjs.com/) JavaScript Style Guide, with linter & automatic code fixer.
* [Zod](https://zod.dev/) Zod is a TypeScript-first schema declaration and validation library.
* [Thunder Client](https://www.thunderclient.com/) Lightweight Rest API Client for VS Code.

# Usage

The starter use docker and docker compose to run the application and the database in development.

We need to setup the environment variables for production or development. For production there are 3 environment variables `NODE_ENV`, `PORT` and `HOSTNAME` in the `docker-compose.yml` file; these variable have default values that you can change according to your needs:

```yaml
NODE_ENV: production  # Node.js environment
PORT: 3000            # API running port
HOSTNAME: 0.0.0.0     # API hostname
```

For development you need to configure `docker-compose.override.yml`, this overrides the `docker-compose.yml` file and defines the database container and environment variables for the database and for development in general.

The `docker-compose.override.yml` file is ignored in the repository because, although it is a file intended for the development environment, it can leak sensitive information if pushed to the remote repository.

In the code you will find a `docker-compose.override.yml.dist` file, you should rename this file to `docker-compose.override.yml` (remove the `.dist` at the end of the name) and modify the environment variables that this file defines, as these will be used to configure the database inside the database container and to make the connection to the database from the API container.

## Database Container Variables

```yaml
POSTGRES_DB: rest-api-starter              # Database name
POSTGRES_USER: rest-api-starter            # Database username
POSTGRES_PASSWORD: *******************     # Database password
```

## API Container Variables

```yaml
NODE_ENV: development|production           # Node.js environment
PORT: 3000                                 # Database hostname
HOSTNAME: localhost                        # Database engine

TOKEN_SECRET: *******************          # Secret for JWT token generation
REFRESH_TOKEN_SECRET: *******************  # Secret for JWT token generation
EXPIRES_IN: 3600                           # JWT token expiration time
```

To run the API and database you need to use the next command in your terminal:

```shell
$ sudo docker-compose up -d
```

# Database Configuration And Administration

## Drizzle

This API starter use [Drizzle ORM](https://orm.drizzle.team/) is a headless TypeScript ORM with a head. It looks and feels simple, performs on day 1000 of your project, lets you do things your way, and is there when you need it.

It’s the only ORM with both relational and SQL-like query APIs, providing you best of both worlds when it comes to accessing your relational data.

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

The [format of the connection URL](https://www.prisma.io/docs/reference/database-reference/connection-urls) for your database depends on the database you use. For PostgreSQL, it looks as follows (the parts spelled all-uppercased are _placeholders_ for your specific connection details):

```no-lines
PROVIDER://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

Here's a short explanation of each component:

- `USER`: The name of your database user
- `PASSWORD`: The password for your database user
- `HOST`: The name of your host name (for the local environment, it is `localhost`)
- `PORT`: The port where your database server is running (typically `5432` for PostgreSQL)
- `DATABASE`: The name of the [database](https://www.postgresql.org/docs/12/manage-ag-overview.html)
- `SCHEMA`: The name of the [schema](https://www.postgresql.org/docs/12/ddl-schemas.html) inside the database

## Schemas / Entities

Drizzle ORM provides you with an API to declare SQL tables, in this starter each domain must contain the corresponding schema declaring the table for the domain.

If you declare an entity within a schema, query builder will prepend schema names in queries:

The following schema describes a `User` entity:

```javascript
import {
 integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar
} from 'drizzle-orm/pg-core'

// declaring enum in database
export const popularityEnum = pgEnum('popularity', ['unknown', 'known', 'popular'])

export const countries = pgTable('countries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
}, (countries) => {
  return {
    nameIndex: uniqueIndex('name_idx').on(countries.name),
  }
})
```

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

# TODO

## Objetives

My main goal is to add support for a wider range of libraries, ORMs, and other relevant technologies.

Initially I will do this by creating separate branches for each implementation, and in the future I will create a CLI that allows the starter to be created based on the available options.

1. Add support for other `Relational Database Engines` (providing different `docker-compose.override.yml` files).
2. Add Support for `NoSQL Database Engines` (providing different `docker-compose.override.yml` files and different `ORMs`).
3. CLI to config the starter and generate code.
