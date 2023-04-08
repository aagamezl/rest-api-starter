import test from 'ava'
import sinon from 'sinon'

import * as model from '../src/domains/health/health.model.js'
import { dataSource } from '../src/data-source.js'
import { createPrismaStub } from './stubs/createStub.js'

let sandbox
let dataSourceMock

test.beforeEach(() => {
  sandbox = sinon.createSandbox()
  dataSourceMock = sandbox.mock(dataSource)
})

test.afterEach(() => {
  sandbox.restore()
})

test('should returns the server status', async t => {
  const prismaStub = createPrismaStub('user')
  dataSourceMock.expects('getInstance').once().returns(prismaStub)
  sandbox.mock(prismaStub).expects('$connect').resolves(true)

  const response = await model.check()

  t.true(typeof response === 'object')

  t.true(response.status !== undefined)
  t.true(response.version !== undefined)

  t.true(typeof response.status === 'string')
  t.true(typeof response.version === 'string')

  t.true(response.status === 'pass')
})

test('should returns the server status with database not connected', async t => {
  const prismaStub = createPrismaStub('user')
  dataSourceMock.expects('getInstance').once().returns(prismaStub)
  sandbox.mock(prismaStub).expects('$connect').rejects(new Error())

  const response = await model.check()

  t.true(typeof response === 'object')

  t.true(response.status !== undefined)
  t.true(response.version !== undefined)

  t.true(typeof response.status === 'string')
  t.true(typeof response.version === 'string')

  t.true(response.status === 'pass')
  t.true(response.checks['postgres:database'][0].status === 'error')
})
