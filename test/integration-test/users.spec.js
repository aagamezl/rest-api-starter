import jwt from 'jsonwebtoken'
import sinon from 'sinon'
import test from 'ava'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'

import { app } from '../../src/index.js'
import { dataSource } from '../../src/data-source.js'
import { createHashValue } from '../../src/utils/authentication/index.js'
import { createManagerStub } from '../stubs/index.js'
import { CONTENT_TYPE } from '../../src/utils/index.js'

// sinon.config = {
//   useFakeTimers: false
// }

let sandbox
let dataSourceMock
let authTokenMock

const id = 'a4986d92-3455-4d5e-a211-284577cd708e'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiamFuZS5kb2VAZ21haWwuY29tIiwiaWF0IjoxNjY3NTUyMjA4LCJleHAiOjE2Njc1NTU4MDh9.c_bNCjeDzVClQ3GJ4dXHkEpEkDPmAU8bPBLQoZJkYho'
const createdAt = '2023-04-12T21:55:05.045Z'
const updatedAt = '2023-04-12T21:55:05.045Z'

const payload = {
  firstname: 'Jane',
  lastname: 'Doe',
  email: 'jane@email.com',
  password: 'abcd1234'
}

const password = createHashValue(payload.password)

const user = {
  id,
  ...payload,
  password,
  createdAt,
  updatedAt
}

const userWithoutPassword = {
  id,
  firstname: payload.firstname,
  lastname: payload.lastname,
  email: payload.email,
  createdAt,
  updatedAt
}

test.beforeEach(() => {
  sandbox = sinon.createSandbox()

  dataSourceMock = sandbox.mock(dataSource)
  authTokenMock = sandbox.mock(jwt)
})

test.afterEach(() => {
  sandbox.restore()
})

test('should create an user using endpoint', async t => {
  const managerMock = createManagerStub()
  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('user')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('create')
    .once()
    .withArgs({
      ...payload,
      password
    })
    .resolves(user)

  const { body, headers, status } = await request(app)
    .post('/users')
    .send(payload)

  t.is(status, StatusCodes.CREATED)
  t.is(headers['content-type'], CONTENT_TYPE)
  t.is(body.firstname, user.firstname)
  t.is(body.email, user.email)
  t.is(body.password, undefined)
  t.not(body.createdAt, undefined)
  t.not(body.updatedAt, undefined)
})

test('should fails create an user using endpoint', async t => {
  const managerMock = createManagerStub()
  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('user')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('create')
    .once()
    .withArgs({
      ...payload,
      password
    })
    .rejects(new Error(t.title))

  const { body, headers, status } = await request(app)
    .post('/users')
    .send(payload)

  t.is(status, StatusCodes.INTERNAL_SERVER_ERROR)
  t.is(headers['content-type'], CONTENT_TYPE)
  t.is(body.details, t.title)
})

test('should delete an user by id', async t => {
  const managerMock = createManagerStub()

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('user')
    .returns(managerMock)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('authToken')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('delete')
    .once()
    .withArgs({ id })
    .resolves(user)

  sandbox.mock(managerMock)
    .expects('findOne')
    .once()
    .withArgs({ token })
    .resolves({ token })

  authTokenMock.expects('verify').yields(null, token)

  const { status } = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`)

  t.is(status, StatusCodes.NO_CONTENT)
})

test('should fails delete an user by id', async t => {
  const managerMock = createManagerStub()

  sandbox.mock(managerMock)
    .expects('findOne')
    .once()
    .withArgs({ token })
    .resolves({ token })

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('user')
    .returns(managerMock)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('authToken')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('delete')
    .once()
    .withArgs({ id })
    .rejects(new Error(t.title))

  authTokenMock.expects('verify').yields(null, token)

  const { body, headers, status } = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`)

  t.is(status, StatusCodes.INTERNAL_SERVER_ERROR)
  t.is(headers['content-type'], CONTENT_TYPE)
  t.is(body.details, t.title)
})

test('should find all users', async t => {
  const managerMock = createManagerStub()

  const query = {
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      age: true,
      createdAt: true,
      updatedAt: true
    },
    skip: 0,
    take: 20
  }

  const expected = {
    count: 2,
    items: [user, user]
  }

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('user')
    .returns(managerMock)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('authToken')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('findOne')
    .once()
    .withArgs({ token })
    .resolves({ token })

  authTokenMock.expects('verify').yields(null, token)

  sandbox.mock(managerMock)
    .expects('findAndCountAll')
    .once()
    .withArgs(query)
    .resolves(expected)

  const { body, headers, status } = await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${token}`)

  t.is(status, StatusCodes.OK)
  t.is(headers['content-type'], CONTENT_TYPE)
  t.deepEqual(body, expected)
})

test('should fails find all users', async t => {
  const managerMock = createManagerStub()

  const query = {
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      age: true,
      createdAt: true,
      updatedAt: true
    },
    skip: 0,
    take: 20
  }

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('user')
    .returns(managerMock)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('authToken')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('findOne')
    .once()
    .withArgs({ token })
    .resolves({ token })

  authTokenMock.expects('verify').yields(null, token)

  sandbox.mock(managerMock)
    .expects('findAndCountAll')
    .once()
    .withArgs(query)
    .rejects(new Error(t.title))

  const { body, headers, status } = await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${token}`)

  t.is(status, StatusCodes.INTERNAL_SERVER_ERROR)
  t.is(headers['content-type'], CONTENT_TYPE)
  t.is(body.details, t.title)
})

