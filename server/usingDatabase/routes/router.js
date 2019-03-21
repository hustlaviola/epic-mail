import express from 'express';

import UserValidator from '../middlewares/UserValidator';
import MessageValidator from '../middlewares/MessageValidator';
import UserController from '../controllers/UserController';
import MessageController from '../controllers/MessageController';
import GroupController from '../controllers/GroupController';
import GroupValidator from '../middlewares/GroupValidator';

import Auth from '../middlewares/Auth';

const router = express.Router();

// Handle /api/v2 endpoint
router.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to EPIC-mail API version 2',
  });
});

router.post('/auth/signup',
  UserValidator.validateSignUp,
  UserValidator.validateExistingUser,
  UserController.signUp);

router.post('/auth/login',
  UserValidator.validateSignIn,
  UserController.signIn);

router.post('/messages',
  Auth.userAuth,
  MessageValidator.validatePost,
  MessageController.postMessage);

router.get('/messages',
  Auth.userAuth,
  MessageController.getMessages);

router.get('/messages/unread',
  Auth.userAuth,
  MessageController.getUnread);

router.get('/messages/sent',
  Auth.userAuth,
  MessageController.getSent);

router.get('/messages/:id',
  Auth.userAuth,
  MessageValidator.validateId,
  MessageController.getMessage);

router.delete('/messages/:id',
  Auth.userAuth,
  MessageValidator.validateId,
  MessageController.deleteMessage);

router.post('/groups',
  Auth.userAuth,
  GroupValidator.validateGroupName,
  GroupController.createGroup);

router.get('/groups',
  Auth.userAuth,
  GroupController.getGroups);

router.patch('/groups/:id/name',
  Auth.userAuth,
  GroupValidator.validateGroupName,
  GroupValidator.validateExistingGroup,
  GroupValidator.validateMember,
  GroupValidator.validateAdmin,
  GroupController.updateGroupName);

router.delete('/groups/:id',
  Auth.userAuth,
  GroupValidator.validateExistingGroup,
  GroupValidator.validateMember,
  GroupValidator.validateAdmin,
  GroupController.deleteGroup);

router.post('/groups/:id/users',
  Auth.userAuth,
  GroupValidator.validateExistingGroup,
  GroupValidator.validateMember,
  GroupValidator.validateAdmin,
  GroupValidator.validateEmailsFormat,
  GroupController.addMembers);

router.delete('/groups/:id/users/:memberId',
  Auth.userAuth,
  GroupValidator.validateExistingGroup,
  GroupValidator.validateMember,
  GroupValidator.validateAdmin,
  GroupValidator.validateMemberExistence,
  GroupController.deleteUser);

router.post('/groups/:id/messages',
  Auth.userAuth,
  GroupValidator.validateGroupMessageFields,
  GroupValidator.validateExistingGroup,
  GroupValidator.validateMember,
  GroupValidator.validateAdmin,
  GroupController.postGroupMessage);

export default router;
