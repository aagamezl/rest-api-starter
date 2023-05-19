// @ts-check

import { merge } from '@devnetic/utils'

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
 * [Defines the available parse function names and their matching patterns.]
 **/
const PARSE_PARAM = {
  parseInclude: /^include=(.*?)/i,
  parseFields: /^fields\[(.*?)\]=.*?$/i,
  parsePage: /^page\[(.*?)\]=.*?$/i,
  parseSort: /^sort=(.*?)/i,
  parseFilter: /^filter\[([^\]]*?)\]=.*?$/i,
  parseFilterType: /^filter\[(.*?)\]\[(.*?)\]=(.*?)$/i
}

const PARSE_FUNCTIONS = {
  /**
   *
   * @param {string} query
   * @returns {object}
   */
  parseInclude: (query) => parseInclude(query),

  /**
   *
   * @param {string} query
   * @returns {object}
   */
  parseFields: (query) => parseFields(query),

  /**
   *
   * @param {string} query
   * @returns {object}
   */
  parseFilter: (query) => parseFilter(query),

  /**
   *
   * @param {string} query
   * @returns {object}
   */
  parseFilterType: (query) => parseFilterType(query),

  /**
   *
   * @param {string} query
   * @returns {object}
   */
  parsePage: (query) => parsePage(query),

  /**
   *
   * @param {string} query
   * @returns {object}
   */
  parseSort: (query) => parseSort(query)
}

/**
 * Cuts up the endpoint path to define the requested resource, identifier and
 * relationships.
 *
 * @param {string} endpointString Required endpoint string. Example: "articles/6/comments".
 * @returns {object} requestData Parsed request information as object.
 *
 **/
const parseEndpoint = (endpointString) => {
  const requestObject = {}
  const requestSplit = trimSlashes(endpointString).split('/')

  requestObject.resourceType = requestSplit[0]
  requestObject.identifier = (requestSplit.length >= 2 ? requestSplit[1] : null)
  requestObject.relationships = (requestSplit.length >= 3 && requestSplit[2].toLowerCase() === 'relationships')

  if (requestObject.relationships) {
    if (!requestSplit[3]) {
      throw new ReferenceError('Request missing relationship type')
    }

    requestObject.relationshipType = requestSplit[3]
  } else {
    requestObject.relationshipType = (requestSplit.length === 3 ? requestSplit[2] : null)
  }

  return requestObject
}

/**
 * Parses the fields query string piece and returns the modified _requestDataSubset.
 *
 * @param {string} fieldsString Required fields query string piece. Example: "fieldsarticle=title,body".
 * @return {object} requestDataSubset Returning the modified request data.
 *
 **/
const parseFields = (fieldsString) => {
  const fieldNameRegex = /^fields.*?=(.*?)$/i
  const requestDataSubset = { fields: {} }

  const targetResource = fieldsString.replace(PARSE_PARAM.parseFields, (match, $1) => {
    return $1
  })

  const targetFieldsString = fieldsString.replace(fieldNameRegex, (match, $1) => {
    return $1
  })

  requestDataSubset.fields[targetResource] = !requestDataSubset.fields[targetResource]
    ? []
    : requestDataSubset.fields[targetResource]

  const targetFields = targetFieldsString.split(',')

  targetFields.forEach(targetField => {
    requestDataSubset.fields[targetResource].push(targetField)
  })

  return requestDataSubset
}

/**
 * Note: The are no proper specifications for this parameter yet.
 * For now the filter is implemented similar to the fields parameter. Values
 * should be url encoded to allow for special characters.]
 *
 * @param {string} filterString Required sort query string piece. Example: "filter[name]=John%20Doe".
 * @return {object} requestDataSubset Returning the modified request data.
 *
 **/
const parseFilter = (filterString) => {
  const filterNameRegex = /^filter.*?=(.*?)$/i
  const requestDataSubset = {}

  const targetColumn = filterString.replace(PARSE_PARAM.parseFilter, (match, $1) => {
    return $1
  })

  const targetFilterString = filterString.replace(filterNameRegex, (match, $1) => {
    return $1
  })

  requestDataSubset.filter[targetColumn] = targetFilterString

  return requestDataSubset
}

