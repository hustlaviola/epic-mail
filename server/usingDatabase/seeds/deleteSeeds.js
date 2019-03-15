import pool from '../models/database';

const deleteUsers = 'DELETE FROM users;';
const deleteMessages = 'DELETE FROM messages;';

const deleteSeedsQuery = `${deleteUsers}${deleteMessages}`;

pool.query(deleteSeedsQuery, () => {
  pool.end();
});
