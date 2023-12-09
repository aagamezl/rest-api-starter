import jwt from 'jsonwebtoken'

/**
 *
 * @param {string} token
 * @param {string} secret
 * @returns {boolean}
 * @throws {import('jsonwebtoken').VerifyErrors}
 */
const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error) => {
      if (error) {
        reject(error)
      }

      resolve(true)
    })
  })
}

export default verifyToken
