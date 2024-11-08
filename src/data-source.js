import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './domains/schemas.js'

/** @typedef {Promise<Record<string, unknown>>} SingleResponse */
/** @typedef {UnwrapPromise<SingleResponse>[]} GetAllResponse */

export const connection = postgres(process.env.DATABASE_URL)

export const db = drizzle(connection, { schema })

export const dataSource = {
  getConnection: () => {
    return connection
  },
  getInstance: () => {
    return db
  }
}
