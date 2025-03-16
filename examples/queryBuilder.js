import { jsonApiQueryParser, queryBuilder } from '../src/common/index.js'

// const jsonApiQuery = {
//   resourceType: 'article',
//   identifier: '5',
//   relationships: false,
//   relationshipType: null,
//   queryData: {
//     include: [
//       // 'user',
//       // 'comment.author',
//       // 'ratings'
//       'posts.comments'
//     ],
//     fields: {
//       article: [
//         'title',
//         'body'
//       ]
//     },
//     sort: [
//       '-created_at'
//     ],
//     page: {
//       limit: 20
//     },
//     filter: {
//       like: {},
//       not: {},
//       lt: {},
//       lte: {},
//       gt: {},
//       gte: {}
//     }
//   }
// }

const url1 = '/article/5/relationships/comment'
const url2 = '/article/5/?include=user,comment.author,ratings&fields[article]=title,body&page[limit]=20&sort=-created_at'
const url3 = '/article/5?filter[name]=john%20doe&filter[age][lt]=15'
const url4 = '/article/5?filter[not][name]=jack'
const url5 = '/articles?include=author&fields[articles]=title,body,author&fields[people]=name'

const schema = {
  id: '2e6e4227-2334-408d-9442-195c1a285d94',
  created_at: 1731369454995
}

// Execute the query to fetch the result
console.log(queryBuilder(schema, jsonApiQueryParser(url1), ['password']))
console.log(queryBuilder(schema, jsonApiQueryParser(url2), ['password']))
console.log(queryBuilder(schema, jsonApiQueryParser(url3), ['password']))
console.log(queryBuilder(schema, jsonApiQueryParser(url4), ['password']))
console.log(queryBuilder(schema, jsonApiQueryParser(url5), ['password']))

// const users = await db.query.users.findMany({
//   with: {
//     posts: {
//       with: {
//         comments: true
//       }
//     }
//   }
// })
