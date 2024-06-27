// import { relations } from 'drizzle-orm'
import { ReasonPhrases } from 'http-status-codes'
import { Type } from '@sinclair/typebox'
import { createSelectSchema } from 'drizzle-typebox'
import {
  pgTable,
  smallint,
  timestamp,
  uniqueIndex,
  uuid,
  varchar
} from 'drizzle-orm/pg-core'

// import { BaseErrorResponse, createResponseSchema } from '../../utils/index.js'
import { BaseByIdErrorResponse, BaseErrorResponse } from '../../utils/domains/error.schema.js'
import createResponseSchema from '../../utils/domains/createResponseSchema.js'
import NoContentSchema from '../../utils/domains/no-content.schema.js'

// import { posts } from '../schemas.js'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  firstName: varchar('firstName', { length: 256 }).notNull(),
  lastName: varchar('lastName', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  age: smallint('age').notNull(),
  createdAt: timestamp('createdAt', { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull()
}, (users) => {
  return {
    emailIndex: uniqueIndex('email_idx').on(users.email)
  }
})

// export const usersRelations = relations(users, ({ many }) => ({
//   posts: many(posts)
// }))

// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(users, {
  id: Type.String({ format: 'uuid' }),
  age: Type.Integer({
    minimum: 0
  }),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' })
})

// Schema for inserting a user - can be used to validate API requests
export const createUserSchema = Type.Omit(selectUserSchema, [
  'id',
  'createdAt',
  'updatedAt'
])

export const idUserSchema = Type.Pick(createUserSchema, ['id'])

// export const createUserSchema = Type.Omit(insertSchema, [
//   'id',
//   'createdAt',
//   'updatedAt'
// ])

export const updateUserSchema = Type.Partial(createUserSchema)

export const loginUserSchema = Type.Pick(createUserSchema, ['email', 'password'])

export const usersCreateResponseSchema = {
  201: createResponseSchema(createUserSchema, ReasonPhrases.CREATED),
  ...BaseErrorResponse
}

export const usersDeleteResponseSchema = {
  204: NoContentSchema,
  ...BaseByIdErrorResponse
}

export const usersGetAllResponseSchema = {
  200: createResponseSchema(
    Type.Array(selectUserSchema),
    ReasonPhrases.OK
  ),
  ...BaseErrorResponse
}

export const usersGetByIdResponseSchema = {
  200: createResponseSchema(selectUserSchema, ReasonPhrases.OK),
  ...BaseByIdErrorResponse
}
