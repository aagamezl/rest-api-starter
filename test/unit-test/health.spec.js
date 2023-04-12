import os from 'node:os'

import test from 'ava'
import sinon from 'sinon'

import * as model from '../../src/domains/health/health.model.js'
import { dataSource } from '../../src/data-source.js'
import { createPrismaStub } from '../stubs/index.js'

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

  const totalmem = 1024
  sandbox.mock(os).expects('totalmem').once().returns(totalmem)

  const response = await model.check()

  t.true(typeof response === 'object')

  t.true(response.status !== undefined)
  t.true(response.version !== undefined)

  t.is(typeof response.status, 'string')
  t.is(typeof response.version, 'string')

  t.is(response.status, 'pass')
  t.is(response.checks['memory:utilization'][0].status, 'warn')
})

test('should returns the server status with database not connected', async t => {
  const prismaStub = createPrismaStub('user')
  dataSourceMock.expects('getInstance').once().returns(prismaStub)
  sandbox.mock(prismaStub).expects('$connect').rejects(new Error())

  const response = await model.check()

  t.true(typeof response === 'object')

  t.true(response.status !== undefined)
  t.true(response.version !== undefined)

  t.is(typeof response.status, 'string')
  t.is(typeof response.version, 'string')

  t.is(response.status, 'pass')
  t.is(response.checks['postgres:database'][0].status, 'error')
})
