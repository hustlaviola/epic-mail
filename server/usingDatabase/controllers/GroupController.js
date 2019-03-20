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
        status: 'success',
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
        status: 'success',
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
        status: 'success',
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
        status: 'success',
        data: [{
          message: 'Group deleted successfully',
        }],
      });
    });
  }

  /**
  * @method addMembers
  * @description Add new member to the group
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof GroupController
  */
  static addMembers(req, res) {
    const { id } = req.params;
    const { emails } = req.body;
    const emailArray = emails.split(', ');
    let query = `SELECT id, email FROM users WHERE email =
      `;
    emailArray.forEach((email, index) => {
      if (index === emailArray.length - 1) {
        query += `$${index + 1};`;
      } else {
        query += `$${index + 1} OR email = `;
      }
    });
    return pool.query(query, emailArray, (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      const ids = [];
      const mails = [];
      const noUser = [];
      data.rows.forEach(info => {
        ids.push(info.id);
        mails.push(info.email);
      });
      if (!mails.length) {
        return res.status(404).send({
          status: 'error',
          error: `${emailArray.join(', ')} ${emailArray.length > 1 ? 'do not' : 'does not'} exist`,
        });
      }
      let query1 = `SELECT * FROM group_members, groups WHERE id = ${id} AND id = group_id
        AND (member_id = `;
      ids.forEach((memberId, index) => {
        if (index === ids.length - 1) {
          query1 += `$${index + 1});`;
        } else {
          query1 += `$${index + 1} OR member_id = `;
        }
      });
      return pool.query(query1, ids, (err1, data1) => {
        if (err1) {
          return ErrorHandler.databaseError(res);
        }
        if (data1.rowCount > 0) {
          return ErrorHandler.validationError(res, 409, 'Member(s) is already part of the group');
        }
        emailArray.forEach(email => {
          if (!mails.includes(email)) {
            noUser.push(email);
          }
        });

        const sql = `INSERT INTO group_members (group_id, member_id) VALUES
          (${id}, unnest(array[${ids}]))RETURNING group_id, member_id, role;
        `;
        return pool.query(sql, (error, info) => {
          if (error) {
            return ErrorHandler.databaseError(res);
          }
          if (!noUser.length) {
            return res.status(201).send({
              status: 'success',
              data: info.rows,
            });
          }
          return res.status(201).send({
            status: 'success',
            data: info.rows,
            error: `${noUser.join(', ')} ${noUser.length > 1 ? 'do not' : 'does not'} exist`,
          });
        });
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
        status: 'success',
        data: [{ message: 'Member has been deleted' }],
      });
    });
  }

  /**
  * @method postGroupMessage
  * @description Create a new message
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof GroupController
  */
  static postGroupMessage(req, res) {
    const { id } = req.params;
    const { subject } = req.body;
    const { message } = req.body;
    const ownerId = req.user.id;

    const values = [id, 'member'];
    const query = `SELECT member_id FROM group_members, groups WHERE id = group_id
      AND id = $1 AND role = $2`;
    const members = [];
    return pool.query(query, values, (err, data) => {
      if (err) {
        return ErrorHandler.databaseError(res);
      }
      const memberIds = data.rows;
      memberIds.forEach(member => {
        members.push(member.member_id);
      });
      const vals = [ownerId, subject, message, 'sent'];
      const sql = `INSERT INTO messages(sender_id, subject, message, status) VALUES ($1, $2, $3, $4)
        RETURNING *;`;

      return pool.query(sql, vals, (error, info) => {
        if (error) {
          return ErrorHandler.databaseError(res);
        }
        const messageId = (info.rows[0].id);
        const sql2 = `INSERT INTO user_messages (message_id, receiver_id) VALUES
          (${messageId}, unnest(array[${members}]));
        `;
        return pool.query(sql2, err2 => {
          if (err2) {
            return ErrorHandler.databaseError(res);
          }
          return res.status(201).send({
            status: 'success',
            data: info.rows,
          });
        });
      });
    });
  }
}

export default GroupController;
