import express from 'express';

import UserValidator from '../middlewares/UserValidator';
import MessageValidator from '../middlewares/MessageValidator';
import UserController from '../controllers/UserController';
import MessageController from '../controllers/MessageController';
import GroupController from '../controllers/GroupController';
import GroupValidator from '../middlewares/GroupValidator';

import Auth from '../middlewares/Auth';

const router = express.Router();

// Handle /api/v1 endpoint
router.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to EPIC-mail API version 1',
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
  MessageController.getMails);

router.get('/messages/sent',
  Auth.userAuth,
  MessageController.getMails);

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
  GroupValidator.validateExistingUser,
  GroupValidator.validateExistingMember,
  GroupController.addMember);

export default router;
