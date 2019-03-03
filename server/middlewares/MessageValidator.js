import ErrorHandler from '../utils/ErrorHandler';
import Helper from '../utils/Helper';
import messages from '../models/messageModel';

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
        'message field cannot be empty');
    }
    return next();
  }

  /**
  * @method validateId
  * @description Check if id is valid and if message exist
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof MessageValidator
  */
  static validateId(req, res, next) {
    const regEx = Helper.regEx();
    const { id } = req.params;

    if (!regEx.id.test(id) || (id === '0')) {
      return ErrorHandler.validationError(res, 400, 'The given id is invalid');
    }

    const mail = messages.find(message => message.id === parseInt(req.params.id, 10));
    if (!mail) {
      return ErrorHandler.validationError(res, 404, 'Message with the given id does not exist');
    }
    return next();
  }
}

export default MessageValidator;
