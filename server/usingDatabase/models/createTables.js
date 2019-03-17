const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(70) UNIQUE NOT NULL,
    firstname VARCHAR (30) NOT NULL,
    lastname VARCHAR (30) NOT NULL,
    password VARCHAR(60) NOT NULL,
    phonenumber VARCHAR(14) UNIQUE NOT NULL,
    updated TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const messagesTable = `
  CREATE TABLE IF NOT EXISTS messages(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL,
    createdon TIMESTAMP WITH TIME ZONE DEFAULT now(),
    subject VARCHAR (255),
    message VARCHAR NOT NULL,
    parentmessageid INTEGER,
    status VARCHAR(6) DEFAULT 'draft',
    updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  );
`;

const groupsTable = `
  CREATE TABLE IF NOT EXISTS groups(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR (50) NOT NULL,
    description VARCHAR,
    createdon TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const groupMembersTable = `
  CREATE TABLE IF NOT EXISTS group_members(
    group_id INTEGER,
    member_id INTEGER,
    role VARCHAR (6) DEFAULT 'member',
    createdon TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
    FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES users (id) ON DELETE CASCADE
  );
`;

const createTablesQuery = `${createUsersTable}${messagesTable}${groupsTable}${groupMembersTable}`;

export default createTablesQuery;
