import pool from '../models/database';
import ErrorHandler from '../../utils/ErrorHandler';

/**
 * @class MessageController
 * @description
 * @exports MessageController
 */
class MessageController {
  /**
  * @method postMessage
  * @description Create a new message
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof MessageController
  */
  static postMessage(req, res) {
    let { subject, message } = req.body;

    subject = subject.trim();
    message = message.trim();

    const createdOn = new Date();

    const values = [createdOn, subject, message];
    const query = `INSERT INTO messages(createdon, subject, message)
      VALUES($1, $2, $3) RETURNING *`;

    pool.query(query, values, (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }

      return res.status(201).send({
        status: res.statusCode,
        data: data.rows[0],
      });
    });
  }
}

export default MessageController;
