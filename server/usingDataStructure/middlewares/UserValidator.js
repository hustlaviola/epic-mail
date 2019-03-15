import Helper from '../../utils/Helper';
import ErrorHandler from '../../utils/ErrorHandler';
import users from '../models/userModel';

/**
 * @class UserValidator
 * @description A middleware class to validate signup and signin details
 * @exports UserValidator
 */
class UserValidator {
  /**
  * @method validateSignUp
  * @description Check if sign up details are valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof UserValidator
  */
  static validateSignUp(req, res, next) {
    const regEx = Helper.regEx();
    const {
      email, firstname, lastname, password,
      confirmpassword, username, phonenumber,
    } = req.body;

    let errorMessage;

    if (!email) {
      errorMessage = 'email field cannot be empty';
    } else if (!regEx.email.test(email)) {
      errorMessage = 'Invalid email format';
    } else if (!firstname) {
      errorMessage = 'firstname field cannot be empty';
    } else if (!regEx.name.test(firstname)) {
      errorMessage = 'first name must be alphabets only between 3 and 30';
    } else if (!lastname) {
      errorMessage = 'lastname field cannot be empty';
    } else if (!regEx.name.test(lastname)) {
      errorMessage = 'last name must be alphabets only between 3 and 30';
    } else if (!password) {
      errorMessage = 'password field cannot be empty';
    } else if (password.length < 6) {
      errorMessage = 'password must be at least 6 characters';
    } else if (!confirmpassword) {
      errorMessage = 'confirm your password';
    } else if (password !== confirmpassword) {
      errorMessage = 'password does not match';
    } else if (!username) {
      errorMessage = 'username field cannot be empty';
    } else if (!regEx.username.test(username)) {
      errorMessage = 'username can only contain chars, digits and underscores between 3 and 30';
    } else if (!phonenumber) {
      errorMessage = 'phonenumber field cannot be empty';
    } else if (!regEx.phonenumber.test(phonenumber)) {
      errorMessage = 'Invalid phone number format';
    }

    if (errorMessage) {
      return ErrorHandler.validationError(res, 400, errorMessage);
    }

    return next();
  }

  /**
  * @method validateExistingUser
  * @description Check if sign up details already exist
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof UserValidator
  */
  static validateExistingUser(req, res, next) {
    const { email, username, phonenumber } = req.body;

    let errorMessage;

    users.forEach(user => {
      if (user.email === email) {
        errorMessage = 'email already exists';
      } else if (user.username === username) {
        errorMessage = 'username already exists';
      } else if (user.phonenumber === phonenumber) {
        errorMessage = 'phone number already exists';
      }
    });

    if (errorMessage) {
      return ErrorHandler.validationError(res, 409, errorMessage);
    }
    return next();
  }

  /**
  * @method validateSignIn
  * @description Check if login details are valid
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @param {object} next
  * @returns {object} next
  * @memberof UserValidator
  */
  static validateSignIn(req, res, next) {
    const regEx = Helper.regEx();
    const { email, password } = req.body;

    let errorMessage;

    if (!email) {
      errorMessage = 'email field cannot be empty';
    } else if (!regEx.email.test(email)) {
      errorMessage = 'Invalid email format';
    } else if (!password) {
      errorMessage = 'password field cannot be empty';
    } else if (password.length < 6) {
      errorMessage = 'password must be at least 6 characters';
    }

    if (errorMessage) {
      return ErrorHandler.validationError(res, 400, errorMessage);
    }
    return next();
  }
}

export default UserValidator;
