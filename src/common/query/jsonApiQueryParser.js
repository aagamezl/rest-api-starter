/**
 * Parses the `page` parameter into an object of pagination data.
 * @param {URLSearchParams} searchParams - URLSearchParams containing the page parameters.
 * @returns {Object.<string, number>} Parsed pagination info.
 */
// const parsePagination = (searchParams) => {
//   const pagination = {}

//   const limit = searchParams.get('limit')
//   const offset = searchParams.get('offset')

//   if (limit) {
//     pagination.limit = parseInt(limit, 10)
//   }

//   if (offset) {
//     pagination.offset = parseInt(offset, 10) ?? 0
//   }

//   return pagination
// }

export const jsonApiQueryParser = (url) => {
  const urlObj = new URL(decodeURIComponent(url), 'http://example.com') // Base needed for relative URLs
  // const searchParams = urlObj.searchParams
  const pathSegments = urlObj.pathname.split('/').filter(Boolean)

  // return {
  //   ...parsePagination(searchParams),
  //   sort: parseSort(searchParams.get('sort') ?? '')
  // }

  const [resourceType, identifier, relationships, relationshipType] = pathSegments

  return {
    resourceType,
    identifier: identifier || null,
    relationships: !!relationships,
    relationshipType: relationshipType || null,
    queryData: parseQuery(urlObj.searchParams)
  }
}

/**
 * Parses a JSON:API query object from URLSearchParams.
 * @param {URLSearchParams} searchParams - Query parameters as URLSearchParams.
 * @returns {QueryData} Parsed query structure.
 */
const parseQuery = (searchParams) => ({
  include: parseInclude(searchParams.get('include') || ''),
  fields: parseFields(searchParams),
  sort: parseSort(searchParams.get('sort') || ''),
  page: parsePage(searchParams),
  filter: parseFilter(searchParams)
})

/**
 * Parses the `include` parameter into an array of relationships.
 * @param {string} include - Include parameter string.
 * @returns {Array<string>} List of relationships to include.
 */
const parseInclude = (include) => include.split(',').map(relation => relation.trim()).filter(Boolean)

/**
 * Parses the `fields` parameter into an object of sparse fieldsets.
 * @param {URLSearchParams} searchParams - URLSearchParams containing the fields parameters.
 * @returns {Object.<string, Array<string>>} Parsed sparse fieldsets.
 */
const parseFields = (searchParams) => {
  const fields = {}

  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith('fields[')) {
      const resourceType = key.match(/fields\[(.*)\]/)?.[1]
      if (resourceType) {
        fields[resourceType] = value.split(',').map(field => field.trim())
      }
    }
  }

  return fields
}

/**
 * Parses the `sort` parameter into an array of sort criteria strings.
 * @param {string} sort - Sort parameter string.
 * @returns {Array<string>} Parsed sort criteria.
 */
const parseSort = (sort) => sort.split(',').filter(Boolean)

/**
 * Parses the `page` parameter into an object of pagination data.
 * @param {URLSearchParams} searchParams - URLSearchParams containing the page parameters.
 * @returns {Object.<string, number>} Parsed pagination info.
 */
const parsePage = (searchParams) => {
  const pagination = {}
  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith('page[')) {
      const pageKey = key.match(/page\[(.*)\]/)?.[1]
      if (pageKey) {
        pagination[pageKey] = parseInt(value, 10)
      }
    }
  }
  return pagination
}

/**
 * Parses the `filter` parameter, supporting operators like `lt`, `lte`, `gt`, `gte`, `like`, and `not`.
 * Operator placement can be before or after the field name (e.g., `filter[lt][age]` or `filter[age][lt]`).
 * @param {URLSearchParams} searchParams - URLSearchParams containing the filter parameters.
 * @returns {FilterData} Parsed filter structure.
 */
const parseFilter = (searchParams) => {
  const filterData = {
    like: {},
    not: {},
    lt: {},
    lte: {},
    gt: {},
    gte: {}
  }

  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith('filter[')) {
      const filterMatch = key.match(/filter\[(.*?)\](?:\[(.*?)\])?/)
      const [, first, second] = filterMatch || []

      // Alechirsh filter type implementation
      // If the operator comes first, map accordingly
      if (isOperator(first)) {
        filterData[first][second] = value
      } else if (isOperator(second)) { // If the operator comes after the field name, map accordingly
        filterData[second][first] = value
      } else { // If no operator, assign directly to filterData
        filterData[first] = value
      }
    }
  }

  return filterData
}

/**
 * Helper function to check if a given string is a recognized filter operator.
 * @param {string} operator - String to check.
 * @returns {boolean} True if the string is an operator, false otherwise.
 */
const isOperator = (operator) => ['like', 'not', 'lt', 'lte', 'gt', 'gte'].includes(operator)
