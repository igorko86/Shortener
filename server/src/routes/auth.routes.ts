import { Router } from 'express';

import { authValidator } from '../middlewares/validator';

import authController from '../controller/auth.controller';
import { deleteUnactivatedTutors } from '../middlewares/deleteUnactivatedCompany';

const authRouter = Router();

authRouter.post('/registration', authValidator('register'), authController.register.bind(authController));
authRouter.post('/login', authController.login);
authRouter.delete('/logout', authController.logout);
authRouter.get('/activation/:link', deleteUnactivatedTutors, authController.activate);
authRouter.get('/refresh', authController.refresh);

export { authRouter as authRoutes };
