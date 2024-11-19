/**
 * Parses the `page` parameter into an object of pagination data.
 * @param {URLSearchParams} searchParams - URLSearchParams containing the page parameters.
 * @returns {Object.<string, number>} Parsed pagination info.
 */
const parsePagination = (searchParams) => {
  const pagination = {}

  const limit = searchParams.get('limit')
  const offset = searchParams.get('offset')

  if (limit) {
    pagination.limit = parseInt(limit, 10)
  }

  if (offset) {
    pagination.offset = parseInt(offset, 10) ?? 0
  }

  return pagination
}

/**
 * Parses the `sort` parameter into an array of sort criteria strings.
 * @param {string} sort - Sort parameter string.
 * @returns {Array<string>} Parsed sort criteria.
 */
const parseSort = (sort) => sort.split(',').filter(Boolean)

export const parseQueryParams = (url) => {
  const urlObj = new URL(decodeURIComponent(url), 'http://example.com') // Base needed for relative URLs
  const searchParams = urlObj.searchParams

  return {
    ...parsePagination(searchParams),
    sort: parseSort(searchParams.get('sort') ?? '')
  }
}
