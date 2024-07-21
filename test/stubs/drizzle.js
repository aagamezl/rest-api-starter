import sinon from 'sinon'

// const drizzleStub = {
//   insert: Sinon.stub().returnsThis(),
//   values: Sinon.stub().returnsThis(),
//   select: Sinon.stub().returnsThis(),
//   update: Sinon.stub().returnsThis(),
//   delete: Sinon.stub().returnsThis(),
//   set: Sinon.stub().returnsThis(),
//   from: Sinon.stub().returnsThis(),
//   where: Sinon.stub().returnsThis(),
//   query: Sinon.stub().returnsThis(),
//   findMany: () => {},
//   onConflictDoUpdate: Sinon.stub().returnsThis(),
//   returning: Sinon.stub(),
//   limit: Sinon.stub(),
//   offset: Sinon.stub()
// }

// const drizzleStub = {
//   insert: sinon.stub().returnsThis(),
//   values: sinon.stub().returnsThis(),
//   select: sinon.stub().returnsThis(),
//   update: sinon.stub().returnsThis(),
//   delete: sinon.stub().returnsThis(),
//   set: sinon.stub().returnsThis(),
//   from: sinon.stub().returnsThis(),
//   where: sinon.stub().returnsThis(),
//   execute: sinon.stub().returnsThis(),
//   query: { users: { findMany: sinon.stub() } },
//   returning: sinon.stub(),
//   limit: sinon.stub(),
//   offset: sinon.stub()
// }
const drizzleStub = {
  insert () { return this },
  values () { return this },
  select () { return this },
  update () { return this },
  delete () { return this },
  set () { return this },
  from () { return this },
  where () { return this },
  execute () { return this },
  findMany () { return this },
  query: { users: { findMany: sinon.stub() } },
  returning () { return this },
  limit () { return this },
  offset () { return this }
}

export default drizzleStub
