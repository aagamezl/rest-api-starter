const schemas = {
  users: [
    {
      $id: 'User',
      type: 'object'
    }
  ],
  posts: [
    {
      $id: 'Post',
      type: 'object'
    }
  ]
}

console.log(Object.keys(schemas))

for (const [domain, schema] of Object.entries(schemas)) {
  console.log(domain, schema)
}
