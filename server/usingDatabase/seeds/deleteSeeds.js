import pool from '../models/database';

const deleteUsers = 'DELETE FROM users;';
const deleteMessages = 'DELETE FROM messages;';
const deleteGroups = 'DELETE FROM groups;';
const deleteGroupMembers = 'DELETE FROM group_embers;';

const deleteSeedsQuery = `${deleteUsers}${deleteMessages}${deleteGroups}${deleteGroupMembers}`;

pool.query(deleteSeedsQuery, () => {
  pool.end();
});
