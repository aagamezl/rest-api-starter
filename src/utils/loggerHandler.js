import logger from './logger.js'

// centralized error handler encapsulates error - handling related logic
const loggerHandler = {
  /**
   * Handle regular error in the app and send it to the logger
   * @param {Error} error
   */
  error: (error) => {
    logger.error(error.message)
  },

  /**
   *
   * @param {string} message
   */
  info: (message) => {
    logger.info(message)
  }
}

export default loggerHandler
