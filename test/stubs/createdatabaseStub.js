import * as schema from './../../src/domains/schemas.js'

const createDatabaseStub = () => {
  const schemas = Object.keys(schema).reduce((stub, name) => {
    stub[name] = {
      delete: () => { },
      query: () => { },
      insert: () => ({
        values: () => ({
          returning: () => { }
        })
      }),
      select: () => { },
      update: () => { }
    }

    return stub
  }, {})

  const stub = {
    // $connect: () => { },
    // $disconnect: () => { },
    // $transaction: () => { },
    ...schemas
  }

  return stub
}

export default createDatabaseStub
