import { Type } from '@sinclair/typebox'

/**
 *
 * @param {string} description
 * @returns {import('@sinclair/typebox').TObject}
 */
const errorSchema = (description) => {
  return Type.Object(
    {
      type: Type.String(),
      status: Type.Number(),
      title: Type.String(),
      details: Type.String()
    },
    { description }
  )
}

export default errorSchema
