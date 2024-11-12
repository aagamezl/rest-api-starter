import { jsonApiQueryParser } from './jsonApiQueryParser.js'

/**
 *
 * @param {string} url
 * @returns {RequestData}
 */
export const requestParser = (url) => {
  const requestData = jsonApiQueryParser(url)

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
