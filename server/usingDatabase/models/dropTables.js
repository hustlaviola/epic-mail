const dropUsersTable = 'DROP TABLE IF EXISTS users CASCADE; ';
const dropMessagesTable = 'DROP TABLE IF EXISTS messages CASCADE; ';

const dropTablesQuery = `${dropUsersTable}${dropMessagesTable}`;

export default dropTablesQuery;
