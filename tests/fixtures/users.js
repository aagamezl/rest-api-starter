import { createdAt, id, updatedAt } from './common.js'

export const base = {
  first_name: 'Jane',
  last_name: 'Doe',
  email: 'jane@email.com',
  birth_date: '1980/02/01',
  phone_number: '+1 2345678901',
  type: 'user'
}

export const payload = {
  ...base,
  password: '12345678'
}

export const user = {
  id,
  ...base,
  created_at: createdAt,
  updated_at: updatedAt
}
