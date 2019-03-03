import express from 'express';
import UserValidator from '../middlewares/UserValidator';
import UserController from '../controllers/UserController';
import MessageValidator from '../middlewares/MessageValidator';
import MessageController from '../controllers/MessageController';

const router = express.Router();

// Handle /api/v1 endpoint
router.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to EPIC-mail API version 1',
  });
});

// Handle POST requests
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

// Handle GET requests
router.get('/messages',
  MessageController.getMessages);

router.get('/messages/unread',
  MessageController.getMails);

router.get('/messages/sent',
  MessageController.getMails);

router.get('/messages/:id',
  MessageValidator.validateId,
  MessageController.getMessage);

// Handle DELETE request
router.delete('/messages/:id',
  MessageValidator.validateId,
  MessageController.deleteMessage);

export default router;
