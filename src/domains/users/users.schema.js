import {
  pgTable,
  timestamp,
  uuid,
  varchar,
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
  first_name: varchar('first_name', { length: 256 }).notNull(),
  last_name: varchar('last_name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  birth_date: date('birth_date').notNull(),
  phone_number: varchar('phone_number', { length: 20 }).notNull(),
  type: userTypeEnum('type').notNull(),
  created_at: timestamp('created_at', { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
  deleted_at: timestamp('deleted_at', { precision: 6, withTimezone: true })
})

export const UserSelectSchema = omit(
  createSelectSchema(users),
  ['password', 'deleted_at']
)

export const CreateUserSchema = omit(UserSelectSchema, [
  'id',
  'created_at',
  'updated_at',
  'deleted_at'
])

const UserSchema = omit(UserSelectSchema, [
  'id',
  'password',
  'created_at',
  'updated_at',
  'deleted_at'
])

export const IdUserSchema = pick(UserSelectSchema, ['id'])
export const UpdateUserSchema = partial(CreateUserSchema)

registerSchema('users', 'User', UserSchema)
