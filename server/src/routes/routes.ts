import { Application } from 'express';

import { checkAccess } from '../middlewares/checkAccess';
import { authRoutes } from './auth.routes';
import { libraryRoutes } from './library.routes';
import { groupRoutes } from './group.routes';
import { courseRoutes } from './course.routes';
import { planRoutes } from './plan.routes';
import { studentRoutes } from './student.routes';
import { exerciseRoutes } from './exercise.routes';

export const routes = (app: Application) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/library', checkAccess, libraryRoutes);
  app.use('/api/course', checkAccess, courseRoutes);
  app.use('/api/groups', checkAccess, groupRoutes);
  app.use('/api/plans', checkAccess, planRoutes);
  app.use('/api/students', checkAccess, studentRoutes);
  app.use('/api/exercises', checkAccess, exerciseRoutes);

  app.get('/healthCheck', (req, res) => {
    res.sendStatus(200);
  });
};
