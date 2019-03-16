const dropUsersTable = 'DROP TABLE IF EXISTS users CASCADE; ';
const dropMessagesTable = 'DROP TABLE IF EXISTS messages CASCADE; ';
const dropGroupsTable = 'DROP TABLE IF EXISTS groups CASCADE; ';
const dropGroupMembersTable = 'DROP TABLE IF EXISTS group_members CASCADE; ';

const dropTablesQuery = `${dropUsersTable}${dropMessagesTable}
  ${dropGroupsTable}${dropGroupMembersTable}`;

export default dropTablesQuery;
