import { StatusCodes } from 'http-status-codes'
import {
  afterEach,
  beforeEach,
  describe,
  jest,
  expect,
  test
} from '@jest/globals'

import { app } from '../src/app.js'
import { dataSource } from '../src/data-source.js'
import { drizzle } from './stubs/index.js'
import { createdAt, id, payload, updatedAt, user } from './fixtures/index.js'
import { CONTENT_TYPE, PROBLEM_CONTENT_TYPE } from '../src/common/index.js'
import { isPlainObject } from '@devnetic/utils'

describe('users', () => {
  const endpointUrl = '/users'
  const drizzleStub = drizzle()

  beforeEach(() => {
    jest.spyOn(dataSource, 'getInstance').mockReturnValue(drizzleStub)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('should create an user', async () => {
    const expected = user

    jest
      .spyOn(drizzleStub, 'returning')
      .mockImplementation(() => Promise.resolve([user]))

    const response = await app.inject({
      method: 'POST',
      url: endpointUrl,
      payload
    })

    expect(response.statusCode).toBe(StatusCodes.CREATED)
    expect(response.headers['content-type']).toEqual(CONTENT_TYPE)
    expect(response.json()).toEqual(expected)
  })

  test('should throw internal server error when creating an user', async () => {
    jest
      .spyOn(drizzleStub, 'returning')
      .mockImplementation(() => Promise.rejects())

    const response = await app.inject({
      method: 'POST',
      url: '/users',
      payload
    })

    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(response.headers['content-type']).toBe(PROBLEM_CONTENT_TYPE)
  })

  test('should throw payload error when creating an user', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/users'
    })

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST)
    expect(response.headers['content-type']).toBe(PROBLEM_CONTENT_TYPE)
  })

  test('should patch an user', async () => {
    const patchPayload = {
      first_name: 'Susan'
    }

    const { password, ...payloadWithoutPassword } = payload

    const expected = {
      id,
      ...payloadWithoutPassword,
      ...patchPayload,
      created_at: createdAt,
      updated_at: updatedAt
    }

    jest
      .spyOn(drizzleStub, 'returning')
      .mockImplementation(() => Promise.resolve([expected]))

    const response = await app.inject({
      method: 'PATCH',
      url: `/users/${id}`,
      payload: patchPayload
    })

    expect(response.statusCode).toBe(StatusCodes.OK)
    expect(response.headers['content-type']).toBe(CONTENT_TYPE)
    expect(response.json()).toEqual(expected)
  })

  test('should delete an user', async () => {
    jest
      .spyOn(drizzleStub, 'where')
      .mockImplementation(() => Promise.resolve(true))

    const response = await app.inject({
      method: 'DELETE',
      url: `/users/${id}`
    })

    expect(response.statusCode).toBe(StatusCodes.NO_CONTENT)
    expect(response.headers['content-length']).toBe(undefined)
  })

  test('should get all users', async () => {
    const expected = {
      data: [user],
      total: 1
    }

    jest
      .spyOn(drizzleStub.query.users, 'findMany')
      .mockImplementation(() => Promise.resolve([user]))

    jest
      .spyOn(drizzleStub, 'from')
      .mockImplementation(() => Promise.resolve([{ count: expected.data.length }]))

    const response = await app.inject({
      method: 'GET',
      url: '/users'
    })

    const responseData = response.json()

    expect(response.statusCode).toBe(StatusCodes.OK)
    expect(response.headers['content-type']).toBe(CONTENT_TYPE)
    expect(isPlainObject(responseData))
    expect(Array.isArray(responseData.data)).toBe(true)
    expect(response.json()).toEqual(expected)
    expect(responseData.data.length).toBeGreaterThan(0)
    expect(responseData.data[0].password).toBeUndefined()
  })

  test('should get an user by id', async () => {
    const expected = user

    jest
      .spyOn(drizzleStub.query.users, 'findFirst')
      .mockImplementation(() => Promise.resolve(user))

    const response = await app.inject({
      method: 'GET',
      url: `/users/${id}`
    })

    const responseData = response.json()

    expect(response.statusCode).toBe(StatusCodes.OK)
    expect(response.headers['content-type']).toBe(CONTENT_TYPE)
    expect(responseData).toEqual(expected)
  })
})
