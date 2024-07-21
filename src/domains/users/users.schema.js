// import { relations } from 'drizzle-orm'
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

import { registerSchema } from '../../utils/domains/schemas/schema-registry.js'

// import { BaseErrorResponse, createResponseSchema } from '../../utils/index.js'
// import { BaseByIdErrorResponse, BaseErrorResponse } from '../../utils/domains/schemas/error-schema.js'
// import createResponseSchema from '../../utils/domains/createResponseSchema.js'
// import NoContentSchema from '../../utils/domains/no-content.schema.js'

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
export const UserSelectSchema = createSelectSchema(users, {
  id: Type.String({ format: 'uuid' }),
  age: Type.Integer({
    minimum: 0
  }),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' })
})

// Schema for inserting a user - can be used to validate API requests
export const CreateUserSchema = Type.Omit(UserSelectSchema, [
  'id',
  'password',
  'createdAt',
  'updatedAt'
])

const UserSchema = Type.Omit(UserSelectSchema, ['password'])

export const IdUserSchema = Type.Pick(CreateUserSchema, ['id'])

export const UpdateUserSchema = Type.Partial(CreateUserSchema)

registerSchema('users', 'User', UserSchema)

// export const loginUserSchema = Type.Pick(createUserSchema, ['email', 'password'])