const parseFilterType = (filterString) => {
  const requestDataSubset = {}

  const targetType = filterString.replace(PARSE_PARAM.parseFilterType, (match, $1) => {
    return $1
  })

  const targetColumn = filterString.replace(PARSE_PARAM.parseFilterType, (match, $1, $2) => {
    return $2
  })

  const targetFilterString = filterString.replace(PARSE_PARAM.parseFilterType, (match, $1, $2, $3) => {
    return $3
  })

  if (requestDataSubset.filter[targetType]) {
    requestDataSubset.filter[targetType][targetColumn] = targetFilterString
  }

  return requestDataSubset
}

/**
 * Parses the include query string piece and returns the modified _requestDataSubset.
 *
 * @param {string} includeString Required include string piece. Example: "include=comments,user".
 * @return {object} requestDataSubset Returning the modified request data.
 *
 **/
const parseInclude = (includeString) => {
  // Kept simple for now, does not parse dot-separated relationships (comment.user)
  const targetString = includeString.split('=')[1]
  const requestDataSubset = {}

  requestDataSubset.include = targetString.split(',')

  return requestDataSubset
}

/**
 * Parses the page query string piece and returns the modified _requestDataSubset.
 *
 * @param {string} pageString Required page query string piece. Example: "page[offset]=20".
 * @return {object} requestDataSubset Returning the modified request data.
 *
 **/
const parsePage = (pageString) => {
  const pageValueRegex = /^page.*?=(.*?)$/i
  const requestDataSubset = { page: {} }

  const pageSettingKey = pageString.replace(PARSE_PARAM.parsePage, (match, $1) => {
    return $1
  })

  const pageSettingValue = pageString.replace(pageValueRegex, (match, $1) => {
    return $1
  })

  requestDataSubset.page[pageSettingKey] = Number(pageSettingValue)

  return requestDataSubset
}

/**
 * Parses the sort query string piece and returns the modified _requestDataSubset.
 *
 * @param {string} sortString Required sort query string piece. Example: "sort=-created,title".
 * @return {object} requestDataSubset Returning the modified request data.
 *
 **/
const parseSort = (sortString) => {
  const targetString = sortString.split('=')[1]
  const requestDataSubset = {
    sort: targetString.split(',')
  }

  return requestDataSubset
}

/**
 * Cuts up the query parameters and sends each piece to the delegate function.
 *
 * @param {string} queryString Required query string. Example: "?include=comments,user&fieldsarticle]=title,body"
 * @return {object} requestData [Parsed request information as object.
 *
 **/
const parseQueryParameters = (queryString) => {
  // let querySplit = queryString.split('&')

  // querySplit = querySplit.map((queryPart) => {
  //   return decodeURIComponent(queryPart)
  // })

  // querySplit.forEach(delegateToParser, requestDataSubset)

  // return requestDataSubset

  return queryString.split('&')
    .map((queryPart) => {
      return decodeURIComponent(queryPart)
    })
    .reduce((result, query) => {
      for (const functionName in PARSE_PARAM) {
        if (PARSE_PARAM[functionName].test(query)) {
          result = merge(
            result,
            PARSE_FUNCTIONS[functionName](query)
          )

          break
        }
      }

      return result
    }, {})
}

/**
 * Defines the requestData object to modify via given queryString. NOTE: filter
 * query is not implemented due to lack of specs.
 *
 * @param {string} url Required url containing the endpoint path and query string.
 * @returns {RequestData} requestData Parsed request information as object.
 *
 **/
export const parseRequest = (url) => {
  const requestData = {
    resourceType: null,
    identifier: null,
    relationships: false,
    relationshipType: null,
    queryData: {
      include: [],
      fields: {},
      sort: [],
      page: {},
      filter: {
        like: {},
        not: {},
        lt: {},
        lte: {},
        gt: {},
        gte: {}
      }
    }
  }

  const urlSplit = url.split('?')
  const endpointData = parseEndpoint(urlSplit[0])

  if (urlSplit[1]) {
    requestData.queryData = merge(
      requestData.queryData,
      parseQueryParameters(urlSplit[1])
    )
  }

  return merge(requestData, endpointData)
}

/**
 * Slash trim to avoid faulty endpoint mapping. Runs recursively to remove any
 * double slash errors.
 *
 * @param {string} input Required input to be trimmed. Example: "/article/1/".
 * @returns {string} Returning the modified string.
 *
 **/
const trimSlashes = (input) => {
  const slashPattern = /(^\/)|(\/$)/
  const trimmed = input.replace(slashPattern, '')

  if (slashPattern.test(trimmed)) {
    return trimSlashes(trimmed)
  } else {
    return trimmed
  }
}
