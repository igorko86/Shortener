import { Router } from 'express';

import courseController from '../controller/course.controller';

const courseRouter = Router();

courseRouter.post('/course', courseController.createCourse);
courseRouter.get('/student', courseController.getCoursesByStudentId);
courseRouter.get('/tutor', courseController.getCoursesByTutorId);

export { courseRouter as courseRoutes };
