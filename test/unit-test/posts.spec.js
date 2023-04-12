import sinon from 'sinon'
import test from 'ava'

import { dataSource } from '../../src/data-source.js'
import { model } from '../../src/domains/posts/posts.model.js'
import { createPrismaStub } from '../stubs/index.js'

let sandbox
let dataSourceMock

const id = '215937b9-4f32-4dc1-96db-e758111cd0e8'
const authorId = 'a4986d92-3455-4d5e-a211-284577cd708e'
const createdAt = new Date()
const updatedAt = new Date()

const payload = {
  title: 'First post',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  published: 'true',
  authorId
}

const post = {
  id,
  ...payload,
  createdAt,
  updatedAt
}

test.beforeEach(() => {
  sandbox = sinon.createSandbox()
  dataSourceMock = sandbox.mock(dataSource)
})

test.afterEach(() => {
  sandbox.restore()
})

test('should create a post', async t => {
  const expected = {
    ...post
  }

  const prismaStub = createPrismaStub()
  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  sandbox.mock(prismaStub.post).expects('create').once().withArgs({
    data: {
      ...payload
    }
  }).resolves(post)

  const result = await model.create(payload)

  t.deepEqual(result, expected)
})

test('should delete a post by id', async t => {
  const prismaStub = createPrismaStub()
  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  sandbox.mock(prismaStub.post).expects('delete').once().withArgs({
    where: {
      id
    }
  }).resolves(post)

  const expected = await model.deleteById(id)

  t.deepEqual(post, expected)
})

test('should find all posts', async t => {
  const items = [post, post]
  const count = items.length
  const expected = {
    count,
    items
  }
  const countResult = Promise.resolve(count)
  const findResult = Promise.resolve(items)

  const prismaStub = createPrismaStub()

  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  sandbox.mock(prismaStub.post).expects('count').once().resolves(countResult)

  sandbox.mock(prismaStub.post).expects('findMany').once().withArgs({
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

test('should get a post by id', async t => {
  const prismaStub = createPrismaStub()
  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  const requestData = {
    resourceType: 'posts',
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
      title: true,
      content: true,
      published: true,
      authorId: true,
      createdAt: true,
      updatedAt: true
    },
    where: {
      id
    }
  }

  sandbox.mock(prismaStub.post).expects('findUnique').once().withArgs(query).resolves(post)

  const result = await model.getById(requestData)

  t.deepEqual(result, post)
})

test('should update a post by id', async t => {
  const prismaStub = createPrismaStub()
  dataSourceMock.expects('getInstance').once().returns(prismaStub)

  const updatePayload = {
    title: 'First Post - (Updated)'
  }

  const expected = {
    ...updatePayload
  }

  sandbox.mock(prismaStub.post).expects('update').once()
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
