import JsonApiQueryParserClass from 'jsonapi-query-parser'

const jsonApiQueryParser = new JsonApiQueryParserClass()

/**
 * The complete OpenAPI Operation.
 *
 * @typedef Filter
 * @type {object}
 * @property {Record<string, string>} gt    - Indicates the database provider [postgres|mysql|oracle].
 * @property {Record<string, string>} gte   - Indicates the database provider [postgres|mysql|oracle].
 * @property {Record<string, string>} like  - Indicates the database provider [postgres|mysql|oracle].
 * @property {Record<string, string>} lt    - Indicates the database provider [postgres|mysql|oracle].
 * @property {Record<string, string>} lte   - Indicates the database provider [postgres|mysql|oracle].
 * @property {Record<string, string>} not   - Indicates the database provider [postgres|mysql|oracle].
 */

/**
 * The complete OpenAPI Operation.
 *
 * @typedef QueryData
 * @type {object}
 * @property {Record<string, string[]>} fields  - Indicates the database provider [postgres|mysql|oracle].
 * @property {Filter | Record<string, string>} filter                    - Indicates the database provider [postgres|mysql|oracle].
 * @property {string[]} include                 - Indicates the database provider [postgres|mysql|oracle].
 * @property {Page} page                      - Indicates the database provider [postgres|mysql|oracle].
 * @property {string[]} sort                    - Indicates the database provider [postgres|mysql|oracle].
 */

/**
 * The complete OpenAPI Operation.
 *
 * @typedef RequestData
 * @type {object}
 * @property {string} identifier       - Indicates the database provider [postgres|mysql|oracle].
 * @property {QueryData} queryData     - Indicates the database user.
 * @property {boolean} relationships   - Indicates the database password.
 * @property {string} relationshipType - Indicates the database host.
 * @property {string} resourceType     - Indicates the database port.
 */

/**
 *
 * @param {string} url
 * @returns {RequestData}
 */
export const queryParser = (url) => {
  const requestData = jsonApiQueryParser.parseRequest(url)

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
