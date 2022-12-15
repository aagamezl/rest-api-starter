import test from 'ava'

import * as model from '../src/domains/health/health.model.js'

test('should returns the server status', async t => {
  const response = model.check()

  t.true(typeof response === 'object')

  t.true(response.status !== undefined)
  t.true(response.version !== undefined)

  t.true(typeof response.status === 'string')
  t.true(typeof response.version === 'string')

  t.true(response.status === 'pass')
})
