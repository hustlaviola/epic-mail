import Helper from '../../utils/Helper';

const hashed = Helper.hashPassword('vvvvvv');

const createUser = `
  INSERT INTO users(email,
    firstname,
    lastname,
    password,
    phonenumber)
  VALUES('viola1@gmail.com',
    'Viola',
    'Violet',
    '${hashed}',
    '09022334455')
  RETURNING *;
  
  INSERT INTO users(email,
    firstname,
    lastname,
    password,
    phonenumber)
  VALUES('viola2@gmail.com',
    'Georgina',
    'Violet',
    '${hashed}',
    '09922334455')
  RETURNING *;

  INSERT INTO users(email,
    firstname,
    lastname,
    password,
    phonenumber)
  VALUES('viola3@gmail.com',
    'Alexa',
    'Violet',
    '${hashed}',
    '08922334455')
  RETURNING *;
`;

const createMessage = `
  INSERT INTO messages(user_id,
    subject,
    message,
    parentmessageid,
    status)
  VALUES('1',
    'Election News',
    'lorem ipsum tities',
    '2',
    'unread')
  RETURNING *;

  INSERT INTO messages(user_id,
    subject,
    message,
    parentmessageid,
    status)
  VALUES('1',
    'Election News',
    'lorem ipsum tities',
    '2',
    'read')
  RETURNING *;

  INSERT INTO messages(user_id,
    subject,
    message,
    parentmessageid,
    status)
  VALUES('2',
    'Election News',
    'lorem ipsum tities',
    '2',
    'unread')
  RETURNING *;

  INSERT INTO messages(user_id,
    subject,
    message,
    parentmessageid,
    status)
  VALUES('1',
    'Election News',
    'lorem ipsum tities',
    '2',
    'sent')
  RETURNING *;

  INSERT INTO messages(user_id,
    subject,
    message,
    parentmessageid,
    status)
  VALUES('2',
    'Election News',
    'lorem ipsum tities',
    '2',
    'sent')
  RETURNING *;
`;

const createGroup = `
  INSERT INTO groups(name,
    description,
    role)
  VALUES('Leadership Forum',
    'The group of leaders',
    'owner')
  RETURNING *;

  INSERT INTO groups(name,
    description,
    role)
  VALUES('Andelans',
    'We love EPIC',
    'admin')
  RETURNING *;
`;

const createGroupMember = `
  INSERT INTO group_members(group_id,
    member_id)
  VALUES('1',
    '1')
  RETURNING *;

  INSERT INTO group_members(group_id,
    member_id)
  VALUES('1',
    '2')
  RETURNING *;
  
  INSERT INTO group_members(group_id,
    member_id)
  VALUES('1',
    '3')
  RETURNING *;

  INSERT INTO group_members(group_id,
    member_id)
  VALUES('2',
    '1')
  RETURNING *;
  
  INSERT INTO group_members(group_id,
    member_id)
  VALUES('2',
    '2')
  RETURNING *;

  INSERT INTO group_members(group_id,
    member_id)
  VALUES('2',
    '3')
  RETURNING *;
`;

const createSeedsQuery = `${createUser}${createMessage}${createGroup}${createGroupMember}`;

export default createSeedsQuery;
