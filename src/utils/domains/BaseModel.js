import { eq, getTableName } from 'drizzle-orm'

import excludeFields from '../query/excludeFields.js'
import queryBuilder from '../query/queryBuilder.js'
import { connection, db } from '../../data-source.js'

/**
 * Base Model
 *
 * @typedef BaseModel
 * @type {object}
 *
 * @property {(payload: Object.<string, unknown>) => Promise.<Object.<string, unknown>>} create
 * @property {(requestData: import('../query/requestParser.js').RequestData) => Promise.<Object.<string, unknown>>} delete
 * @property {(requestData: import('../query/requestParser.js').RequestData) => Promise.<GetAllResponse>} getAll
 * @property {(id: string, requestData: import('../query/requestParser.js').RequestData) => Promise.<Object.<string, unknown>>} getById
 * @property {(id: string, payload: UpdatePayload.<TEntity>) => Promise.<Object.<string, unknown>>} update
 */

/**
 * Model Options
 *
 * @typedef ModelOptions
 * @type {object}
 *
 * @property {string[]} excludedFields
 */

export default class BaseModel {
  /**
   * @constructor
   * @param {import('drizzle-orm').Table} model
   * @param {ModelOptions} options
   */
  constructor (model, options = {}) {
    this.model = model
    this.options = options
    this.tableName = getTableName(model)

    this.returningFields = excludeFields(this.model, this.options.excludedFields)
  }

  /**
   *
   * @param {Object.<string, unknown>} payload
   * @returns {Promise.<Object.<string, unknown>>}
   */
  create (payload) {
    return db.insert(this.model).values(payload).returning(this.returningFields)
  }

  /**
   *
   * @param {import('../query/requestParser.js').RequestData} requestData
   * @returns {Promise<Object.<string, unknown>>}
   */
  delete (requestData) {
    return db.delete(this.model).where(eq(this.model.id, requestData.identifier))
  }

  /**
   *
   * @param {import('../query/requestParser.js').RequestData} requestData
   * @returns {Promise<import('../../data-source.js').FindAllResponse>}
   */
  getAll (requestData) {
    const query = queryBuilder(this.model, requestData, this.options.excludedFields)

    return db.query[this.tableName].findMany(query).finally(() => { connection.close() })
  }

  /**
   *
   * @param {import('../query/requestParser.js').RequestData} requestData
   * @returns {Promise.<Object.<string, unknown>}
   */
  getById (requestData) {
    const query = queryBuilder(this.model, requestData, this.options.excludedFields)

    return db.query[this.tableName].findFirst(query).finally(() => { connection.close() })
  }

  /**
   *
   * @param {string} id
   * @param {Object.<string, unknown>} payload
   * @returns {Promise.<Object.<string, unknown>}
   */
  update (id, payload) {
    return db.update(this.model)
      .set(payload)
      .where(eq(this.model.id, id))
      .returning(this.returningFields)
  }
}
