import test from 'ava'
import { StatusCodes } from 'http-status-codes'
import { isPlainObject } from '@devnetic/utils'

import { app } from '../src/app.js'
import { dataSource } from '../src/data-source.js'
import { mock } from './helpers/mock.js'
import { createDrizzleFixture } from './fixtures/drizzle.js'
import { CONTENT_TYPE, PROBLEM_CONTENT_TYPE } from '../src/utils/domains/constants.js'

const id = 'a4986d92-3455-4d5e-a211-284577cd708e'
const payload = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@email.com',
  age: 34,
  password: 'abcd1234'
}
const { password, ...payloadWithoutPassword } = payload
const createdAt = '2023-04-12T21:55:05.045Z'
const updatedAt = '2023-04-12T21:55:05.045Z'

const user = {
  id,
  ...payloadWithoutPassword,
  createdAt,
  updatedAt
}

test.serial('should create an user', async t => {
  const { createMock, verifyMock } = mock()
  const expected = user

  const drizzleStub = createDrizzleFixture()
  const drizzleMock = createMock(drizzleStub)
  const instanceMock = createMock(dataSource.getInstance())

  instanceMock.expects('insert').returns(drizzleStub)
  drizzleMock.expects('returning').resolves(expected)

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

  t.teardown(() => {
    verifyMock()
  })
})

test.serial('should throw internal server error when creating an user', async t => {
  const { createMock, verifyMock } = mock()

  const drizzleStub = createDrizzleFixture()
  const drizzleMock = createMock(drizzleStub)
  const instanceMock = createMock(dataSource.getInstance())

  instanceMock.expects('insert').returns(drizzleStub)
  drizzleMock.expects('returning').rejects()

  const response = await app.inject({
    method: 'POST',
    url: '/users',
    payload
  })

  t.is(response.statusCode, StatusCodes.INTERNAL_SERVER_ERROR)
  t.is(response.headers['content-type'], PROBLEM_CONTENT_TYPE)

  t.teardown(() => {
    verifyMock()
  })
})

test.serial('should throw payload error when creating an user', async t => {
  // const { createMock, verifyMock } = mock()

  // const drizzleStub = createDrizzleFixture()
  // const drizzleMock = createMock(drizzleStub)
  // const instanceMock = createMock(dataSource.getInstance())

  // instanceMock.expects('insert').returns(drizzleStub)
  // drizzleMock.expects('returning').rejects()

  const response = await app.inject({
    method: 'POST',
    url: '/users'
  })

  t.is(response.statusCode, StatusCodes.BAD_REQUEST)
  t.is(response.headers['content-type'], PROBLEM_CONTENT_TYPE)

  // t.teardown(() => {
  //   verifyMock()
  // })
})

test.serial('should patch an user', async t => {
  const { createMock, verifyMock } = mock()

  const patchPayload = {
    firstName: 'Susan'
  }
  const expected = {
    id,
    ...payloadWithoutPassword,
    ...patchPayload,
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString()
  }

  const drizzleStub = createDrizzleFixture()
  const drizzleMock = createMock(drizzleStub)
  const instanceMock = createMock(dataSource.getInstance())

  instanceMock.expects('update').returns(drizzleStub)
  drizzleMock.expects('where').returnsThis()
  drizzleMock.expects('returning').resolves([expected])

  const response = await app.inject({
    method: 'PATCH',
    url: `/users/${id}`,
    payload: patchPayload
  })

  const responseData = response.json()

  t.is(response.statusCode, StatusCodes.OK)
  t.is(response.headers['content-type'], CONTENT_TYPE)
  t.deepEqual(responseData, expected)

  t.teardown(() => {
    verifyMock()
  })
})

test.serial('should delete an user', async t => {
  const { createMock, verifyMock } = mock()

  const drizzleStub = createDrizzleFixture()
  const drizzleMock = createMock(drizzleStub)
  const instanceMock = createMock(dataSource.getInstance())

  instanceMock.expects('delete').returns(drizzleStub)
  drizzleMock.expects('where').resolves(true)

  const response = await app.inject({
    method: 'DELETE',
    url: `/users/${id}`
  })

  t.is(response.statusCode, StatusCodes.NO_CONTENT)
  t.is(response.headers['content-length'], undefined)

  t.teardown(() => {
    verifyMock()
  })
})

test.serial('should get all users', async t => {
  const { createMock, restoreStub, verifyMock } = mock()

  const expected = {
    data: [user]
  }

  const usersMock = createMock(dataSource.getInstance().query.users)
  usersMock.expects('findMany').resolves([user])

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

  t.teardown(() => {
    verifyMock()
    restoreStub()
  })
})

test.serial('should get an user by id', async t => {
  const { createMock, restoreStub, verifyMock } = mock()

  const expected = user

  const usersMock = createMock(dataSource.getInstance().query.users)
  usersMock.expects('findFirst').resolves(user)

  const response = await app.inject({
    method: 'GET',
    url: `/users/${id}`
  })

  const responseData = response.json()

  t.is(response.statusCode, StatusCodes.OK)
  t.is(response.headers['content-type'], CONTENT_TYPE)
  t.deepEqual(responseData, expected)

  t.teardown(() => {
    verifyMock()
    restoreStub()
  })
})
