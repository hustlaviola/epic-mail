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

  /**
  * @method updateGroupName
  * @description Update a group name
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof GroupController
  */
  static updateGroupName(req, res) {
    let { name } = req.body;
    name = name.trim();
    const { id } = req.params;
    const values = [name, id];
    const query = `UPDATE groups SET name = $1 FROM group_members WHERE groups.id = $2
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

  /**
  * @method deleteGroup
  * @description Delete a group
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof GroupController
  */
  static deleteGroup(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM groups WHERE id = $1';
    const value = [id];

    pool.query(query, value, err => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      return res.status(200).send({
        status: res.statusCode,
        data: [{
          message: 'Group deleted successfully',
        }],
      });
    });
  }

  /**
  * @method addMember
  * @description Add new member to the group
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof GroupController
  */
  static addMember(req, res) {
    const { id } = req.params;
    const { user } = req.body;

    const query = `INSERT INTO group_members(group_id, member_id, role)
      VALUES($1, $2, $3) RETURNING group_id, member_id, role`;
    const values = [id, user, 'member'];
    pool.query(query, values, (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      return res.status(201).send({
        status: res.statusCode,
        data: [data.rows[0]],
      });
    });
  }

  /**
  * @method deleteUser
  * @description Delete member from a group
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof GroupController
  */
  static deleteUser(req, res) {
    const { id } = req.params;
    const { memberId } = req.params;

    const values = [id, memberId];
    const query = 'DELETE FROM group_members WHERE group_id = $1 AND member_id = $2';

    pool.query(query, values, err => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }

      return res.status(200).send({
        status: res.statusCode,
        data: [{ message: 'Member has been deleted' }],
      });
    });
  }
}

export default GroupController;
