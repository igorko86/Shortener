import { Router } from 'express';

import { authValidator } from '../middlewares/validator';

import authController from '../controller/auth.controller';
import { deleteUnactivatedCompany } from '../middlewares/deleteUnactivatedCompany';

const authRouter = Router();

authRouter.post('/registration', authValidator('register'), authController.register.bind(authController));
authRouter.post('/login', authController.login.bind(authController));
authRouter.delete('/logout', authController.logout);
authRouter.get('/activation/:link', deleteUnactivatedCompany, authController.activate);
authRouter.get('/refresh', authController.refresh.bind(authController));

export { authRouter as authRoutes };
