import ErrorHandler from '../../utils/ErrorHandler';
import Helper from '../../utils/Helper';
import pool from '../models/database';

/**
 * @class GroupValidator
 * @description Validates Group endpoint details
 * @exports GroupValidator
 */
class GroupValidator {
  /**
  * @method validateCreateGroup
  * @description Check if create-group details are valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof GroupValidator
  */
  static validateGroupName(req, res, next) {
    const regEx = Helper.regEx();
    let { name } = req.body;

    if (!name) {
      return ErrorHandler.validationError(res, 400,
        'Group must have a name');
    }

    name = name.trim();

    if (name.length > 50 || name.length < 3) {
      return ErrorHandler.validationError(res, 400,
        `name contains ${name.length} characters, must be between 3 and 50`);
    }

    if (!regEx.groupname.test(name)) {
      return ErrorHandler.validationError(res, 400,
        'Invalid input! name can only contain alphabets, underscores and digits');
    }
    return next();
  }

  /**
  * @method validateExistingGroup
  * @description Check if id is in valid format and if a group already exists
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof GroupValidator
  */
  static validateExistingGroup(req, res, next) {
    const regEx = Helper.regEx();
    const { id } = req.params;

    if (!regEx.id.test(id) || (id === '0')) {
      return ErrorHandler.validationError(res, 400, 'The given id is invalid');
    }

    const query = 'SELECT * FROM groups WHERE id = $1;';

    return pool.query(query, [id], (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      if (data.rowCount < 1) {
        return ErrorHandler.validationError(res, 404, 'Group does not exist');
      }
      return next();
    });
  }

  /**
  * @method validateMember
  * @description Check if user is a member of the group
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof GroupValidator
  */
  static validateMember(req, res, next) {
    const { id } = req.params;
    const memberId = req.user.id;
    const values = [id, memberId];
    const query = `SELECT * FROM groups, group_members WHERE groups.id = $1 
      AND group_members.member_id = $2 AND groups.id = group_members.group_id;`;

    return pool.query(query, values, (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      if (data.rowCount < 1) {
        return ErrorHandler.validationError(res, 404, 'You do not belong to this group');
      }
      return next();
    });
  }

  static validateGroupMessageFields(req, res, next) {
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
  * @method validateAdmin
  * @description Check if user is a group admin
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof GroupValidator
  */
  static validateAdmin(req, res, next) {
    const { id } = req.params;
    const memberId = req.user.id;
    const values = ['admin', memberId, id];
    const query = `SELECT * FROM group_members WHERE role = $1
      AND member_id = $2 AND group_id = $3;`;

    return pool.query(query, values, (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      if (data.rowCount < 1) {
        return ErrorHandler.validationError(res, 401, 'Require Admin access');
      }
      return next();
    });
  }

  /**
  * @method validateEmailsFormat
  * @description Check if email exists and of a valid format
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof GroupValidator
  */
  static validateEmailsFormat(req, res, next) {
    const regEx = Helper.regEx();
    const { emails } = req.body;
    const badEmails = [];
    if (!emails) {
      return ErrorHandler.validationError(res, 400, 'Email field cannot be empty');
    }
    const emailArray = emails.split(', ');
    emailArray.forEach(email => {
      if (!regEx.email.test(email)) {
        badEmails.push(email);
      }
    });

    if (badEmails.length) {
      return ErrorHandler.validationError(res, 400,
        `${badEmails} ${badEmails.length > 1 ? 'are' : 'is'} badly formatted`);
    }
    return next();
  }

  /**
  * @method validateMemberExistence
  * @description Check if user to be deleted is not in the group
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof GroupValidator
  */
  static validateMemberExistence(req, res, next) {
    const regEx = Helper.regEx();
    const { id } = req.params;
    const { memberId } = req.params;

    if ((!regEx.id.test(memberId) || (memberId === '0')) || (!regEx.id.test(id) || (id === '0'))) {
      return ErrorHandler.validationError(res, 400, 'The given id is invalid');
    }

    const values = [id, memberId];
    const query = 'SELECT * FROM group_members WHERE group_id = $1 and member_id = $2';

    pool.query(query, values, (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      if (data.rowCount < 1) {
        return ErrorHandler.validationError(res, 404, 'User does not exist');
      }
      return next();
    });
  }
}

export default GroupValidator;
