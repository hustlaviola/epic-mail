import messages from '../models/messageModel';

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

    const id = messages.length > 0
      ? messages[messages.length - 1].id + 1 : 1;

    const createdOn = new Date();
    const parentMessageId = messages.length > 0
      ? messages[messages.length - 1].parentMessageId + 1 : 1;
    const status = 'sent';

    const mail = {
      id, createdOn, subject, message, parentMessageId, status,
    };

    messages.push(mail);
    return res.status(201).send({
      status: res.statusCode,
      data: mail,
    });
  }

  static getMessages(req, res) {
    const receivedMessages = [];

    messages.forEach((message) => {
      if (message.status === 'read' || message.status === 'unread') {
        receivedMessages.push(message);
      }
    });

    return res.status(200).send({
      status: res.statusCode,
      data: receivedMessages,
    });
  }
}

export default MessageController;
