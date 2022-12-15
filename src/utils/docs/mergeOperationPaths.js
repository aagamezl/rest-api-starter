/**
 * The complete OpenAPI Operation.
 *
 * @typedef Operation
 * @type {object}
 * @property {Object.<string, object>} paths - Indicates the Operation path for an entity.
 */

/**
 *
 * @param {Operation[]} operations
 * @returns
 */
export const mergeOperationPaths = (operations) => {
  return operations.reduce((result, entity) => {
    result.paths = { ...result.paths, ...entity.paths }

    return result
  }, { paths: {} })
}
