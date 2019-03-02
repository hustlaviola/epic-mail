import ErrorHandler from '../utils/ErrorHandler';

/**
 * @class MessageValidator
 * @description Validates message endpoint details
 * @exports MessageValidator
 */
class MessageValidator {
  /**
  * @method validatePost
  * @description Check if post message details are valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof MessageValidator
  */
  static validatePost(req, res, next) {
    const { message } = req.body;

    if (!message) {
      return ErrorHandler.validationError(res, 400,
        'message field is required');
    }
    return next();
  }
}

export default MessageValidator;
