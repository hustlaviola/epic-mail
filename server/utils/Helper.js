import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class Helper {
  static generateToken(data) {
    const token = jwt.sign(data, 'secret', {
      expiresIn: '7d',
    });
    return token;
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static verifyPassword(password, hashed) {
    return bcrypt.compareSync(password, hashed);
  }

  static regEx() {
    return {
      name: /^[a-zA-Z]{3,30}$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      phonenumber: /^\+?[0-9]{11,14}$/,
      username: /^[\w]{3,30}$/,
    };
  }
}

export default Helper;
