import jwt from 'jsonwebtoken'

export const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, token) => {
      if (error) {
        reject(error)
      }

      resolve(token)
    })
  })
}
