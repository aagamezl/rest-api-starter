import os from 'node:os'

import test from 'ava'
import sinon from 'sinon'

import { config } from '../../config/index.js'
import { createPrismaStub } from '../stubs/index.js'
import { dataSource } from '../../src/data-source.js'
import { model } from '../../src/domains/health/health.model.js'

let dataSourceMock
let osMock
let sandbox

test.beforeEach(() => {
  sandbox = sinon.createSandbox()

  dataSourceMock = sandbox.mock(dataSource)
  osMock = sandbox.mock(os)
})

test.afterEach(() => {
  sandbox.restore()
})

test('should returns the server status with warn on memory', async t => {
  const prismaStub = createPrismaStub()
  const totalmem = 1024

  dataSourceMock.expects('getInstance').once().returns(prismaStub)
  sandbox.mock(prismaStub).expects('$connect').resolves(true)
  osMock.expects('freemem').once().returns(Math.pow(totalmem, 2))
  osMock.expects('totalmem').once().returns(totalmem)

  const healthConfig = {
    health: config.health,
    server: {
      hostname: config.server.hostname,
      version: config.server.version
    }
  }

  const response = await model.check(healthConfig)

  t.true(typeof response === 'object')

  t.true(response.status !== undefined)
  t.true(response.version !== undefined)

  t.is(typeof response.status, 'string')
  t.is(typeof response.version, 'string')

  t.is(response.status, 'pass')
  t.is(response.checks['memory:utilization'][0].status, 'warn')
})

test('should returns the server status with pass on memory', async t => {
  const prismaStub = createPrismaStub()
  const totalmem = 1024

  dataSourceMock.expects('getInstance').once().returns(prismaStub)
  sandbox.mock(prismaStub).expects('$connect').resolves(true)
  osMock.expects('freemem').once().returns(Math.pow(totalmem, 2))
  osMock.expects('totalmem').once().returns(Math.pow(totalmem, 4))

  const healthConfig = {
    health: config.health,
    server: {
      hostname: config.server.hostname,
      version: config.server.version
    }
  }

  const response = await model.check(healthConfig)

  t.true(typeof response === 'object')

  t.true(response.status !== undefined)
  t.true(response.version !== undefined)

  t.is(typeof response.status, 'string')
  t.is(typeof response.version, 'string')

  t.is(response.status, 'pass')
  t.is(response.checks['memory:utilization'][0].status, 'pass')
})
