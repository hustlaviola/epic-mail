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
    const { email } = req.body;
    let { subject, message } = req.body;
    subject = subject.trim();
    message = message.trim();
    message = message.replace(/  +/g, ' ');
    const sql = 'SELECT id FROM users WHERE email = $1';
    const createdOn = new Date();
    const status = 'sent';
    pool.query(sql, [email], (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      if (data.rowCount < 1) {
        return ErrorHandler.validationError(res, 404, 'User does not exist');
      }
      const receiverId = data.rows[0].id;
      const values = [id, createdOn, subject, message, status];
      const query = `INSERT INTO messages(sender_id, createdon, subject, message, status)
        VALUES($1, $2, $3, $4, $5) RETURNING id, createdon, subject, message, status`;

      pool.query(query, values, (error, info) => {
        if (error) {
          return ErrorHandler.databaseError(res);
        }
        const messageId = info.rows[0].id;
        const sql1 = `INSERT INTO user_messages(message_id, receiver_id, createdon)
          VALUES($1, $2, $3)`;

        pool.query(sql1, [messageId, receiverId, createdOn], error1 => {
          if (error1) {
            return ErrorHandler.databaseError(res);
          }
          return res.status(201).send({
            status: 'success',
            data: info.rows,
          });
        });
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
    const query = `SELECT id, messages.createdon, subject, message, sender_id, receiver_id,
      parentmessageid FROM user_messages, messages
      WHERE (receiver_id = $1 AND message_id = id) OR (sender_id = $1 AND message_id = id)`;

    pool.query(query, [id], (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      return res.status(200).send({
        status: 'success',
        data: data.rows,
      });
    });
  }

  /**
  * @method getUnread
  * @description Retrieve all unread messages
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof MessageController
  */
  static getUnread(req, res) {
    const { id } = req.user;

    const value = [id, 'unread'];
    const query = `SELECT id, messages.createdon, subject, message, sender_id, receiver_id,
      parentmessageid, user_messages.status FROM messages, user_messages WHERE
      receiver_id = $1 AND user_messages.status = $2 AND id = message_id`;

    pool.query(query, value, (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      const mails = data.rows;
      return res.status(200).send({
        status: 'success',
        data: mails,
      });
    });
  }

  /**
  * @method getSent
  * @description Retrieve all unread messages
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof MessageController
  */
  static getSent(req, res) {
    const { id } = req.user;

    const value = [id, 'sent'];
    const query = `SELECT id, messages.createdon, subject, message, sender_id, receiver_id,
      parentmessageid, messages.status FROM messages, user_messages WHERE
      sender_id = $1 AND messages.status = $2 AND id = message_id`;

    pool.query(query, value, (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      const mails = data.rows;
      return res.status(200).send({
        status: 'success',
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
    const { id } = req.user;
    const messageId = req.params.id;
    let sql;
    const query = 'SELECT sender_id FROM messages WHERE id = $1';

    pool.query(query, [messageId], (error, info) => {
      if (error) {
        return ErrorHandler.databaseError(res);
      }
      const userId = info.rows[0].sender_id;
      if (userId === id) {
        sql = `SELECT id, messages.createdon, subject, message, sender_id, receiver_id,
          parentmessageid, messages.status FROM messages, user_messages WHERE
          (sender_id = $1 OR receiver_id = $1) AND id = $2 AND id = message_id`;
      } else {
        sql = `SELECT id, messages.createdon, subject, message, sender_id, receiver_id,
          parentmessageid, user_messages.status FROM messages, user_messages WHERE
          (sender_id = $1 OR receiver_id = $1) AND id = $2 AND id = message_id`;
      }
      pool.query(sql, [id, messageId], (err, data) => {
        if (err) {
          return ErrorHandler.databaseError(res);
        }

        return res.status(200).send({
          status: 'success',
          data: data.rows,
        });
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
    const { id } = req.user;
    const messageId = req.params.id;
    const query = 'SELECT sender_id FROM messages WHERE id = $1';
    let sql;
    pool.query(query, [messageId], (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      const userId = data.rows[0].sender_id;
      if (userId === id) {
        sql = 'DELETE FROM messages WHERE id = $1';
        return pool.query(sql, [messageId], error => {
          if (error) {
            return ErrorHandler.databaseError(res);
          }
          return res.status(200).send({
            status: 'success',
            data: [{ message: 'Message record has been deleted' }],
          });
        });
      }
      sql = `UPDATE user_messages SET receiver_id = null FROM messages WHERE message_id = $1
        AND receiver_id = $2;`;
      return pool.query(sql, [messageId, id], error => {
        if (error) {
          return ErrorHandler.databaseError(res);
        }
        return res.status(200).send({
          status: 'success',
          data: [{ message: 'Message record has been deleted' }],
        });
      });
    });
  }
}

export default MessageController;
