import { logger } from './logger.js'

// centralized error handler encapsulates error - handling related logic
const errorHandlerProd = {
  /**
   * Handle regular error in the app and send it to the logger
   * @param {Error} error
   * @param {String} level
   */
  handle: (error, level = 'error') => {
    logger[level](error.message)
  }
}

const errorHandlerTest = {

  /**
   * Handle regular error in the app and send it to the logger
   * @param {Error} error
   */
  handle: () => { }
}

// For test environment we don't want to log errors
export const errorHandler = process.env.NODE_ENV === 'production'
  ? errorHandlerProd
  : errorHandlerTest
