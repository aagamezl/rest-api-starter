# REST API Starter

Node.js REST API Starter using best practices and patterns.

## Included Technologies

This is a list of the main technologies included in this Starter:

1. [Express](https://expressjs.com/) Fast, unopinionated, minimalist web framework for Node.js.
2. [Sequealize](https://sequelize.org/) A modern TypeScript and Node.js ORM.
3. [Postgres](https://www.postgresql.org/) the World's Most Advanced Open Source Relational Database.
4. [Docker](https://www.docker.com/) An open source containerization platform
5. [Docker Compose](https://docs.docker.com/compose/) tool for defining and running multi-container Docker applications
6. [Ava](https://github.com/avajs/ava) Test runner.
7. [Sinon](https://sinonjs.org/) Mocking library.
8. [OpenAPI](https://www.openapis.org/) Language-agnostic interface description for HTTP APIs.
9. [Best Practices](https://github.com/goldbergyoni/nodebestpractices) Node.js Best Practices.
10. [Conventional Commits](https://www.conventionalcommits.org/) A specification for adding human and machine readable meaning to commit messages
11. [Commitizen](https://commitizen-tools.github.io/commitizen/) Define a standard way of committing rules and communicating it.
12. [Husky](https://typicode.github.io/husky/) Git hooks made easy woof!.
13. [Istanbul](https://istanbul.js.org/) JavaScript test coverage made simple.
14. [Pino](https://getpino.io/) Very low overhead Node.js logger.
15. [Standard](https://standardjs.com/) JavaScript Style Guide, with linter & automatic code fixer
16. [nodemon](https://nodemon.io/) Simple monitor script for use during development
17. [joi](https://joi.dev/) Lets you describe and validate your data using a simple, intuitive, and readable language.

# Usage

The starter use docker and docker compose to run the application and the database in development.

We need to setup the enviroment variables for production or development. For production there are 3 environment variables `NODE_ENV`, `PORT` and `HOSTNAME` in the `docker-compose.yml` file; these variable have default values that you can change according to your needs:

```yaml
NODE_ENV: production
PORT: 3000
HOSTNAME: 0.0.0.0
```

For development you need to setup the `docker-compose.override.yml`, this is a development override docker compose file that define the database container and environment variable for the database and for development in general.

To run the API and database you need to use the next command in your terminal:

```shell
$ sudo docker-compose up -d
```
