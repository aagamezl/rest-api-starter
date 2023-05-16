// @ts-check
/** @module myModule */

// import JsonApiQueryParserClass from 'jsonapi-query-parser'
import { parseRequest } from './jsonApiParser.js'

// const jsonApiQueryParser = new JsonApiQueryParserClass()

/**
 * The complete OpenAPI Operation.
 *
 * @typedef Filter
 * @type {object}
 * @property {Object.<string, string>} gt    - Indicates a greater than filter.
 * @property {Object.<string, string>} gte   - Indicates a greater than or equal filter.
 * @property {Object.<string, string>} like  - Indicates a like filter.
 * @property {Object.<string, string>} lt    - Indicates a less than filter.
 * @property {Object.<string, string>} lte   - Indicates a less than or equal filter.
 * @property {Object.<string, string>} not   - Indicates a not filter.
 */

/**
 * An object representing page information.
 *
 * @typedef {Object} Page
 * @property {number} limit - The total number of record to retrieve.
 * @property {number} offset   - The current page number.
*/

/**
 * The complete OpenAPI Operation.
 *
 * @typedef QueryData
 * @type {object}
 * @property {Object.<string, string[]>} fields        - Indicates the fields to include in the query.
 * @property {Filter | Object.<string, string>} filter - Indicates the query filters.
 * @property {string[]} include                        - Indicates the related resources to include in the response.
 * @property {Page} page                               - Indicates the result pagination.
 * @property {string[]} sort                           - Indicates the query sorting.
 */

/**
 * Represent the Request Data for an JSON API URL
 *
 * @typedef RequestData
 * @type {object}
 * @property {string} identifier       - Indicates the record id.
 * @property {QueryData} queryData     - Indicates the query data.
 * @property {boolean} relationships   - Indicates if the request data include relationships.
 * @property {string} relationshipType - Indicates the relationsehip type.
 * @property {string} resourceType     - Indicates the resource type.
 */

/**
 *
 * @param {string} url
 * @returns {RequestData}
 */
export const requestParser = (url) => {
  // const requestData = jsonApiQueryParser.parseRequest(url)
  const requestData = parseRequest(url)

  const relationshipType = haveRelationships(
    requestData.queryData.include,
    Object.keys(requestData.queryData.fields)
  )

  if (relationshipType.length > 0) {
    requestData.relationships = true
    requestData.relationshipType = relationshipType[0]
  }

  return requestData
}

const haveRelationships = (a, b) => a.filter(x => b.includes(x))
