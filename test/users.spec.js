import test from 'ava'
import { StatusCodes } from 'http-status-codes'
import { isPlainObject } from '@devnetic/utils'

import app from '../src/app.js'
import dataSource from '../src/data-source.js'
import mock from './helpers/mock.js'
import createDrizzleFixture from './fixtures/drizzle.js'
import { CONTENT_TYPE } from '../src/utils/domains/constants.js'
// import { users } from '../src/domains/schemas.js'
// import * as schema from '../src/domains/schemas.js'

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

// const createDrizzleFixture = () => ({
//   insert: sinon.stub().returnsThis(),
//   values: sinon.stub().returnsThis(),
//   select: sinon.stub().returnsThis(),
//   update: sinon.stub().returnsThis(),
//   delete: sinon.stub().returnsThis(),
//   set: sinon.stub().returnsThis(),
//   from: sinon.stub().returnsThis(),
//   where: () => { },
//   returning: () => {},
//   limit: sinon.stub(),
//   offset: sinon.stub(),
//   // query: {}
//   query: {
//     users: {
//       findMany: () => { }
//     }
//   }
// })

test.only('should create an user', async t => {
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

test.only('should patch an user', async t => {
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

test.only('should delete an user', async t => {
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

test.only('should get all users', async t => {
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

// test.serial('should create an user', async t => {
//   const expected = user

//   // dataSourceMock = sinon.mock(dataSource)
//   // const getInstanceStub = sinon.stub(dataSource, 'getInstance').returns(drizzleStub)
//   // const getInstanceStub = sinon.replace(dataSource, 'getInstance', sinon.fake.returns(drizzleStub))
//   const dataSourceMock = sinon.mock(dataSource)
//   const drizzleStub = createDrizzleFixture()
//   dataSourceMock.expects('getInstance').returns(drizzleStub)
//   const drizzleMock = sinon.mock(drizzleStub)
//   drizzleMock.expects('returning').resolves(expected)

//   const response = await app.inject({
//     method: 'POST',
//     url: '/users',
//     payload
//   })

//   // sinon.verifyAndRestore()

//   const responseData = response.json()

//   t.is(response.statusCode, StatusCodes.CREATED)
//   t.is(response.headers['content-type'], CONTENT_TYPE)
//   t.is(expected.firstName, responseData.firstName)
//   t.is(expected.email, responseData.email)
//   t.true(responseData.password === undefined)
//   t.true(responseData.createdAt !== undefined)
//   t.true(responseData.updatedAt !== undefined)

//   // Restore stubs after the test
//   t.teardown(() => {
//     // sinon.verifyAndRestore()
//     sinon.verify()
//   })
// })

// test.serial('should get all users', async t => {
//   const expected = {
//     data: [user]
//   }

//   const dataSourceMock = sinon.mock(dataSource)
//   const drizzleStub = createDrizzleFixture()
//   const usersStub = createQueryStub('users')
//   sinon.replace(drizzleStub, 'query', usersStub)

//   dataSourceMock.expects('getInstance').returns(drizzleStub)
//   // const drizzleMock = sinon.mock(drizzleStub)

//   const usersMock = sinon.mock(usersStub.users)
//   usersMock.expects('findMany').resolves([user])

//   const response = await app.inject({
//     method: 'GET',
//     url: '/users'
//   })

//   const responseData = response.json()

//   t.is(response.statusCode, StatusCodes.OK)
//   t.is(response.headers['content-type'], CONTENT_TYPE)
//   t.true(isPlainObject(responseData))
//   t.true(Array.isArray(responseData.data))
//   t.deepEqual(responseData, expected)
//   t.true(responseData.data.length > 0)
//   t.true(responseData.data[0].password === undefined)

//   t.teardown(() => {
//     // sinon.verifyAndRestore()
//     sinon.verify()
//   })
// })

// test.skip('should delete an user', async t => {
//   t.context.drizzleStub.where.resolves(true)

//   const response = await app.inject({
//     method: 'DELETE',
//     url: `/users/${id}`
//   })

//   t.is(response.statusCode, StatusCodes.NO_CONTENT)
//   t.is(response.headers['content-length'], undefined)
// })

// test.serial('should patch an user', async t => {
//   const patchPayload = {
//     firstName: 'Susan'
//   }
//   const expected = {
//     id,
//     ...payload,
//     createdAt: new Date().toUTCString(),
//     updatedAt: new Date().toUTCString()
//   }

//   // dataSourceMock = sinon.mock(dataSource)
//   // dataSourceMock.expects('getInstance').returns(drizzleStub)
//   // drizzleStub.returning.resolves([expected])
//   // const drizzleStub = createDrizzleFixture()
//   // const getInstanceStub = sinon.stub(dataSource, 'getInstance').returns(drizzleStub)
//   // drizzleStub.returning.resolves([expected])
//   const dataSourceMock = sinon.mock(dataSource)
//   const drizzleStub = createDrizzleFixture()
//   dataSourceMock.expects('getInstance').returns(drizzleStub)
//   const drizzleMock = sinon.mock(drizzleStub)
//   drizzleMock.expects('returning').resolves([expected])

//   const response = await app.inject({
//     method: 'PATCH',
//     url: `/users/${id}`,
//     payload: patchPayload
//   })

//   // sinon.verifyAndRestore()
//   // drizzleStub.verifyAndRestore()

//   t.is(response.statusCode, StatusCodes.OK)
//   // t.is(response.headers['content-length'], undefined)

//   // Restore stubs after the test
//   t.teardown(() => {
//     sinon.verifyAndRestore()
//   })
// })

// import sinon from 'sinon'
// import test from 'ava'
// import { StatusCodes } from 'http-status-codes'
// import { isPlainObject } from '@devnetic/utils'

// import app from '../src/app.js'
// import dataSource from '../src/data-source.js'
// import drizzleStub from './stubs/drizzle.js'
// import { CONTENT_TYPE } from '../src/utils/domains/constants.js'
// // import { users } from '../src/domains/schemas.js'

// const id = 'a4986d92-3455-4d5e-a211-284577cd708e'
// const payload = {
//   firstName: 'Jane',
//   lastName: 'Doe',
//   password: 'abcd1234',
//   email: 'jane@email.com',
//   age: 34
// }
// const { password, ...payloadWithoutPassword } = payload
// const createdAt = '2023-04-12T21:55:05.045Z'
// const updatedAt = '2023-04-12T21:55:05.045Z'

// const user = {
//   id,
//   ...payload,
//   createdAt,
//   updatedAt
// }

// const userWithPassword = {
//   id,
//   ...payloadWithoutPassword,
//   createdAt,
//   updatedAt
// }

// let sandbox
// let dataSourceMock

// test.beforeEach((t) => {
//   sandbox = sinon.createSandbox()
//   // t.context.getInstanceStub = sinon.stub(dataSource, 'getInstance').returns(drizzleStub)
//   // dataSourceMock = sandbox.mock(dataSource)
//   dataSourceMock = sinon.mock(dataSource)
//   dataSourceMock.expects('getInstance').returns(drizzleStub)
//   // sandbox.mock(dataSource).expects('getInstance').returns(drizzleStub)
//   // sinon.stub(dataSource, 'getInstance').returns(drizzleStub)
// })

// test.afterEach(() => {
//   // sandbox.restore()
//   // sinon.restore()
//   dataSourceMock.verify()
//   dataSourceMock.restore()
// })

// test.only('should get all users', async t => {
//   const expected = {
//     data: [{
//       id,
//       ...payloadWithoutPassword,
//       createdAt,
//       updatedAt
//     }]
//   }

//   // dataSourceMock.expects('getInstance').returns(drizzleStub)
//   // sandbox.mock(dataSource).expects('getInstance').returns(drizzleStub)
//   const dataSourceMock = sinon.mock(dataSource)
//   dataSourceMock.expects('getInstance').returns(drizzleStub)

//   drizzleStub.query.users.findMany.resolves([user])

//   const response = await app.inject({
//     method: 'GET',
//     url: '/users'
//   })

//   const responseData = response.json()

//   t.is(response.statusCode, StatusCodes.OK)
//   t.is(response.headers['content-type'], CONTENT_TYPE)
//   t.true(isPlainObject(responseData))
//   t.true(Array.isArray(responseData.data))
//   t.deepEqual(responseData, expected)
//   t.true(responseData.data.length > 0)
//   t.true(responseData.data[0].password === undefined)
// })

// test.only('should create an user', async t => {
//   const expected = userWithPassword

//   // dataSourceMock.expects('getInstance').returns(drizzleStub)
//   const dataSourceMock = sinon.mock(dataSource)
//   dataSourceMock.expects('getInstance').returns(drizzleStub)

//   drizzleStub.returning.resolves(expected)

//   const response = await app.inject({
//     method: 'POST',
//     url: '/users',
//     payload
//   })

//   const responseData = response.json()

//   t.is(response.statusCode, StatusCodes.CREATED)
//   t.is(response.headers['content-type'], CONTENT_TYPE)
//   t.is(expected.firstName, responseData.firstName)
//   t.is(expected.email, responseData.email)
//   t.true(responseData.password === undefined)
//   t.true(responseData.createdAt !== undefined)
//   t.true(responseData.updatedAt !== undefined)
// })

// test('should delete an user', async t => {
//   // dataSourceMock.expects('getInstance').returns(drizzleStub)
//   sandbox.mock(dataSource).expects('getInstance').returns(drizzleStub)

//   drizzleStub.delete.resolves(true)

//   const response = await app.inject({
//     method: 'DELETE',
//     url: `/users/${id}`
//   })

//   t.is(response.statusCode, StatusCodes.NO_CONTENT)
//   t.is(response.headers['content-length'], undefined)

//   dataSourceMock.verify()
// })

// test('should patch an user', async t => {
//   const patchPayload = {
//     firstName: 'Susan'
//   }
//   const expected = {
//     ...payloadWithoutPassword,
//     ...patchPayload
//   }

//   // dataSourceMock.expects('getInstance').returns(drizzleStub)

//   drizzleStub.returning.resolves(expected)

//   const response = await app.inject({
//     method: 'PATCH',
//     url: `/users/${id}`,
//     payload: patchPayload
//   })

//   t.is(response.statusCode, StatusCodes.OK)
//   // t.is(response.headers['content-length'], undefined)
// })
