// @ts-check

import { config } from './../../../config/index.js'

/**
 *
 * @param {import('./requestParser.js').Page} page
 * @returns {import('./requestParser.js').Page}
 */
export const getPagination = (page) => {
  const { offset, limit } = page

  return {
    offset: offset ?? 0,
    limit: limit ?? config.database.pagination.limit
  }
}
