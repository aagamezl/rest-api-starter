import { model } from './health.model.js'

export const HEALTH_CONTENT_TYPE = 'application/health+json; charset=utf-8'

/**
 * GET / status
 * @param {Request} req
 * @param {Response} res
 */
export const health = async (req, res) => {
  res.set('Content-Type', 'application/health+json').json(await model.check())
}
