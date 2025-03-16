import { jest } from '@jest/globals'

import { getSchemas } from '../../src/common/index.js'

const query = Object.keys(getSchemas()).reduce((queries, entity) => {
  // queries[entity] = { findMany: sinon.stub() }
  queries[entity] = { findFirst: () => { }, findMany: () => { } }

  return queries
}, {})

export const drizzle = () => ({
  count: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  // findMany: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  limit: jest.fn(),
  offset: jest.fn(),
  onConflictDoUpdate: jest.fn().mockReturnThis(),
  query,
  returning: jest.fn(),
  select: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis()
})