test('should get an user by id', async t => {
  const managerMock = createManagerStub()

  const query = {
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      age: true,
      createdAt: true,
      updatedAt: true
    },
    where: { id }
  }

  authTokenMock.expects('verify').yields(null, token)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('user')
    .returns(managerMock)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('authToken')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('findOne')
    .once()
    .withArgs({ token })
    .resolves({ token })

  sandbox.mock(managerMock)
    .expects('findUnique')
    .once()
    .withArgs(query)
    .resolves(user)

  const { body, headers, status } = await request(app)
    .get(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`)

  t.is(status, StatusCodes.OK)
  t.is(headers['content-type'], CONTENT_TYPE)
  t.deepEqual(body, user)
})

test('should returns not found when getting an unexisting user by id', async t => {
  const managerMock = createManagerStub()

  const query = {
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      age: true,
      createdAt: true,
      updatedAt: true
    },
    where: { id }
  }

  authTokenMock.expects('verify').yields(null, token)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('user')
    .returns(managerMock)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('authToken')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('findOne')
    .once()
    .withArgs({ token })
    .resolves({ token })

  sandbox.mock(managerMock)
    .expects('findUnique')
    .once()
    .withArgs(query)
    .resolves(null)

  const { headers, status } = await request(app)
    .get(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`)

  t.is(status, StatusCodes.NOT_FOUND)
  t.is(headers['content-type'], CONTENT_TYPE)
})

