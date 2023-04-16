import request from 'supertest'
import sinon from 'sinon'
import test from 'ava'
import { StatusCodes } from 'http-status-codes'

import { app } from '../../src/index.js'
import { model } from '../../src/domains/health/health.model.js'
import { HEALTH_CONTENT_TYPE } from '../../src/domains/health/health.controller.js'

let sandbox
let modelMock

test.beforeEach(() => {
  sandbox = sinon.createSandbox()

  modelMock = sandbox.mock(model)
})

test.afterEach(() => {
  sandbox.restore()
})

test('should create an user using endpoint', async t => {
  const expected = {
    status: 'pass',
    version: '1',
    releaseId: '1.0.0',
    notes: [
      ''
    ],
    output: '',
    serviceId: 'e8eeba98-a1d7-4add-89eb-3ac0684efe9f',
    description: 'health of api service',
    checks: {
      uptime: [
        {
          componentId: 'f5f5c845-2880-4a8d-ba38-2ef8426e6a9e',
          componentType: 'system',
          observedValue: 10986.93,
          observedUnit: 's',
          status: 'pass',
          time: '2023-04-16T15:31:29.058Z'
        }
      ],
      'cpu:utilization': [
        {
          componentId: '48c46cef-87fa-4bf5-879c-01d76f953ddc',
          componentType: 'system',
          node: 1,
          observedValue: 7,
          observedUnit: 'percent',
          status: 'warn',
          time: '2023-04-16T15:31:30.161Z'
        }
      ],
      'memory:utilization': [
        {
          componentId: '9ffe0c76-b10b-4206-909e-29334028ddb5',
          componentType: 'system',
          node: 1,
          observedValue: 13.25,
          observedUnit: 'GB',
          status: 'pass',
          time: '2023-04-16T15:31:30.162Z'
        }
      ],
      'postgres:database': [
        {
          componentId: '3ccd5ec2-927b-4baf-b036-07cf4e1d6531',
          componentType: 'datastore',
          observedValue: 105,
          observedUnit: 'ms',
          status: 'pass',
          time: '2023-04-16T15:31:30.276Z'
        }
      ]
    },
    links: {
      about: '::'
    }
  }

  modelMock
    .expects('check')
    .once()
    .resolves(expected)

  const { body, headers, status } = await request(app)
    .get('/health')

  t.is(status, StatusCodes.OK)
  t.is(headers['content-type'], HEALTH_CONTENT_TYPE)
  t.deepEqual(body, expected)
})
