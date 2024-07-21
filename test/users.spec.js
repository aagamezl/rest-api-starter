import sinon from 'sinon'
import test from 'ava'
import { StatusCodes } from 'http-status-codes'

import app from '../src/app.js'
import dataSource from '../src/data-source.js'
import drizzleStub from './stubs/drizzle.js'
import { CONTENT_TYPE } from '../src/utils/domains/constants.js'
import { isPlainObject } from '@devnetic/utils'
// import { users } from '../src/domains/schemas.js'

const id = 'a4986d92-3455-4d5e-a211-284577cd708e'
const payload = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@email.com',
  age: 34,
  password: 'abcd1234'
}
const { password, ...payloadWithPassword } = payload
const createdAt = '2023-04-12T21:55:05.045Z'
const updatedAt = '2023-04-12T21:55:05.045Z'

const user = {
  id,
  ...payloadWithPassword,
  createdAt,
  updatedAt
}

let sandbox
let dataSourceMock

test.beforeEach((t) => {
  sandbox = sinon.createSandbox()
  // t.context.getInstanceStub = sinon.stub(dataSource, 'getInstance').returns(drizzleStub)
  dataSourceMock = sandbox.mock(dataSource)
})

test.afterEach(() => {
  sinon.restore()
  sandbox.restore()
})

test.only('should create an user', async t => {
  const expected = user

  dataSourceMock.expects('getInstance').returns(drizzleStub)

  // drizzleStub.returning.resolves(expected)
  sandbox.mock(drizzleStub)
    .expects('returning')
    .resolves(user)

  const response = await app.inject({
    method: 'POST',
    url: '/users',
    payload
  })

  const responseData = response.json()

  t.is(response.statusCode, StatusCodes.CREATED)
  t.is(response.headers['content-type'], CONTENT_TYPE)
  t.is(expected.firstName, responseData.firstName)
  t.is(expected.email, responseData.email)
  t.true(responseData.password === undefined)
  t.true(responseData.createdAt !== undefined)
  t.true(responseData.updatedAt !== undefined)
})

test('should get all users', async t => {
  const expected = {
    data: [user]
  }

  dataSourceMock.expects('getInstance').returns(drizzleStub)
  drizzleStub.query.users.findMany.resolves([user])
  // sandbox.mock(drizzleStub)
  //   .expects('findMany')
  //   .resolves([user])

  const response = await app.inject({
    method: 'GET',
    url: '/users'
  })

  const responseData = response.json()

  t.is(response.statusCode, StatusCodes.OK)
  t.is(response.headers['content-type'], CONTENT_TYPE)
  t.true(isPlainObject(responseData))
  t.true(Array.isArray(responseData.data))
  t.deepEqual(responseData, expected)
  t.true(responseData.data.length > 0)
  t.true(responseData.data[0].password === undefined)
})
