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
    const { id } = req.user;
    const regEx = Helper.regEx();
    const { subject, message, email } = req.body;

    if (subject.length > 255) {
      return ErrorHandler.validationError(res, 400,
        `subject contains ${subject.length} characters, cannot be greater than 255`);
    }

    if (!message) {
      return ErrorHandler.validationError(res, 400,
        'message field cannot be empty');
    }

    if (!email) {
      const values = [id, subject, message, 'draft'];
      const query = `INSERT INTO messages(sender_id, subject, message, status)
        VALUES($1, $2, $3, $4) RETURNING *`;
      const sql = 'INSERT INTO user_messages(message_id, receiver_id, status) VALUES ($1, $2, $3)';
      return pool.query(query, values, (err, data) => {
        if (err) {
          return ErrorHandler.databaseError(res);
        }
        const messageId = data.rows[0].id;
        pool.query(sql, [messageId, id, 'draft'], error => {
          if (error) {
            return ErrorHandler.databaseError(res);
          }
        });
        return res.status(201).send({
          status: 'success',
          data: data.rows,
          message: 'draft saved',
        });
      });
    }

    if (!regEx.email.test(email)) {
      return ErrorHandler.validationError(res, 400, 'Invalid email format');
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
    const userId = req.user.id;
    const { id } = req.params;
    const values = [userId, id];

    if (!regEx.id.test(id) || (id === '0')) {
      return ErrorHandler.validationError(res, 400, 'The given id is invalid');
    }

    const query = `SELECT * FROM messages, user_messages WHERE (sender_id = $1 OR receiver_id = $1)
      AND id = $2 AND id = message_id`;
    pool.query(query, values, (err, data) => {
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
