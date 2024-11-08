import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  boolean,
  date,
  pgEnum
} from 'drizzle-orm/pg-core'

import { createSelectSchema } from '../../common/schema/inferSchema.js'
import { omit } from '../../common/schema/omit.js'
import { partial } from '../../common/schema/partial.js'
import { pick } from '../../common/schema/pick.js'
import { registerSchema } from '../../common/schema/registry.js'

export const userTypeEnum = pgEnum('type', ['admin', 'user'])

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  full_name: varchar('full_name', { length: 256 }),
  email: varchar('email', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  birth_date: date('birth_date').notNull(),
  phone_number: varchar('phone_number', { length: 20 }).notNull(),
  type: userTypeEnum('type').notNull(),
  is_deleted: boolean('is_deleted').notNull().default(false),
  created_at: timestamp('created_at', { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull()
})

export const UserSelectSchema = omit(createSelectSchema(users, {
  age: {
    type: 'integer',
    minimum: 0,
    maximum: 120
  },
  is_deleted: {
    default: false
  }
}), ['is_deleted'])

export const CreateUserSchema = omit(UserSelectSchema, [
  'id',
  'password',
  'is_deleted',
  'created_at',
  'updated_at'
])

const UserSchema = omit(UserSelectSchema, [
  'id',
  'password',
  'is_deleted',
  'created_at',
  'updated_at'
])

export const IdUserSchema = pick(UserSelectSchema, ['id'])
export const UpdateUserSchema = partial(CreateUserSchema)

registerSchema('users', 'User', UserSchema)
