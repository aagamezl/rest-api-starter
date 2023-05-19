import jwt from 'jsonwebtoken'
import sinon from 'sinon'
import test from 'ava'

import { createHashValue } from '../../src/utils/authentication/index.js'
import { createPrismaStub } from '../stubs/createPrismaStub.js'
import { dataSource } from '../../src/data-source.js'
import { model } from '../../src/domains/users/users.model.js'

let sandbox
let dataSourceMock
let authTokenMock

const id = 'a4986d92-3455-4d5e-a211-284577cd708e'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiamFuZS5kb2VAZ21haWwuY29tIiwiaWF0IjoxNjY3NTUyMjA4LCJleHAiOjE2Njc1NTU4MDh9.c_bNCjeDzVClQ3GJ4dXHkEpEkDPmAU8bPBLQoZJkYho'
const createdAt = new Date()
const updatedAt = new Date()

const payload = {
  firstname: 'Jane',
  lastname: 'Doe',
  age: 34,
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
  age: payload.age,
  email: payload.email,
  createdAt,
  updatedAt
}

const requestData = {
  resourceType: 'users',
  identifier: id,
  relationships: false,
  relationshipType: null,
  queryData: {
    include: [],
    fields: {},
    sort: [],
    page: {
      limit: 0,
      offset: 0
    },
    filter: {
      like: {},
      not: {},
      lt: {},
      lte: {},
      gt: {},
      gte: {}
    }
  }
}

test.beforeEach(() => {
  sandbox = sinon.createSandbox()

  dataSourceMock = sandbox.mock(dataSource)
  authTokenMock = sandbox.mock(jwt)
})

test.afterEach(() => {
  sandbox.restore()
})

test('should create an user', async t => {
  // Inicio Preparar el test
  const expected = {
    ...userWithoutPassword
  }

  const prismaStub = createPrismaStub()
  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  sandbox.mock(prismaStub.user).expects('create').once().withArgs({
    data: {
      ...payload,
      password: createHashValue(payload.password)
    }
  }).resolves(user)
  // Fin Prepara el test

  // Inicio Ejecutar
  const result = await model.create(payload)
  // Fin Ejecutar

  // Compobrar los resultados
  t.deepEqual(result, expected)
})

test('should delete an user by id', async t => {
  const prismaStub = createPrismaStub()
  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  sandbox.mock(prismaStub.user).expects('delete').once().withArgs({
    where: {
      id
    }
  }).resolves(user)

  const expected = await model.delete({ id })

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

  const prismaStub = createPrismaStub()

  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  sandbox.mock(prismaStub.user).expects('count').once().resolves(countResult)

  const select = Object.keys(userWithoutPassword).reduce((select, key) => {
    select[key] = true

    return select
  }, {})

  sandbox.mock(prismaStub.user).expects('findMany').once().withArgs({
    select,
    where: {
      id
    }
  }).resolves(findResult)

  sandbox.mock(prismaStub).expects('$transaction').once().withArgs([
    countResult,
    findResult
  ]).resolves([
    count,
    items
  ])

  const result = await model.getAll(requestData)

  t.deepEqual(result, expected)
})

test('should get an user by id', async t => {
  const prismaStub = createPrismaStub()
  dataSourceMock.expects('getInstance').once().returns(prismaStub)

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
      id
    }
  }

  sandbox.mock(prismaStub.user).expects('findUnique').once().withArgs(query).resolves(user)

  const result = await model.getById(requestData)

  t.deepEqual(result, userWithoutPassword)
})

test('should update an user by id', async t => {
  const prismaStub = createPrismaStub()
  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  const updatePayload = {
    firstname: 'Susan'
  }

  const expected = {
    ...userWithoutPassword,
    ...updatePayload
  }

  sandbox.mock(prismaStub.user).expects('update').once()
    .withArgs({
      where: {
        id
      },
      data: {
        ...updatePayload
      }
    }).resolves(expected)

  const result = await model.update(id, updatePayload)

  t.deepEqual(result, expected)
})

test('should update an user with password by id', async t => {
  const updateData = {
    firstname: 'Susan',
    password: 'dcba4321'
  }
  const expected = {
    ...updateData
  }

  const prismaStub = createPrismaStub()
  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  sandbox.mock(prismaStub.user).expects('update').once()
    .withArgs({
      where: {
        id
      },
      data: {
        ...updateData,
        password: createHashValue(updateData.password)
      }
    }).resolves(expected)

  const result = await model.update(id, updateData)

  t.deepEqual(result, expected)
})

test('should fails login an unexisting user', async t => {
  const prismaStub = createPrismaStub()
  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  sandbox.mock(prismaStub.user).expects('findFirst').once().withArgs({
    where: {
      email: payload.email,
      password: createHashValue(payload.password)
    }
  }).resolves(undefined)

  const userData = await model.login({
    email: payload.email,
    password: payload.password
  })

  t.deepEqual(userData, undefined)
})

test('should fails login on jwt sign error', async t => {
  const prismaStub = createPrismaStub()
  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  sandbox.mock(prismaStub.user).expects('findFirst').once().withArgs({
    where: {
      email: payload.email,
      password: createHashValue(payload.password)
    }
  }).resolves(user)

  authTokenMock.expects('sign').yields(new Error(t.title))

  const error = await t.throwsAsync(async () => {
    await model.login({
      email: payload.email,
      password: payload.password
    })
  }, { instanceOf: Error })

  t.is(error.message, t.title)
})

test('should login an existing user', async t => {
  const prismaStub = createPrismaStub()
  dataSourceMock.expects('getInstance').twice().returns(prismaStub)

  sandbox.mock(prismaStub.user).expects('findFirst').once().withArgs({
    where: {
      email: payload.email,
      password: createHashValue(payload.password)
    }
  }).resolves(user)

  sandbox.mock(prismaStub.authToken).expects('create').once().withArgs({
    data: {
      token
    }
  })

  authTokenMock.expects('sign').yields(null, token)

  const expected = {
    token,
    username: `${user.firstname} ${user.lastname}`,
    email: user.email
  }

  const userData = await model.login({
    email: payload.email,
    password: payload.password
  })

  t.deepEqual(userData, expected)
})
