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
    const { id } = req.user;
    let { name, description } = req.body;

    name = name.trim();
    description = description.trim();

    let groupId;
    const createdOn = new Date();

    const values = [name, description, 'admin', createdOn];
    const query = `INSERT INTO groups(name, description, role, createdon)
      VALUES($1, $2, $3, $4) RETURNING *`;

    const query2 = `INSERT INTO group_members(group_id, member_id)
      VALUES($1, $2) RETURNING *`;

    pool.query(query, values, (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      groupId = data.rows[0].id;
      const values2 = [groupId, id];
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
