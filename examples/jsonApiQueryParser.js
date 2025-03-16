import { jsonApiQueryParser } from '../src/common/query/jsonApiQueryParser.js'

const url1 = '/article/5/relationships/comment'
const url2 = '/article/5/?include=user,comment.author,ratings&fields[article]=title,body&page[limit]=20&sort=-created_at'
const url3 = '/article/5?filter[name]=john%20doe&filter[age][lt]=15'
const url4 = '/article/5?filter[not][name]=jack'
const url5 = '/articles?include=author&fields[articles]=title,body,author&fields[people]=name'

console.log(JSON.stringify(jsonApiQueryParser(url1), null, 2))
console.log(JSON.stringify(jsonApiQueryParser(url2), null, 2))
console.log(JSON.stringify(jsonApiQueryParser(url3), null, 2))
console.log(JSON.stringify(jsonApiQueryParser(url4), null, 2))
console.log(JSON.stringify(jsonApiQueryParser(url5), null, 2))
