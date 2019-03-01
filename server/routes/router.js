import express from 'express';
import UserValidator from '../middlewares/UserValidator';
import UserController from '../controllers/UserController';

const router = express.Router();

router.post('/auth/signup',
  UserValidator.validateSignUp,
  UserValidator.validateExistingUser,
  UserController.signUp);

router.post('/auth/login',
  UserValidator.validateSignIn,
  UserController.signIn);

export default router;
