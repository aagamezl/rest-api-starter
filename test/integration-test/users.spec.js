import jwt from 'jsonwebtoken'
import sinon from 'sinon'
import test from 'ava'
import request from 'supertest'

import { app } from '../../src/index.js'
import { dataSource } from '../../src/data-source.js'
import { createHashValue } from '../../src/utils/authentication/index.js'
import { createManagerStub, createPrismaStub } from '../stubs/index.js'
import { StatusCodes } from 'http-status-codes'

sinon.config = {
  useFakeTimers: false
}

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
  t.is(headers['content-type'], 'application/vnd.api+json; charset=utf-8')
  t.is(body.firstname, user.firstname)
  t.is(body.email, user.email)
  t.true(body.password === undefined)
  t.true(body.createdAt !== undefined)
  t.true(body.updatedAt !== undefined)
})

test('should delete an user by id', async t => {
  const prismaStub = createPrismaStub()
  const managerMock = createManagerStub()

  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  sandbox.mock(prismaStub.authToken)
    .expects('findUnique')
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
    .expects('deleteById')
    .once()
    .withArgs(id)
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

test('should find all users', async t => {
  const prismaStub = createPrismaStub()
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

  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  sandbox.mock(prismaStub.authToken)
    .expects('findUnique')
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
  t.is(headers['content-type'], 'application/vnd.api+json; charset=utf-8')
  t.deepEqual(body, expected)
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
  t.is(headers['content-type'], 'application/vnd.api+json; charset=utf-8')
  t.deepEqual(body, user)
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
  t.is(headers['content-type'], 'application/vnd.api+json; charset=utf-8')
  t.deepEqual(body, expected)
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
    .expects('create')
    .once()
    .withArgs({ token })

  sandbox.mock(managerMock)
    .expects('findOne')
    .once()
    .withArgs({
      email: user.email,
      password
    })
    .resolves(user)

  const { body, headers, status } = await request(app)
    .post('/users/login')
    .send(loginPayload)

  t.is(status, StatusCodes.OK)
  t.is(headers['content-type'], 'application/vnd.api+json; charset=utf-8')
  t.deepEqual(body, userData)
})
