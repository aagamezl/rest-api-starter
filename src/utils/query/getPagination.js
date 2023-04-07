import { config } from './../../../config/index.js'

/**
 * JSON:API Page
 *
 * @typedef QueryDataPage
 * @type {object}
 * @property {string} limit
 * @property {string} offet
 */

/**
 * Page
 *
 * @typedef Page
 * @type {object}
 * @property {number} limit
 * @property {number} offet
 */

/**
 *
 * @param {QueryDataPage} page
 * @returns {Page}
 */
export const getPagination = (page) => {
  const { offset, limit } = page

  return {
    offset: Number(offset ?? 0),
    limit: Number(limit ?? config.database.pagination.limit)
  }
}
