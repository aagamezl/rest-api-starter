import {
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar
} from 'drizzle-orm/pg-core'

const authToken = pgTable('auth_token', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  token: varchar('token', { length: 256 }).notNull(),
  created_at: timestamp('created_at').defaultNow()
}, (authToken) => {
  return {
    tokenIndex: uniqueIndex('token_idx').on(authToken.token)
  }
})

export default authToken
