import { Application } from 'express';

import { authRoutes } from './auth.routes';
import { checkAccess } from '../middlewares/checkAccess';
import { libraryRoutes } from './library.routes';

export const routes = (app: Application) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/library', checkAccess, libraryRoutes);

  app.get('/healthCheck', (req, res) => {
    res.sendStatus(200);
  });
};
