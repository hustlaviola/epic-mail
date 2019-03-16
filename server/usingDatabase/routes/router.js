import express from 'express';
import UserValidator from '../middlewares/UserValidator';
import MessageValidator from '../middlewares/MessageValidator';
import UserController from '../controllers/UserController';
import MessageController from '../controllers/MessageController';
import GroupController from '../controllers/GroupController';
import GroupValidator from '../middlewares/GroupValidator';

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
  MessageValidator.validatePost,
  MessageController.postMessage);

router.get('/messages',
  MessageController.getMessages);

router.get('/messages/unread',
  MessageController.getMails);

router.get('/messages/sent',
  MessageController.getMails);

router.get('/messages/:id',
  MessageValidator.validateId,
  MessageController.getMessage);


router.delete('/messages/:id',
  MessageValidator.validateId,
  MessageController.deleteMessage);

router.post('/groups',
  GroupValidator.validateCreateGroup,
  GroupController.createGroup);

export default router;
