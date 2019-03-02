import express from 'express';
import UserValidator from '../middlewares/UserValidator';
import UserController from '../controllers/UserController';
import MessageValidator from '../middlewares/MessageValidator';
import MessageController from '../controllers/MessageController';

const router = express.Router();

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
  MessageController.getUnreadMessages);

export default router;
