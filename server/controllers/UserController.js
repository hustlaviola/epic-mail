import Helper from '../utils/Helper';
import users from '../models/userModel';

class UserController {
  static signUp(req, res) {
    const {
      email,
      firstname,
      lastname,
      password,
      username,
      phonenumber,
    } = req.body;

    const id = users.length > 0
      ? users[users.length - 1].id + 1 : users.id + 1;
    const hashedPassword = Helper.hashPassword(password);

    const user = {
      id,
      email,
      firstname,
      lastname,
      hashedPassword,
      username,
      phonenumber,
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
}

export default UserController;
