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
    const { id } = req.user;
    let { subject, message } = req.body;

    subject = subject.trim();
    message = message.trim();

    const createdOn = new Date();

    const values = [id, createdOn, subject, message];
    const query = `INSERT INTO messages(user_id, createdon, subject, message)
      VALUES($1, $2, $3, $4) RETURNING *`;

    pool.query(query, values, (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }

      return res.status(201).send({
        status: res.statusCode,
        data: [data.rows[0]],
      });
    });
  }

  /**
  * @method getMessages
  * @description Get all received messages
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof MessageController
  */
  static getMessages(req, res) {
    const { id } = req.user;
    const values = [id, 'read', 'unread'];
    const query = 'SELECT * FROM messages WHERE user_id = $1 AND status = $2 OR status = $3';

    pool.query(query, values, (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      return res.status(200).send({
        status: res.statusCode,
        data: data.rows,
      });
    });
  }

  /**
  * @method getMails
  * @description Retrieve all sent or unread messages
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof MessageController
  */
  static getMails(req, res) {
    const { id } = req.user;
    const mailType = req.url.split('/')[2];

    const value = [id, mailType];
    const query = 'SELECT * FROM messages WHERE user_id = $1 AND status = $2';

    pool.query(query, value, (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      const mails = data.rows;
      return res.status(200).send({
        status: res.statusCode,
        data: mails,
      });
    });
  }

  /**
  * @method getMessage
  * @description Retrieve a specific message
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof MessageController
  */
  static getMessage(req, res) {
    const { id } = req.params;

    const query = 'SELECT * FROM messages WHERE id = $1';
    pool.query(query, [id], (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }

      return res.status(200).send({
        status: res.statusCode,
        data: data.rows,
      });
    });
  }

  /**
  * @method deleteMessage
  * @description Delete a specific messages
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof MessageController
  */
  static deleteMessage(req, res) {
    const { id } = req.params;

    const query = 'DELETE FROM messages WHERE id = $1';

    pool.query(query, [id], err => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }

      res.status(200).send({
        status: res.statusCode,
        data: [{ message: 'Message record has been deleted' }],
      });
    });
  }
}

export default MessageController;
