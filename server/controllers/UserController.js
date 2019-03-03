import Helper from '../utils/Helper';
import users from '../models/userModel';
import ErrorHandler from '../utils/ErrorHandler';

/**
 * @class UserController
 * @description A user controller class for creating account and logging in
 * @exports UserController
 */
class UserController {
  /**
  * @method signUp
  * @description Create a new user account
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof UserController
  */
  static signUp(req, res) {
    const {
      email, firstname, lastname, username, phonenumber,
    } = req.body;
    let { password } = req.body;
    const id = users.length > 0
      ? users[users.length - 1].id + 1 : 1;
    const hashedPassword = Helper.hashPassword(password);

    password = hashedPassword;
    const user = {
      id, email, firstname, lastname, password, username, phonenumber,
    };
    const result = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = Helper.generateToken(result);
    users.push(user);
    return res.status(201).send({
      status: res.statusCode,
      data: { token },
    });
  }

  /**
  * @method signIn
  * @description Sign in a user
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof UserController
  */
  static signIn(req, res) {
    const { email, password } = req.body;
    let user;
    users.forEach(owner => {
      if (owner.email === email) {
        user = owner;
      }
    });
    if (!user) {
      return ErrorHandler.validationError(res, 404, 'User does not exist');
    }
    if (!Helper.verifyPassword(password, user.password)) {
      return ErrorHandler.validationError(res, 400, 'Password is incorrect');
    }
    const result = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = Helper.generateToken(result);
    return res.status(200).send({
      status: res.statusCode,
      data: { token },
    });
  }
}

export default UserController;
