import pool from '../models/database';
import ErrorHandler from '../../utils/ErrorHandler';

/**
 * @class GroupController
 * @description
 * @exports GroupController
 */
class GroupController {
  /**
  * @method createGroup
  * @description Create a new group
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof MessageController
  */
  static createGroup(req, res) {
    let { name, description } = req.body;

    name = name.trim();
    description = description.trim();

    let groupId;
    const createdOn = new Date();

    const values = [name, description, createdOn];
    const query = `INSERT INTO groups(name, description, createdon)
      VALUES($1, $2, $3) RETURNING *`;

    const query2 = `INSERT INTO group_members(group_id, role)
      VALUES($1, $2) RETURNING *`;

    pool.query(query, values, (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      groupId = data.rows[0].id;
      const values2 = [groupId, 'owner'];
      pool.query(query2, values2, error => {
        if (error) {
          return ErrorHandler.databaseError(res);
        }
      });
      return res.status(201).send({
        status: res.statusCode,
        data: [data.rows[0]],
      });
    });
  }
}

export default GroupController;
