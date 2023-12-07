import { pgTable, smallint, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core'

const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  firstname: varchar('firstname', { length: 256 }),
  lastname: varchar('lastname', { length: 256 }),
  password: varchar('password', { length: 256 }),
  email: varchar('email', { length: 256 }).notNull(),
  age: smallint('age', { length: 256 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
}, (users) => {
  return {
    emailIndex: uniqueIndex('email_idx').on(users.email)
  }
})

export default users
