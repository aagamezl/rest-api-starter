// Exclude keys from user
export const excludeFields = (entity, keys) => {
  // for (const key of keys) {
  //   delete user[key]
  // }

  // return user
  return Object.keys(entity).reduce((result, key) => {
    if (!keys.includes(key)) {
      result[key] = entity[key]
    }

    return result
  }, {})
}
