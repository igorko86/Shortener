import { Router } from 'express';

import { authValidator } from '../middlewares/validator';

import authController from '../controller/auth.controller';
import { deleteUnactivatedAccount } from '../middlewares/deleteUnactivatedAccount';
import { checkAccess } from '../middlewares/checkAccess';

const authRouter = Router();

authRouter.post('/registration', authValidator('register'), authController.register);
authRouter.post('/login', authController.login);
authRouter.delete('/logout', authController.logout);
authRouter.get('/activation/:role/:link', deleteUnactivatedAccount, authController.activate);
authRouter.get('/refresh', authController.refresh);
authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.post('/reset-password', authController.resetPassword);
authRouter.put('/change-role', checkAccess, authController.changeRole);

export { authRouter as authRoutes };
