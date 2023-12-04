// centralized error handler encapsulates error - handling related logic
const errorHandler = {
  /**
   * Handle regular error in the app and send it to the logger
   * @param {Error} error
   */
  handle: (error) => {
    errorHandler.info(error.message)
  },

  info: (message) => {
    console.error(message)
  }
}

export default errorHandler