test('should fails to get an user by id', async t => {
  const managerMock = createManagerStub()

  const query = {
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      age: true,
      createdAt: true,
      updatedAt: true
    },
    where: { id }
  }

  authTokenMock.expects('verify').yields(null, token)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('user')
    .returns(managerMock)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('authToken')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('findOne')
    .once()
    .withArgs({ token })
    .resolves({ token })

  sandbox.mock(managerMock)
    .expects('findUnique')
    .once()
    .withArgs(query)
    .rejects(new Error(t.title))

  const { body, headers, status } = await request(app)
    .get(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`)

  t.is(status, StatusCodes.INTERNAL_SERVER_ERROR)
  t.is(headers['content-type'], CONTENT_TYPE)
  t.is(body.details, t.title)
})

test('should update an user by id', async t => {
  const managerMock = createManagerStub()

  const updatePayload = {
    firstname: 'Susan'
  }
  const expected = {
    ...userWithoutPassword,
    ...updatePayload
  }

  authTokenMock.expects('verify').yields(null, token)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('user')
    .returns(managerMock)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('authToken')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('findOne')
    .once()
    .withArgs({ token })
    .resolves({ token })

  sandbox.mock(managerMock)
    .expects('update')
    .once()
    .withArgs(
      id,
      updatePayload
    )
    .resolves(expected)

  const { body, headers, status } = await request(app)
    .patch(`/users/${id}`)
    .send(updatePayload)
    .set('Authorization', `Bearer ${token}`)

  t.is(status, StatusCodes.OK)
  t.is(headers['content-type'], CONTENT_TYPE)
  t.deepEqual(body, expected)
})

test('should fails update an user by id', async t => {
  const managerMock = createManagerStub()

  const updatePayload = {
    firstname: 'Susan'
  }

  authTokenMock.expects('verify').yields(null, token)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('user')
    .returns(managerMock)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('authToken')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('findOne')
    .once()
    .withArgs({ token })
    .resolves({ token })

  sandbox.mock(managerMock)
    .expects('update')
    .once()
    .withArgs(
      id,
      updatePayload
    )
    .rejects(new Error(t.title))

  const { body, headers, status } = await request(app)
    .patch(`/users/${id}`)
    .send(updatePayload)
    .set('Authorization', `Bearer ${token}`)

  t.is(status, StatusCodes.INTERNAL_SERVER_ERROR)
  t.is(headers['content-type'], CONTENT_TYPE)
  t.deepEqual(body.details, t.title)
})

test('should login an existing user', async t => {
  const managerMock = createManagerStub()

  const loginPayload = {
    email: payload.email,
    password: payload.password
  }

  const userData = {
    token,
    username: `${user.firstname} ${user.lastname}`,
    email: user.email
  }

  authTokenMock.expects('sign').yields(null, token)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('user')
    .returns(managerMock)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('authToken')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('findOne')
    .once()
    .withArgs({
      email: user.email,
      password
    })
    .resolves(user)

  sandbox.mock(managerMock)
    .expects('create')
    .once()
    .withArgs({ token })

  const { body, headers, status } = await request(app)
    .post('/users/login')
    .send(loginPayload)

  t.is(status, StatusCodes.OK)
  t.is(headers['content-type'], CONTENT_TYPE)
  t.deepEqual(body, userData)
})

test('should fails login an unexisting user', async t => {
  const managerMock = createManagerStub()

  const loginPayload = {
    email: payload.email,
    password: payload.password
  }

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('user')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('findOne')
    .once()
    .withArgs({
      email: user.email,
      password
    })
    .resolves(null)

  const { headers, status } = await request(app)
    .post('/users/login')
    .send(loginPayload)

  t.is(status, StatusCodes.NOT_FOUND)
  t.is(headers['content-type'], CONTENT_TYPE)
})

test('should fails login an unexpected reason', async t => {
  const managerMock = createManagerStub()

  const loginPayload = {
    email: payload.email,
    password: payload.password
  }

  authTokenMock.expects('sign').yields(null, token)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('user')
    .returns(managerMock)

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('authToken')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('findOne')
    .once()
    .withArgs({
      email: user.email,
      password
    })
    .resolves(user)

  sandbox.mock(managerMock)
    .expects('create')
    .once()
    .withArgs({ token })
    .rejects(new Error(t.title))

  const { body, headers, status } = await request(app)
    .post('/users/login')
    .send(loginPayload)

  t.is(status, StatusCodes.INTERNAL_SERVER_ERROR)
  t.is(headers['content-type'], CONTENT_TYPE)
  t.deepEqual(body.details, t.title)
})

test('should logout an existing user', async t => {
  const managerMock = createManagerStub()

  authTokenMock.expects('verify').yields(null, token)

  dataSourceMock
    .expects('manager')
    .twice()
    .withArgs('authToken')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('findOne')
    .once()
    .withArgs({ token })
    .resolves({ token })

  sandbox.mock(managerMock)
    .expects('delete')
    .once()
    .withArgs({ token })

  const { status } = await request(app)
    .post('/users/logout')
    .set('Authorization', `Bearer ${token}`)

  t.is(status, StatusCodes.NO_CONTENT)
})

test('should fails logout an existing user', async t => {
  const managerMock = createManagerStub()

  authTokenMock.expects('verify').yields(null, token)

  dataSourceMock
    .expects('manager')
    .twice()
    .withArgs('authToken')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('findOne')
    .once()
    .withArgs({ token })
    .resolves({ token })

  sandbox.mock(managerMock)
    .expects('delete')
    .once()
    .withArgs({ token })
    .rejects(new Error(t.title))

  const { body, headers, status } = await request(app)
    .post('/users/logout')
    .set('Authorization', `Bearer ${token}`)

  t.is(status, StatusCodes.INTERNAL_SERVER_ERROR)
  t.is(headers['content-type'], CONTENT_TYPE)
  t.is(body.details, t.title)
})

test('should fails request when nonexistent token provided', async t => {
  const managerMock = createManagerStub()

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('authToken')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('findOne')
    .once()
    .withArgs({ token })
    .resolves(null)

  const { body, headers, status } = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`)

  t.is(status, StatusCodes.FORBIDDEN)
  t.is(headers['content-type'], CONTENT_TYPE)
  t.is(body.details, 'The authentication token doesn\'t exist')
})

test('should fails request when invalid token provided', async t => {
  const managerMock = createManagerStub()

  dataSourceMock
    .expects('manager')
    .once()
    .withArgs('authToken')
    .returns(managerMock)

  sandbox.mock(managerMock)
    .expects('findOne')
    .once()
    .withArgs({ token })
    .resolves({ token })

  authTokenMock.expects('verify').yields(new Error('jwt expired'))

  const { body, headers, status } = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`)

  t.is(status, StatusCodes.FORBIDDEN)
  t.is(headers['content-type'], CONTENT_TYPE)
  t.is(body.details, 'jwt expired')
})

test('should fails request when no token provided', async t => {
  const { body, headers, status } = await request(app)
    .delete(`/users/${id}`)

  t.is(status, StatusCodes.FORBIDDEN)
  t.is(headers['content-type'], CONTENT_TYPE)
  t.is(body.details, 'No Bearer token was found')
})
