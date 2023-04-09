export const getToken = (authHeader) => {
  const regex = /^Bearer ([\S]+)$/

  const token = authHeader?.match(regex)

  if (!token) {
    throw new Error('No Bearer token was found')
  }

  return token[1]
}
