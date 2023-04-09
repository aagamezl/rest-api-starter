import { createHash } from 'node:crypto'

export const createHashValue = (value, algorithm = 'sha512') => {
  return createHash(algorithm).update(value, 'utf8').digest('hex')
}
