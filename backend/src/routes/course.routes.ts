import { Router } from 'express';

import courseController from '../controller/course.controller';

const courseRouter = Router();

courseRouter.post('/course', courseController.createCourse);
courseRouter.get('/student-courses', courseController.getCoursesByStudentId);
courseRouter.get('/tutor-courses', courseController.getCoursesByTutorId);

export { courseRouter as courseRoutes };
