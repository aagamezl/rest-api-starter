import JsonApiQueryParserClass from 'jsonapi-query-parser'

const jsonApiQueryParser = new JsonApiQueryParserClass()

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
