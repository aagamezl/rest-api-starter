import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { SEGMENTS } from '../segments.js'

const VALIDATE_OPTIONS = {
  abortEarly: false // include all errors
}

/**
 * Give format to the Joi error object
 *
 * @param {ValidationError} error
 * @param {string} source
 * @returns {object}
 */
const formatError = (error, source) => {
  const { details } = error
  const errors = details.map((item) => {
    return {
      key: item.context?.key,
      message: item.message
    }
  })

  return {
    status: StatusCodes.BAD_REQUEST,
    title: ReasonPhrases.BAD_REQUEST,
    details: {
      source,
      errors
    }
  }
}

/**
 *
 * @param {ValidationSchema} schema Joi schema
 * @returns {Function} The validation middleware
 */
export const validate = (schema) => {
  return async (req, res, next) => {
    if (schema[SEGMENTS.PARAMS] !== undefined) {
      const { error } = await schema[SEGMENTS.PARAMS]
        .validateAsync(req.params, VALIDATE_OPTIONS)
        .catch((error) => {
          return { error }
        })

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST)
          .json(formatError(error, SEGMENTS.PARAMS))
      }
    }

    if (schema[SEGMENTS.QUERY] !== undefined) {
      const { error } = await schema[SEGMENTS.QUERY]
        .validateAsync(req.query, VALIDATE_OPTIONS)
        .catch((error) => {
          return { error }
        })

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST)
          .json(formatError(error, SEGMENTS.QUERY))
      }
    }

    if (schema[SEGMENTS.BODY] !== undefined) {
      const { error } = await schema[SEGMENTS.BODY]
        .validateAsync(req.body, VALIDATE_OPTIONS)
        .catch((error) => {
          return { error }
        })

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST)
          .json(formatError(error, SEGMENTS.BODY))
      }
    }

    if (schema[SEGMENTS.FILES] !== undefined) {
      const { error } = await schema[SEGMENTS.FILES]
        .validateAsync((req).files, VALIDATE_OPTIONS)
        .catch((error) => {
          return { error }
        })

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST)
          .json(formatError(error, SEGMENTS.FILES))
      }
    }

    next()
  }
}
