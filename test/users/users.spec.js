import jwt from 'jsonwebtoken'
import sinon from 'sinon'
import test from 'ava'

import { dataSource } from '../../src/data-source.js'
import { createHashValue } from '../../src/utils/authentication/createHashValue.js'
import { model } from '../../src/domains/users/users.model.js'
import { createPrismaStub } from '../stubs/createStub.js'

let sandbox
let dataSourceMock

const id = 'a4986d92-3455-4d5e-a211-284577cd708e'

const createdAt = new Date()
const updatedAt = new Date()
const payload = {
  firstname: 'Jane',
  lastname: 'Doe',
  email: 'jane@email.com',
  password: 'abcd1234'
}

const user = {
  id,
  ...payload,
  password: createHashValue(payload.password),
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

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiamFuZS5kb2VAZ21haWwuY29tIiwiaWF0IjoxNjY3NTUyMjA4LCJleHAiOjE2Njc1NTU4MDh9.c_bNCjeDzVClQ3GJ4dXHkEpEkDPmAU8bPBLQoZJkYho'

test.beforeEach(() => {
  sandbox = sinon.createSandbox()
  dataSourceMock = sandbox.mock(dataSource)
})

test.afterEach(() => {
  sandbox.restore()
})

test('should create an user', async t => {
  const expected = {
    ...userWithoutPassword
  }

  const prismaStub = createPrismaStub('user')
  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  sandbox.mock(prismaStub.user).expects('create').once().withArgs({
    data: {
      ...payload,
      password: createHashValue(payload.password)
    }
  }).resolves(userWithoutPassword)

  const result = await model.create(payload)

  t.deepEqual(result, expected)
})

test('should find create an user', async t => {
  const expected = {
    ...userWithoutPassword
  }

  const prismaStub = createPrismaStub('user')
  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  sandbox.mock(prismaStub.user).expects('create').once().withArgs({
    data: {
      ...payload,
      password: createHashValue(payload.password)
    }
  }).resolves(user)

  const result = await model.create(payload)

  t.deepEqual(result, expected)
})

test('should delete an user by id', async t => {
  const prismaStub = createPrismaStub('user')
  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  sandbox.mock(prismaStub.user).expects('delete').once().withArgs({
    where: {
      id
    }
  }).resolves(user)

  const expected = await model.deleteById(id)

  t.deepEqual(user, expected)
})

test('should find all users', async t => {
  const items = [user, user]
  const count = items.length
  const expected = {
    count,
    items
  }
  const countResult = Promise.resolve(count)
  const findResult = Promise.resolve(items)

  const prismaStub = createPrismaStub('user')

  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  sandbox.mock(prismaStub.user).expects('count').once().resolves(countResult)

  sandbox.mock(prismaStub.user).expects('findMany').once().withArgs({
  }).resolves(findResult)

  sandbox.mock(prismaStub).expects('$transaction').once().withArgs([
    countResult,
    findResult
  ]).resolves([
    count,
    items
  ])

  const result = await model.getAll()

  t.deepEqual(result, expected)
})

test('should get an user by id', async t => {
  const prismaStub = createPrismaStub('user')
  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  const requestData = {
    resourceType: 'users',
    identifier: id,
    queryData: {
      fields: {},
      sort: [],
      page: {}
    }
  }

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
    where: {
      id: 'a4986d92-3455-4d5e-a211-284577cd708e'
    },
    orderBy: []
  }

  const expected = {
    ...userWithoutPassword
  }

  sandbox.mock(prismaStub.user).expects('findUnique').once().withArgs(query).resolves(expected)

  const result = await model.getById(requestData)

  t.deepEqual(result, expected)
})

test('should login an user', async t => {
  const userPrismaStub = createPrismaStub('user')
  const authTokenPrismaStub = createPrismaStub('authToken')
  dataSourceMock.expects('getInstance').twice()
    .onFirstCall().returns(userPrismaStub)
    .onSecondCall().returns(authTokenPrismaStub)

  const tokenMock = sinon.mock(jwt)
  tokenMock.expects('sign').yields(null, token)

  const expected = {
    token,
    username: `${user.firstname} ${user.lastname}`,
    email: user.email
  }

  sandbox.mock(userPrismaStub.user).expects('findFirst').once().withArgs({
    where: {
      email: payload.email,
      password: createHashValue(payload.password)
    }
  }).resolves(user)

  sandbox.mock(authTokenPrismaStub.authToken).expects('create').once().withArgs({
    data: {
      token
    }
  })

  const userData = await model.login({
    email: payload.email,
    password: payload.password
  })

  t.deepEqual(userData, expected)
})
