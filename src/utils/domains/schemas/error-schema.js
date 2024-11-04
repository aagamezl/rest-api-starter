import { Type } from '@sinclair/typebox'

/**
 *
 * @param {string} description
 * @returns {import('@sinclair/typebox').TObject}
 */
export const errorSchema = (description, contentType) => {
  return Type.Object({
    type: Type.String(),
    status: Type.Number(),
    title: Type.String(),
    details: Type.String()
  })
}
