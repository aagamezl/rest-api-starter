import { logger } from './logger.js'

// centralized error handler encapsulates error - handling related logic
export const errorHandler = {
  /**
   * Handle regular error in the app and send it to the logger
   * @param {Error} error
   */
  handle: (error) => {
    logger.error(error.message)
  }
}
