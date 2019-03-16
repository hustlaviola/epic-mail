import ErrorHandler from '../../utils/ErrorHandler';
import Helper from '../../utils/Helper';

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
  static validateCreateGroup(req, res, next) {
    const regEx = Helper.regEx();
    let { name } = req.body;

    name = name.trim();

    if (!name) {
      return ErrorHandler.validationError(res, 400,
        'Group must have a name');
    }

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
}

export default GroupValidator;
