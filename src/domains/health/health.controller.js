import * as model from './health.model.js'

/**
 * GET / status
 * @param {Request} req
 * @param {Response} res
 */
export const health = async (req, res) => {
  res.set('Content-Type', 'application/health+json').json(await model.check())
}
