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
  VALUES('1',
    'Election News',
    'lorem ipsum tities',
    '2',
    'unread')
  RETURNING *;
`;

const createSeedsQuery = `${createUser}${createMessage}`;

export default createSeedsQuery;
