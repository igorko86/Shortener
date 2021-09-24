import { Application } from 'express';

import { authRoutes } from './auth.routes';
import { checkAccess } from '../middlewares/checkAccess';
import { companyRoutes } from './company.routes';

export const routes = (app: Application) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/companies', checkAccess, companyRoutes);

  app.get('/healthCheck', (req, res) => {
    res.sendStatus(200);
  });
};
