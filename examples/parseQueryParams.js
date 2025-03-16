import { parseQueryParams } from '../src/common/index.js'

// const url1 = '/users'
// const url2 = '/users?sort=-first_name'
// const url3 = '/users?sort=-first_name&limit=10'
// const url4 = '/users?sort=-first_name&limit=10&offset=2'
const url1 = '/article/5/relationships/comment'
const url2 = '/article/5/?include=user,comment.author,ratings&fields[article]=title,body&page[limit]=20&sort=-createdon'
const url3 = '/article/5?filter[name]=john%20doe&filter[age][lt]=15'
const url4 = '/article/5?filter[not][name]=jack'
const url5 = '/articles?include=author&fields[articles]=title,body,author&fields[people]=name'

console.log(parseQueryParams(url1))
console.log(parseQueryParams(url2))
console.log(parseQueryParams(url3))
console.log(parseQueryParams(url4))
console.log(parseQueryParams(url5))
