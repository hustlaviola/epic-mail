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
  * @memberof GroupController
  */
  static createGroup(req, res) {
    const { id } = req.user;
    let { name, description } = req.body;

    name = name.trim();
    description = description.trim();

    let groupId;
    const createdOn = new Date();

    const values = [name, description, createdOn];
    const query = `INSERT INTO groups(name, description, createdon)
      VALUES($1, $2, $3) RETURNING *`;

    const query2 = `INSERT INTO group_members(group_id, member_id, role)
      VALUES($1, $2, $3)`;
    pool.query(query, values, (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      groupId = data.rows[0].id;
      const values2 = [groupId, id, 'admin'];
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

  /**
  * @method getGroups
  * @description Create a new group
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof GroupController
  */
  static getGroups(req, res) {
    const { id } = req.user;

    const query = `SELECT groups.id, groups.name, group_members.role FROM groups, group_members
      WHERE groups.id = group_members.group_id AND member_id = $1`;
    pool.query(query, [id], (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }

      return res.status(200).send({
        status: res.statusCode,
        data: data.rows,
      });
    });
  }

  static updateGroupName(req, res) {
    const memberId = req.user.id;
    let { name } = req.body;
    name = name.trim();
    const { id } = req.params;
    const values = [name, id, memberId];
    const query = `UPDATE groups SET name = $1 FROM group_members WHERE groups.id = $2
      AND groups.id = group_members.group_id AND group_members.member_id = $3
      RETURNING groups.id, groups.name, group_members.role`;

    pool.query(query, values, (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      res.status(200).send({
        status: res.statusCode,
        data: [data.rows[0]],
      });
    });
  }
}

export default GroupController;
