/**
 * @typedef {import('./utils/index.js').Query} Query
 */
/**
 * @typedef {Object.<string, unknown>} Palyload
 */
/**
 * Represent the Request Data for an JSON API URL
 *
 * @typedef FindAndCountAll
 * @type {object}
 * @property {number} count                   - Indicates the total amount of record for the resource.
 * @property {Object.<string, unknown>[]} items - Indicates items returned according the the request data.
 */
/**
 * A set of methods for interacting with a database.
 *
 * @typedef {Object} DatabaseManager
 * @property {(payload: Palyload) => Promise.<Object.<string, unknown>>} create - Creates a new record in the database for the given model name and payload.
 * @property {(query: Query) => Promise.<Object.<string, unknown>>} delete - Deletes a record from the database with the given id and model name.
 * @property {(query: Query) => Promise.<Object.<string, unknown>>} findAll - Finds all records from the database for the given model name and query.
 * @property {(query: Query) => Promise.<FindAndCountAll>} findAndCountAll - Finds and counts all records from the database for the given model name and query.
 * @property {(query: Query) => Promise.<Object.<string, unknown>>} findOne - Finds a single record from the database for the given model name and query.
 * @property {(query: Query) => Promise.<Object.<string, unknown>>} findUnique - Finds a unique record from the database for the given model name and query.
 * @property {(id: string, payload: Palyload) => Promise.<Object.<string, unknown>>} update - Updates a record in the database with the given id and payload for the given model name.
 */
/**
 * Datasource abstraction to interact with the database using an ORM.
 *
 * @typedef {Object} DataSource
 * @property {() => PrismaClient} getInstance - Returns a new instance of Prisma Client
 * @property {(modelName: string) => DatabaseManager} manager - Returns a new database manager
 */
/**
 * @type {DataSource}
 */
export const dataSource: DataSource;
export type Query = import('./utils/index.js').Query;
export type Palyload = {
    [x: string]: unknown;
};
/**
 * Represent the Request Data for an JSON API URL
 */
export type FindAndCountAll = {
    /**
     * - Indicates the total amount of record for the resource.
     */
    count: number;
    /**
     * - Indicates items returned according the the request data.
     */
    items: {
        [x: string]: unknown;
    }[];
};
/**
 * A set of methods for interacting with a database.
 */
export type DatabaseManager = {
    /**
     * - Creates a new record in the database for the given model name and payload.
     */
    create: (payload: Palyload) => Promise<{
        [x: string]: unknown;
    }>;
    /**
     * - Deletes a record from the database with the given id and model name.
     */
    delete: (query: Query) => Promise<{
        [x: string]: unknown;
    }>;
    /**
     * - Finds all records from the database for the given model name and query.
     */
    findAll: (query: Query) => Promise<{
        [x: string]: unknown;
    }>;
    /**
     * - Finds and counts all records from the database for the given model name and query.
     */
    findAndCountAll: (query: Query) => Promise<FindAndCountAll>;
    /**
     * - Finds a single record from the database for the given model name and query.
     */
    findOne: (query: Query) => Promise<{
        [x: string]: unknown;
    }>;
    /**
     * - Finds a unique record from the database for the given model name and query.
     */
    findUnique: (query: Query) => Promise<{
        [x: string]: unknown;
    }>;
    /**
     * - Updates a record in the database with the given id and payload for the given model name.
     */
    update: (id: string, payload: Palyload) => Promise<{
        [x: string]: unknown;
    }>;
};
/**
 * Datasource abstraction to interact with the database using an ORM.
 */
export type DataSource = {
    /**
     * - Returns a new instance of Prisma Client
     */
    getInstance: () => PrismaClient;
    /**
     * - Returns a new database manager
     */
    manager: (modelName: string) => DatabaseManager;
};
import { PrismaClient } from ".prisma/client";
