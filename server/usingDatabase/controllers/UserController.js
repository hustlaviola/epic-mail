import Helper from '../../utils/Helper';
import pool from '../models/database';
import ErrorHandler from '../../utils/ErrorHandler';

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
      email, firstname, lastname, password, phonenumber,
    } = req.body;
    const hashedPassword = Helper.hashPassword(password);
    const query = `INSERT INTO users(email, firstname, lastname,
      password, phonenumber) VALUES($1, $2, $3, $4, $5) RETURNING *`;
    const values = [email, firstname, lastname, hashedPassword, phonenumber];
    pool.query(query, values, (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      const user = data.rows[0];
      const result = {
        id: user.id,
        email: user.email,
      };
      const token = Helper.generateToken(result);
      return res.status(201).send({
        status: res.statusCode,
        data: [{ token }],
      });
    });
  }
}

export default UserController;
