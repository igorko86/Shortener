import { Application } from 'express';

import { checkAccess } from '../middlewares/checkAccess';
import { authRoutes } from './auth.routes';
import { libraryRoutes } from './library.routes';
import { groupRoutes } from './group.routes';

export const routes = (app: Application) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/library', checkAccess, libraryRoutes);
  app.use('/api/groups', checkAccess, groupRoutes);

  app.get('/healthCheck', (req, res) => {
    res.sendStatus(200);
  });
};
