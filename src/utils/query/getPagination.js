import config from './../../../config/index.js'

/**
 * JSON:API Page
 *
 * @typedef QueryDataPage
 * @type {object}
 * @property {string} limit
 * @property {string} offset
 */

/**
 * Page
 *
 * @typedef Page
 * @type {object}
 * @property {number} limit
 * @property {number} offset
 */

/**
 *
 * @param {QueryDataPage} page
 * @returns {Page}
 */
const getPagination = (page) => {
  const { offset, limit } = page

  return {
    offset: Number(offset ?? 0),
    limit: Number(limit ?? config.database.pagination.limit)
  }
}

export default getPagination
