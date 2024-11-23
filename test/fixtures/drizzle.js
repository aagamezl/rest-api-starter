import sinon from 'sinon'

import * as schema from '../../src/domains/schemas.js'

const query = Object.keys(schema).reduce((queries, entity) => {
  // queries[entity] = { findMany: sinon.stub() }
  queries[entity] = { findMany: () => { } }

  return queries
}, {})

export const createDrizzleFixture = () => ({
  // delete: sinon.stub().returnsThis(),
  delete: () => { },
  from: sinon.stub().returnsThis(),
  // insert: sinon.stub().returnsThis(),
  insert: () => { },
  limit: sinon.stub(),
  offset: sinon.stub(),
  query,
  returning: () => { },
  select: sinon.stub().returnsThis(),
  set: sinon.stub().returnsThis(),
  // update: sinon.stub().returnsThis(),
  update: () => { },
  values: sinon.stub().returnsThis(),
  where: () => { }
})
