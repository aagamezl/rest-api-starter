import sinon from 'sinon'
import test from 'ava'
import { StatusCodes } from 'http-status-codes'
import { isPlainObject } from '@devnetic/utils'

import app from '../src/app.js'
import dataSource from '../src/data-source.js'
import drizzleStub from './stubs/drizzle.js'
import { CONTENT_TYPE } from '../src/utils/domains/constants.js'
// import { users } from '../src/domains/schemas.js'

const id = 'a4986d92-3455-4d5e-a211-284577cd708e'
const payload = {
  firstName: 'Jane',
  lastName: 'Doe',
  password: 'abcd1234',
  email: 'jane@email.com',
  age: 34
}
const { password, ...payloadWithPassword } = payload
const createdAt = '2023-04-12T21:55:05.045Z'
const updatedAt = '2023-04-12T21:55:05.045Z'

const user = {
  id,
  ...payload,
  createdAt,
  updatedAt
}

const userWithPassword = {
  id,
  ...payloadWithPassword,
  createdAt,
  updatedAt
}

let sandbox
let dataSourceMock

// const mockClient = {
//   execute: sinon.stub(),
//   // unsafe: sinon.stub(),
//   unsafe () {
//     return {
//       // values: () => sinon.stub()
//       values: () => [],
//       returning: () => {}
//     }
//   },
//   insert () {
//     return {
//       values () {
//         return {
//           returning: () => {}
//         }
//       }
//     }
//   },
//   options: {
//     serializers: {},
//     parsers: {}
//   }
// }

// const drizzleStub = drizzle(mockClient, { schema })

test.beforeEach((t) => {
  sandbox = sinon.createSandbox()
  // t.context.getInstanceStub = sinon.stub(dataSource, 'getInstance').returns(drizzleStub)
  dataSourceMock = sandbox.mock(dataSource)
  // sandbox.mock(dataSource).expects('getInstance').returns(drizzleStub)
})

// test.afterEach(() => {
//   // sinon.restore()
//   sandbox.restore()
// })

test('should get all users', async t => {
  const expected = {
    data: [{
      id,
      ...payloadWithPassword,
      createdAt,
      updatedAt
    }]
  }

  dataSourceMock.expects('getInstance').returns(drizzleStub)

  drizzleStub.query.users.findMany.resolves([user])
  // sandbox.mock(drizzleStub)
  //   .expects('findMany')
  //   .resolves([user])
  // mockClient.unsafe().values().onFirstCall().resolves([user])

  // sandbox.mock(mockClient).expects('unsafe').returns({
  //   values: () => [Object.values(user)]
  // })

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

test('should create an user', async t => {
  const expected = userWithPassword

  dataSourceMock.expects('getInstance').returns(drizzleStub)

  drizzleStub.returning.resolves(expected)
  // sandbox.mock(drizzleStub)
  //   .expects('insert')
  //   .resolves(user)
  // sandbox.mock(drizzleStub)
  //   .expects('values')
  //   .resolves(user)
  // sandbox.mock(drizzleStub)
  //   .expects('returning')
  //   .resolves(userWithPassword)
  // sandbox.mock(mockClient).expects('unsafe').returns({
  //   values: () => [Object.values(user)]
  // })
  // sandbox.mock(mockClient).expects('insert').returns({
  //   returning: () => userWithPassword
  // })

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

test('should delete an user', async t => {
  dataSourceMock.expects('getInstance').returns(drizzleStub)

  // drizzleStub.returning.resolves(expected)
  // sandbox.mock(drizzleStub)
  // drizzleStub
  //   .expects('where')
  //   .resolves(user)
  drizzleStub.where(user)

  const response = await app.inject({
    method: 'DELETE',
    url: `/users/${id}`
  })

  t.is(response.statusCode, StatusCodes.NO_CONTENT)
  t.is(response.headers['content-length'], undefined)
})
