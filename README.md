# REST API Starter

[![Node.js CI](https://github.com/aagamezl/rest-api-starter/actions/workflows/node.js.yml/badge.svg)](https://github.com/aagamezl/rest-api-starter/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/aagamezl/rest-api-starter/badge.svg?branch=master)](https://coveralls.io/github/aagamezl/rest-api-starter?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
![GitHub issues](https://img.shields.io/github/issues-raw/aagamezl/rest-api-starter)
![GitHub](https://img.shields.io/github/license/aagamezl/rest-api-starter)

Node.js REST API Starter using best practices and patterns.

## Included Technologies

This is a list of the main technologies included in this Starter:

* [Express](https://expressjs.com/) Fast, unopinionated, minimalist web framework for Node.js.
* [Prisma](https://www.prisma.io/) Next-generation Node.js and TypeScript ORM.
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

## Prisma

This API starter use [Prisma](https://www.prisma.io/) ORM to manage the access to the database.  The first thing to do is to create the project setup, and the starter have a npm script to perform this task and any other project setup actions.

```shell
$ npm run app:setup
```

This will create a directory called prisma with a file called `schema.prisma`, and in this file is where we will define the structure of the tables that will make up the database of our API.

```prisma file=prisma/schema.prisma highlight=2
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

You now need to adjust the connection URL to point to your own database, the url is [set via an environment variable](https://www.prisma.io/docs/guides/development-environment/environment-variables).  In our development environment this url must be defined in the `docker-compose.override.yml` file and in our production environments we must define it in the server or execution environment of our API.

```yaml file=docker-compose.override.yml
environment:
  NODE_ENV: development
  DATABASE_URL: "PROVIDER://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
  TOKEN_SECRET: XXXXXXXXXXXXXXXXXXX
  EXPIRES_IN: 3600
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

## Entities

The data model definition part of the [Prisma schema](https://www.prisma.io/docs/concepts/components/prisma-schema) defines your application models (also called Prisma models). We define our entities using the schema file; the schema file is written in Prisma Schema Language (PSL). Models:

- Represent the entities of your application domain.
- Map to the tables (relational databases like PostgreSQL) or collections (MongoDB) in your database.
- Form the foundation of the queries available in the generated [Prisma Client API](https://www.prisma.io/docs/concepts/components/prisma-client).
- When used with TypeScript, Prisma Client provides generated type definitions for your models and any [variations](https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types) of them to make database access entirely type safe.

The following schema describes a `User` entity:

```prisma file=prisma/schema.prisma highlight=2
model User {
  id      String   @id @default(uuid()) @db.Uuid()
  email   String   @unique
  name    String?
  role    Role     @default(USER)
  posts   Post[]
  profile Profile?
}
```

## Migrations

Database migrations are a controlled set of changes that modify and evolve the structure of your database schema. Migrations help you transition your database schema from one state to another. For example, within a migration you can create or remove tables and columns, split fields in a table, or add types and constraints to your database.

Prisma Migrate generates [a history of .sql migration files](https://www.prisma.io/docs/concepts/components/prisma-migrate/migration-histories), and plays a role in both [development and deployment](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production).

## Running Migrations

After creating or modifying an entity, and creating the corresponding migration, it is time to run the migration to create or modify the table associated with the entity.

To run the migrations we will use the next command:

```shell
$ npm run migrate:run
```

## Reset The Development Database

You can also reset the database yourself to undo manual changes or db push experiments by running:

```shell
$ npm run migrate:reset
```

---
> **NOTE:**
> `migrate reset` is a development command and should never be used in a production environment.
---

This command:

1. Drops the database/schema¹ if possible, or performs a soft reset if the environment does not allow deleting databases/schemas¹
2. Creates a new database/schema¹ with the same name if the database/schema¹ was dropped
3. Applies all migrations
4. Runs seed scripts

> ¹ For MySQL and MongoDB this refers to the database, for PostgreSQL and SQL Server to the schema, and for SQLite to the database file.

# TODO

## Objetives

My main goal is to add support for a wider range of libraries, ORMs, and other relevant technologies.

Initially I will do this by creating separate branches for each implementation, and in the future I will create a CLI that allows the starter to be created based on the available options.

1. Add support for Fastify (other libraries like Restify?).
2. Add support for TypeScript.
3. Add support for TypeORM.
4. Add support for other `Relational Database Engines` (providing different `docker-compose.override.yml` files).
5. Add Support for `NoSQL Database Engines` (providing different `docker-compose.override.yml` files and different `ORMs`).
6. CLI to config the starter.
