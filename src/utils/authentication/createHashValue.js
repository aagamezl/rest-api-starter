import { createHash } from 'node:crypto'

const createHashValue = (value, algorithm = 'sha512') => {
  return createHash(algorithm).update(value, 'utf8').digest('hex')
}

export default createHashValue
