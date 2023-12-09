import { relations } from 'drizzle-orm'
import { boolean, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'
import { Type } from '@sinclair/typebox'

import { users } from '../schemas.js'

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  title: varchar('title', { length: 256 }).notNull(),
  content: varchar('content', { length: 256 }).notNull(),
  published: boolean('published').default(false).notNull(),
  author_id: uuid('author_id').notNull().references(() => users.id),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
})

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.author_id],
    references: [users.id]
  })
}))

// Schema for inserting a user - can be used to validate API requests
const insertSchema = createInsertSchema(posts)

export const idPostSchema = Type.Pick(insertSchema, ['id'])

export const insertPostSchema = (Type.Omit(insertSchema, ['id', 'created_at', 'updated_at']))

export const updatePostSchema = Type.Partial(insertPostSchema)

// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(posts)
