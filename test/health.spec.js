import test from 'ava'
import sinon from 'sinon'

import * as model from '../src/domains/health/health.model.js'
import { dataSource } from '../src/data-source.js'

let sandbox
let sequelizeMock

const dataSourceStub = {
  authenticate: () => Promise.resolve(true),
  close: () => Promise.resolve(true)
}

test.beforeEach(() => {
  sandbox = sinon.createSandbox()
  sequelizeMock = sandbox.mock(dataSource)
})

test.afterEach(() => {
  sandbox.restore()
})

test('should returns the server status', async t => {
  sequelizeMock.expects('getInstance').once().returns(dataSourceStub)

  const response = await model.check()

  t.true(typeof response === 'object')

  t.true(response.status !== undefined)
  t.true(response.version !== undefined)

  t.true(typeof response.status === 'string')
  t.true(typeof response.version === 'string')

  t.true(response.status === 'pass')
})
