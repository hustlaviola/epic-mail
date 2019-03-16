import ErrorHandler from '../../utils/ErrorHandler';
import Helper from '../../utils/Helper';
import pool from '../models/database';

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
    const { subject, message } = req.body;

    if (subject.length > 255) {
      return ErrorHandler.validationError(res, 400,
        `subject contains ${subject.length} characters, cannot be greater than 255`);
    }

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

    const query = 'SELECT * FROM messages WHERE id = $1';
    pool.query(query, [id], (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }

      if (data.rowCount < 1) {
        return ErrorHandler.validationError(res, 404, 'Message record does not exist');
      }
      return next();
    });
  }
}

export default MessageValidator;
