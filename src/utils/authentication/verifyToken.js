import jwt from 'jsonwebtoken'

export const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new Error('Invalid Token'))
    }

    jwt.verify(token, secret, (error, token) => {
      if (error) {
        reject(error)
      }

      resolve(token)
    })
  })
}
