import Helper from '../../utils/Helper';

const hashed = Helper.hashPassword('vvvvvv');

const createUser = `
  INSERT INTO users(email,
    firstname,
    lastname,
    password,
    phonenumber)
  VALUES('viola1@epicmail.com',
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
  VALUES('viola2@epicmail.com',
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
  VALUES('viola3@epicmail.com',
    'Alexa',
    'Violet',
    '${hashed}',
    '08922334455')
  RETURNING *;

  INSERT INTO users(email,
    firstname,
    lastname,
    password,
    phonenumber)
  VALUES('viola4@epicmail.com',
    'Alexis',
    'Violet',
    '${hashed}',
    '08442334455')
  RETURNING *;

  INSERT INTO users(email,
    firstname,
    lastname,
    password,
    phonenumber)
  VALUES('viola5@epicmail.com',
    'John',
    'Violet',
    '${hashed}',
    '08955334455')
  RETURNING *;
`;

const createMessage = `
  INSERT INTO messages(sender_id,
    subject,
    message,
    status)
  VALUES('1',
    'Election News',
    'lorem ipsum tities',
    'sent')
  RETURNING *;

  INSERT INTO messages(sender_id,
    subject,
    message,
    status)
  VALUES('1',
    'Election News',
    'lorem ipsum tities',
    'sent')
  RETURNING *;

  INSERT INTO messages(sender_id,
    subject,
    message)
  VALUES('1',
    'Election News',
    'lorem ipsum tities')
  RETURNING *;

  INSERT INTO messages(sender_id,
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

  INSERT INTO messages(sender_id,
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

const userMessageSeeds = `
  INSERT INTO user_messages(message_id,
    receiver_id)
  VALUES('1',
    '2')
  RETURNING *;

  INSERT INTO user_messages(message_id,
    receiver_id)
  VALUES('3',
    '1')
  RETURNING *;

  INSERT INTO user_messages(message_id,
    receiver_id)
  VALUES('2',
    '3')
  RETURNING *;

  INSERT INTO user_messages(message_id,
    receiver_id)
  VALUES('4',
    '1')
  RETURNING *;

  INSERT INTO user_messages(message_id,
    receiver_id)
  VALUES('5',
    '3')
  RETURNING *;
`;

const createGroup = `
  INSERT INTO groups(name,
    description)
  VALUES('Leadership Forum',
    'The group of leaders')
  RETURNING *;

  INSERT INTO groups(name,
    description)
  VALUES('Andelans',
    'We love EPIC')
  RETURNING *;

  INSERT INTO groups(name,
    description)
  VALUES('Liverpool',
    'Anfield is my home')
  RETURNING *;

  INSERT INTO groups(name,
    description)
  VALUES('Liverpool',
    'Anfield is my home')
  RETURNING *;

  INSERT INTO groups(name,
    description)
  VALUES('Group4',
    'This is group 4')
  RETURNING *;
`;

const createGroupMember = `
  INSERT INTO group_members(group_id,
    member_id,
    role)
  VALUES('1',
    '1',
    'admin')
  RETURNING *;

  INSERT INTO group_members(group_id,
    member_id,
    role)
  VALUES('1',
    '2',
    'member')
  RETURNING *;

  INSERT INTO group_members(group_id,
    member_id,
    role)
  VALUES('1',
    '3',
    'member')
  RETURNING *;

  INSERT INTO group_members(group_id,
    member_id,
    role)
  VALUES('1',
    '4',
    'member')
  RETURNING *;

  INSERT INTO group_members(group_id,
    member_id,
    role)
  VALUES('1',
    '5',
    'member')
  RETURNING *;

  INSERT INTO group_members(group_id,
    member_id,
    role)
  VALUES('2',
    '3',
    'admin')
  RETURNING *;
  
  INSERT INTO group_members(group_id,
    member_id,
    role)
  VALUES('2',
    '2',
    'member')
  RETURNING *;

  INSERT INTO group_members(group_id,
    member_id,
    role)
  VALUES('2',
    '1',
    'member')
  RETURNING *;

  INSERT INTO group_members(group_id,
    member_id,
    role)
  VALUES('3',
    '2',
    'admin')
  RETURNING *;

  INSERT INTO group_members(group_id,
    member_id,
    role)
  VALUES('4',
    '1',
    'admin')
  RETURNING *;

  INSERT INTO group_members(group_id,
    member_id,
    role)
  VALUES('4',
    '2',
    'member')
  RETURNING *;
`;

const createSeedsQuery = `${createUser}${createMessage}${userMessageSeeds}
  ${createGroup}${createGroupMember}`;

export default createSeedsQuery;
