/**
 * Retrieves the bearer token from an Authorization header value.
 *
 * @param {string} authHeader - The Authorization header value containing the bearer token.
 * @returns {string} - The bearer token.
 * @throws {Error} - If no bearer token was found in the Authorization header value.
*/
export const getToken = (authHeader) => {
  const regex = /^Bearer ([\S]+)$/

  const token = authHeader?.match(regex)

  if (!token) {
    throw new Error('No Bearer token was found')
  }

  return token[1]
}
