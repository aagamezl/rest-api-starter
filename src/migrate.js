import { migrate } from 'drizzle-orm/postgres-js/migrator'

import { drizzleConfig } from '../drizzle.config.js'
import { connection, db } from './data-source.js'

await migrate(db, { migrationsFolder: drizzleConfig.out })

// Don't forget to close the connection, otherwise the script will hang
await connection.end()
