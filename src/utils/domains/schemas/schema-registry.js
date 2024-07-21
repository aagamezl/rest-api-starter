const schemas = {}

/** @typedef {import('@sinclair/typebox').TObject} TypeboxSchema */

/**
 *
 * @param {string} domain
 * @returns {TypeboxSchema[]}
 */
export const getSchemas = (domain) => {
  return schemas[domain]
}

/**
 *
 * @param {string} domain
 * @param {string} id
 * @param {TypeboxSchema} schema
 */
export const registerSchema = (domain, id, schema) => {
  (schemas[domain] ??= []).push({
    $id: id,
    ...schema
  })
}

/**
 *
 * @param {import('fastify').FastifyInstance} app
 * @param {string} domain
 */
export const addSchemas = (app, domain) => {
  for (const schema of getSchemas('users')) {
    app.addSchema(schema)
  }
}
