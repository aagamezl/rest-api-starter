import { relations } from 'drizzle-orm'
import { pgTable, smallint, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'
import { Type } from '@sinclair/typebox'

import { posts } from '../schemas.js'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  firstname: varchar('firstname', { length: 256 }).notNull(),
  lastname: varchar('lastname', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  age: smallint('age'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
}, (users) => {
  return {
    emailIndex: uniqueIndex('email_idx').on(users.email)
  }
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts)
}))

// Schema for inserting a user - can be used to validate API requests
const insertSchema = createInsertSchema(users, {
  id: () => Type.String({ format: 'uuid' }),
  email: () => Type.String({ format: 'email' })
})

export const idUserSchema = Type.Pick(insertSchema, ['id'])
// console.log(idUserSchema)

export const insertUserSchema = (Type.Omit(insertSchema, ['id', 'created_at', 'updated_at']))
// console.log(JSON.stringify(insertUserSchema, null, 2))

export const updateUserSchema = Type.Partial(insertUserSchema)
// console.log(updateUserSchema)

// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(users)

export const loginUser = Type.Pick(insertSchema, ['email', 'password'])
// console.log(loginUser)
