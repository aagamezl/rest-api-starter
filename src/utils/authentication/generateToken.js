import jwt from 'jsonwebtoken'

const generateToken = (email, tokenSecret, expiresIn) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ data: email }, tokenSecret, { expiresIn }, (error, token) => {
      if (error) {
        return reject(error)
      }

      resolve(token)
    })
  })
}

export default generateToken
