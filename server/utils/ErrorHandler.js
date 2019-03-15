/**
 * @class ErrorHandler
 * @description A class to handle common errors
 * @exports ErrorHandler
 */
class ErrorHandler {
  /**
   * @method validationError
   * @description A custom error message method
   * @static
   * @param {object} res - Response object
   * @param {integer} code - Status code
   * @param {string} message - Error message
   * @returns {object} JSON response
   * @memberof ErrorHandler
   */
  static validationError(res, code, message) {
    return res.status(code).send({
      status: res.statusCode,
      error: message,
    });
  }

  /**
   * @method routeError
   * @description An error handler for all invalid routes
   * @static
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof ErrorHandler
   */
  static routeError(res) {
    return res.status(404).send({
      status: res.statusCode,
      error: 'The requested url was not found on this server',
    });
  }

  /**
   * @method databaseError
   * @description An handler for database error
   * @static
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof ErrorHandler
   */
  static databaseError(res) {
    return res.status(500).send({
      status: res.statusCode,
      error: 'Database Error',
    });
  }
}

export default ErrorHandler;
